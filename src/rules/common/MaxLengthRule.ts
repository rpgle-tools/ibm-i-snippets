import { Field } from "../../specs/Field";
import { Rule, RuleResult } from "../Rule";

export class MaxLengthRule extends Rule{

  maxLength:number;

  public constructor(maxLength:number){
    if (maxLength <= 0) {
      throw new Error("Max Length should be less or equal than zero");
    }
    super();
    this.maxLength = maxLength;
  }


  public validate(field: Field): RuleResult {
    const alias: string = field.getDescriptor().getAlias();
    const value: string = field.getTrimmedValue();
    const status: boolean = !value.trim().includes(" ");
    const errorText: string = `${alias} is larger than expected, should be less than ${this.maxLength} characters.`;
    const text: string = status ? "" : errorText;
    return {
      status: status,
      text: text
    };
  }
  
}