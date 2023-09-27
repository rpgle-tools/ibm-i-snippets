import { Field } from "../../specs/Field";
import { Rule, RuleResult } from "../Rule";

export class OrRule extends Rule{

  rules:Rule[];

  public constructor([...rules]:Rule[]){
    if (!rules || rules.length <= 0) {
      throw new Error("Set more than one option");
    }
    super();
    this.rules = [...rules];
  }


  public validate(field: Field): RuleResult {
    const validation:RuleResult = this.rules.reduce((finalValidation,currentRule)=>{
      if (finalValidation.status){
        return finalValidation;
      }
      const partialValidation = currentRule.validate(field);
      if (partialValidation.status){
        return partialValidation;
      }
      return finalValidation;
    },this.rules[0].validate(field));

    return validation;
  }
  
}