
export interface RuleValidatorResult {
  status:boolean;
  reason:string;
}

export interface RuleValidatorFunction {
  (target:any):RuleValidatorResult;
}




export abstract class RuleValidator {
  validate:RuleValidatorFunction;
  
  constructor(){
    this.validate = function (target:any):RuleValidatorResult {
      return {status: !!target, reason: 'default validator'};
    };
  }
}
