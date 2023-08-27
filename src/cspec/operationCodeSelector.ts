import * as vscode from "vscode";

export class OperationCodeSelector {
  private operationCode:string;
  private opCodeSelector?:vscode.QuickPick<vscode.QuickPickItem>;
  private onClose:Function;
  private onSuccess:Function;
  constructor(opCode:string = "") {
    this.operationCode = opCode;
    this.onClose = ()=>{};
    this.onSuccess = ()=>{};
  }
  private setOperationCode(opCode:string){
    this.operationCode = opCode;
  }
  getOperationCode():string{
    return this.operationCode;
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
    
    this.opCodeSelector.items = [
      {
        label: "add",
        detail: "add two numbers, puts the addition on the result field",
        description: "add two numbers, puts the addition on the result field",
      },
      {
        label: "z-add",
        detail:
          "add one number and zero, puts the addition on the result field",
        description:
          "add one number and zero, puts the addition on the result field",
      },
      {
        label: "sub",
        detail:
          "performs the substractions of two numbers, puts the addition on the result field",
        description:
          "performs the substractions of two numbers, puts the addition on the result field",
      },
    ];
    
    this.opCodeSelector.onDidHide(() => {
      this.onCloseIntern();
      this.onClose();
    });

    this.opCodeSelector.onDidChangeSelection(([item]) => {
      if (item) {
        this.setOperationCode(item.label);
        this.onSuccessIntern();
      }
    });
    this.opCodeSelector.show();
  }
}
