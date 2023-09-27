import { CFormatter } from "./CFormatter";
import { CType } from "./CType";
import { ExtensorSelector } from "./Extensor";
import { FactorSelector } from "./Factor";
import { OperationCodeElementExtended } from "./OperationCodeStore";
import { OperationCodeSelector } from "./operationCodeSelector";
import * as vscode from 'vscode';

const CREATE = "CREATE";
const EDIT = "EDIT";
export class COrchestrator{
  factor1:FactorSelector;
  factor2:FactorSelector;
  result :FactorSelector;
  opSelector:OperationCodeSelector;
  formatter:CFormatter;
  editor:vscode.TextEditor | undefined;
  extensor?:ExtensorSelector;
  extensorsDefaults:string[] = [];
  editMode:string = CREATE;

  constructor(initialData: CType | undefined = undefined){
    this.editor = vscode.window.activeTextEditor;
    this.formatter = new CFormatter();
    this.opSelector = new OperationCodeSelector();
    this.factor1 = new FactorSelector("Insert the name of the factor 1 sentence");
		this.factor2 = new FactorSelector("Insert the name of the factor 2 sentence");
		this.result = new FactorSelector("Insert the result field", "Result ");
    if (!initialData){
      return;
    }
    this.opSelector.setInitialData(initialData?.getOpcode());
    this.factor1.setInitialData(initialData?.getFactor1());
    this.factor2.setInitialData(initialData?.getFactor2());
    this.extensorsDefaults = initialData.getExtensors();
    this.result.setInitialData(initialData.getResult());
  }

  public setCreateMode(){
    this.editMode = CREATE;
  }

  public setEditMode(){
    this.editMode = EDIT;
  }

  private orchestrateOpcode(opCode:OperationCodeElementExtended){
    this.extensor = new ExtensorSelector(opCode.posibleExtensors);
    this.extensor.setInitialData(this.extensorsDefaults);
    this.extensor.setOnSuccess(()=>{
      if(opCode.firstFactorRules.shouldBeAvoided){
        this.factor1.setInitialData("");
        this.factor2.selectFactor();
        return;
      }
      this.factor1.selectFactor();
    });
    this.factor1.setOnSuccess(()=>{
      if(opCode.secondFactorRules.shouldBeAvoided){
        this.factor2.setInitialData("");
        this.result.selectFactor();
        return;
      }
      this.factor2.selectFactor();
		});
		this.factor2.setOnSuccess(()=>{
      if(opCode.resultFactorRules.shouldBeAvoided){
        this.result.setInitialData("");
        this.resolve();
        return;
      }
      this.result.selectFactor();
		});
		this.result.setOnSuccess(()=>{
			this.resolve();
		});
    if(opCode.posibleExtensors.length === 0){
      this.extensor.setInitialData([]);
      this.factor1.selectFactor();
      return;
    }
    this.extensor.selectExtensor();
  }

  private resolve(){
    if(!this.editor){
      return;
    }
    if (!this.extensor){
      return;
    }
    let formattedCSpec = this.formatter.format(
      this.opSelector.getOperationCodeName(),
      this.extensor.getExtensors(),
      this.factor1.getFactor(),
      this.factor2.getFactor(),
      this.result.getFactor(),
      this.editMode === CREATE
    );
    this.editor.edit((edit)=>{
      if(!this.editor){
        return;
      }
      if (this.editMode === CREATE){
        edit.insert(
          new vscode.Position(this.editor.selection.start.line, 0),
          formattedCSpec
        );
        return;
      }
      if (this.editMode === EDIT){
        const selection = this.editor.selection;
        const range = this.editor.document.lineAt(selection.active.line).range;
        edit.replace(range,formattedCSpec);
        return;
      }

    });
  }

  orchestrate(){
    if (!this.editor){
			vscode.window.showErrorMessage("This command should be executed in an editor window.");
			return;
		}
		this.opSelector.setOnSuccess(()=>{
      const opCode = this.opSelector.getOperationCode();
      if (!opCode){
        vscode.window.showErrorMessage("Unexpected error found!");
        return;
      }
      this.factor1.setRequired(opCode.firstFactorRules.isRequired);
      this.factor2.setRequired(opCode.secondFactorRules.isRequired);
      this.result.setRequired(opCode.resultFactorRules.isRequired);
      this.orchestrateOpcode(opCode);
		});	
		this.opSelector.selectOperationCode();
  }

}