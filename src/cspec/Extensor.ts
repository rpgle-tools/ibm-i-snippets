import * as vscode from "vscode";
import { Extensors } from "./OperationCodeStore";

export class ExtensorSelector {
  private extensors:string[];
  private posibleExtensors:vscode.QuickPickItem[];
  private extensorSelector:vscode.QuickPick<vscode.QuickPickItem>;
  private onClose:Function;
  private onSuccess:Function;
  constructor(extensors:Extensors[]) {
    this.extensors = extensors.map(extensor=>extensor.label);
    this.onClose = ()=>{};
    this.onSuccess = ()=>{};
    this.posibleExtensors = extensors;
    this.extensorSelector = this.extensorSelector = vscode.window.createQuickPick();;
  }
  private setExtensors(extensors:string[]){
    this.extensors = extensors;
  }
  getExtensors():string[]{
    return this.extensors;
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
  selectExtensor():void{
    this.extensorSelector.canSelectMany = true;
    if(!this.extensorSelector){
      return;
    }
    this.extensorSelector.placeholder = "Select your extensors: ";
    
    
    this.extensorSelector.items = this.posibleExtensors;
    
    this.extensorSelector.onDidHide(() => {
      this.onCloseIntern();
      this.onClose();
    });

    this.extensorSelector.onDidChangeSelection((items) => {
      if (items) {
        this.setExtensors(items.map(item=>item.label));
      }
    });
    this.extensorSelector.onDidAccept (()=>{
      this.onSuccessIntern();
    });
    this.extensorSelector.show();
  }
}
