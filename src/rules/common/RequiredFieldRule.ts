import { Field } from "../../specs/Field";
import { Rule, RuleResult } from "../Rule";

export class RequiredFieldRule extends Rule{
  public validate(field: Field): RuleResult {
    const alias = field.getDescriptor().getAlias();
    const value: string = field.getTrimmedValue();
    const status:boolean = !!value && value.length > 0;
    const text:string =  (status)?"":`${alias} is required.`;
    return {
      status: status,
      text: text
    };
  }
  
}