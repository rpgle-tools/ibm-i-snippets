import { CSpecFormatter } from "./CSpecFormatter";
import { ExtensorSelector } from "./Extensor";
import { FactorSelector } from "./Factor";
import { FactorSyntaxRule, OperationCodeElementExtended } from "./OperationCodeStore";
import { OperationCodeSelector } from "./operationCodeSelector";
import * as vscode from 'vscode';

export class CSpecOrchestrator{
  factor1:FactorSelector;
  factor2:FactorSelector;
  result :FactorSelector;
  opSelector:OperationCodeSelector;
  formatter:CSpecFormatter;
  editor:vscode.TextEditor | undefined;
  extensor?:ExtensorSelector;

  constructor(){
    this.editor = vscode.window.activeTextEditor;
    this.formatter = new CSpecFormatter();
    this.opSelector = new OperationCodeSelector();
    this.factor1 = new FactorSelector("Insert the name of the factor 1 sentence");
		this.factor2 = new FactorSelector("Insert the name of the factor 2 sentence");
		this.result = new FactorSelector("Insert the result field", "Result ");
  }

  private orchestrateOpcode(opCode:OperationCodeElementExtended){
    this.extensor = new ExtensorSelector(opCode.posibleExtensors);
    this.extensor.setOnSuccess(()=>{
      if(opCode.firstFactorRules.shouldBeAvoided){
        this.factor2.selectFactor();
        return;
      }
      this.factor1.selectFactor();
    });
    this.factor1.setOnSuccess(()=>{
      if(opCode.secondFactorRules.shouldBeAvoided){
        this.result.selectFactor();
        return;
      }
      this.factor2.selectFactor();
		});
		this.factor2.setOnSuccess(()=>{
      if(opCode.resultFactorRules.shouldBeAvoided){
        this.resolve();
        return;
      }
      this.result.selectFactor();
		});
		this.result.setOnSuccess(()=>{
			this.resolve();
		});
    if(opCode.posibleExtensors.length === 0){
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
      this.result.getFactor()
    );
    vscode.window.showInformationMessage(formattedCSpec);
    this.editor.edit((edit: { insert: (arg0: any, arg1: string) => void; })=>{
      if(!this.editor){
        return;
      }
      edit.insert(
        new vscode.Position(this.editor.selection.start.line, 0),
        formattedCSpec
      );
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