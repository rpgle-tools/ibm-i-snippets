import * as vscode from "vscode";

export class OperationCodeSelector {
  private extensor:string;
  private posibleExtensors:vscode.QuickPickItem[];
  private extensorSelector?:vscode.QuickPick<vscode.QuickPickItem>;
  private onClose:Function;
  private onSuccess:Function;
  constructor(extensor:string = "",extensors:vscode.QuickPickItem[]) {
    this.extensor = extensor;
    this.onClose = ()=>{};
    this.onSuccess = ()=>{};
    this.posibleExtensors = extensors;
  }
  private setOperationCode(opCode:string){
    this.extensor = opCode;
  }
  getOperationCode():string{
    return this.extensor;
  }
  private onCloseIntern() {
    if(!this.extensorSelector){
      return;
    }
    this.extensorSelector.dispose();
    this.onClose();
  };

  private onSuccessIntern():void {
    if(!this.extensorSelector){
      return;
    }
    this.extensorSelector.dispose();
    this.onSuccess();
  };

  setOnClose(onCloseFunction:Function):void{
    this.onClose = onCloseFunction;
  }
  setOnSuccess(onSuccessFunction:Function):void{
    this.onSuccess = onSuccessFunction;
  }
  selectOperationCode():void{
    this.extensorSelector = vscode.window.createQuickPick();
    if(!this.extensorSelector){
      return;
    }
    this.extensorSelector.placeholder = "Select your c operation code: ";
    
    
    this.extensorSelector.items = this.posibleExtensors;
    
    this.extensorSelector.onDidHide(() => {
      this.onCloseIntern();
      this.onClose();
    });

    this.extensorSelector.onDidChangeSelection(([item]) => {
      if (item) {
        this.setOperationCode(item.label);
        this.onSuccessIntern();
      }
    });
    this.extensorSelector.show();
  }
}
