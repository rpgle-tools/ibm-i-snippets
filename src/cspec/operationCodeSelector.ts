import * as vscode from "vscode";
import { OperationCodeElementExtended, OperationCodeStore } from "./OperationCodeStore";

export class OperationCodeSelector {
  private operationCode:undefined|OperationCodeElementExtended;
  private opCodeSelector?:vscode.QuickPick<vscode.QuickPickItem>;
  private onClose:Function;
  private onSuccess:Function;
  constructor() {
    this.onClose = ()=>{};
    this.onSuccess = ()=>{};
  }
  private setOperationCode(opCode:OperationCodeElementExtended){
    this.operationCode = opCode;
  }
  getOperationCode():OperationCodeElementExtended|undefined{
    return this.operationCode;
  }
  getOperationCodeName():string{
    let operationCodeName = this.operationCode?.label;
    if (!operationCodeName){
      operationCodeName = "";
    }
    return operationCodeName;
  }
  private onCloseIntern() {
    if(!this.opCodeSelector){
      return;
    }
    this.opCodeSelector.dispose();
    this.onClose();
  };

  private onSuccessIntern():void {
    if(!this.opCodeSelector){
      return;
    }
    this.opCodeSelector.dispose();
    this.onSuccess();
  };

  setOnClose(onCloseFunction:Function):void{
    this.onClose = onCloseFunction;
  }
  setOnSuccess(onSuccessFunction:Function):void{
    this.onSuccess = onSuccessFunction;
  }
  selectOperationCode():void{
    this.opCodeSelector = vscode.window.createQuickPick();
    if(!this.opCodeSelector){
      return;
    }
    this.opCodeSelector.placeholder = "Select your c operation code: ";
    
    this.opCodeSelector.items = OperationCodeStore.getOperationCodeInformation();
    
    this.opCodeSelector.onDidHide(() => {
      this.onCloseIntern();
      this.onClose();
    });

    this.opCodeSelector.onDidChangeSelection(([item]) => {
      if (item) {
        const operationCodeExtended:OperationCodeElementExtended |undefined =
          OperationCodeStore.getOperationCodeInformationElement(item.label);
        if(!operationCodeExtended){
          vscode.window.showErrorMessage("Operation code not supported");
          return;
        }
        this.setOperationCode(operationCodeExtended);
        this.onSuccessIntern();
      }
    });
    this.opCodeSelector.show();
  }
}
