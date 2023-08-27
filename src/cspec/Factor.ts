import * as vscode from "vscode";
import { RuleValidator } from "../rules/RuleValidator";
import { FactorRuleValidator } from "../rules/FactorRuleValidator";

export class FactorSelector {
  private factor:string;
  private factorInput:vscode.InputBox;
  private onClose:Function;
  private onSuccess:Function;
  private ruleValidator:RuleValidator;
  constructor(placeHolder:string) {
    this.factor = '';
    this.onClose = ()=>{};
    this.onSuccess = ()=>{};
    this.factorInput = vscode.window.createInputBox();
    this.factorInput.placeholder = placeHolder;
    this.ruleValidator = new FactorRuleValidator();
  }
  private setFactor(opCode:string){
    this.factor = opCode;
  }
  getFactor():string{
    return this.factor;
  }
  private onCloseIntern() {
    this.factorInput.dispose();
    this.onClose();
  };

  private onSuccessIntern():void {
    this.factorInput.dispose();
    this.onSuccess();
  };

  setOnClose(onCloseFunction:Function):void{
    this.onClose = onCloseFunction;
  }
  setOnSuccess(onSuccessFunction:Function):void{
    this.onSuccess = onSuccessFunction;
  }
  selectFactor():void{
    this.factorInput.onDidHide(() => {
      this.onCloseIntern();
      this.onClose();
    });

    this.factorInput.onDidChangeValue((value: string) => {
      this.setFactor(value);
    });

    this.factorInput.onDidAccept(() => {
      let rule = this.ruleValidator.validate(this.getFactor());
      if (!rule.status){
        vscode.window.showErrorMessage(rule.reason);
        return;
      }
      this.onSuccessIntern();
    });
    this.factorInput.show();
  }
}
