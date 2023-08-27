import { RuleValidator,RuleValidatorResult } from "./RuleValidator";

export class FactorRuleValidator extends RuleValidator{
  private rule:RuleValidatorResult;
  constructor(){
    super();
    this.rule = {
      status: true,
      reason: "",
    };
    this.validate = function (target:string):RuleValidatorResult {
      this.rule.status = !target.trim().includes(" ");
      if (!this.rule.status){
        this.rule.reason = "Your factor contains invalid spaces";
        return this.rule;
      }
      this.rule.status = !(target.trim().length > 14);
      if (!this.rule.status){
        this.rule.reason = "Factor is larger than expected, should be less than 14 characters";
        return this.rule;
      }
      return this.rule;
    };
  }
}