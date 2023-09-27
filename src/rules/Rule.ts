import { Field } from "../specs/Field";

export interface RuleResult {
  status:boolean;
  text:string;
}

export const DEFAULT_ACCEPTANCE:RuleResult = {
  status: true,
  text: ""
};

export const DEFAULT_FAIL:RuleResult = {
  status: false,
  text: ""
};



export abstract class Rule {
  public abstract validate(field:Field):RuleResult;
}