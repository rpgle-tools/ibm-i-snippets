import { Field } from "../../specs/Field";
import { Rule, RuleResult } from "../Rule";

export class ChooseRule extends Rule{

  options:string[];

  public constructor(options:string[]){
    if (!options || options.length <= 0) {
      throw new Error("Set more than one option");
    }
    super();
    this.options = options;
  }


  public validate(field: Field): RuleResult {
    const alias: string = field.getDescriptor().getAlias();
    const value: string = field.getTrimmedValue();
    const status: boolean = !this.options.includes(value);
    const acceptedValues:string = this.options.join();
    const errorText: string = `${alias} with value ${value} is not an accepted value, please pick one of the following options: ${acceptedValues}.`;
    const text: string = status ? "" : errorText;
    return {
      status: status,
      text: text
    };
  }
  
}