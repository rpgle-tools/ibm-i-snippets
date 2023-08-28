import { RuleValidator,RuleValidatorResult } from "./RuleValidator";

export class FactorRuleValidator extends RuleValidator{
  private rule:RuleValidatorResult;
  required:boolean;

  setRequired(required:boolean){
    this.required = required;
  }
  
  constructor(factorType:string='Factor'){
    super();
    this.required = false;
    this.rule = {
      status: true,
      reason: "",
    };
    this.validate = function (target:string):RuleValidatorResult {
      this.rule.status = !target.trim().includes(" ");
      if (!this.rule.status){
        this.rule.reason = `${factorType} contains invalid spaces`;
        return this.rule;
      }
      this.rule.status = !(target.trim().length > 14);
      if (!this.rule.status){
        this.rule.reason = `${factorType} is larger than expected, should be less than 14 characters`;
        return this.rule;
      }
      if(!this.required){
        return this.rule;
      }
      this.rule.status = !(target.trim().length === 0);
      if (!this.rule.status){
        this.rule.reason = `${factorType} should be written because is a required operand.`;
        return this.rule;
      }
      return this.rule;
    };
  }
}