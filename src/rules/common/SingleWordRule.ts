import { Field } from "../../specs/Field";
import { Rule, RuleResult } from "../Rule";

export class SingleWordRule extends Rule{
  public validate(field: Field): RuleResult {
    const alias:string = field.getDescriptor().getAlias();
    const value: string = field.getTrimmedValue();
    const status:boolean = !value.includes(" ");
    const text:string =  (status)?"":`${alias} contains invalid spaces.`;
    return {
      status: status,
      text: text
    };
  }
  
}