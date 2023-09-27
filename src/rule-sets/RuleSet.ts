import { Field } from "../specs/Field";
import { Rule, RuleResult, DEFAULT_ACCEPTANCE } from "../rules/Rule";

export class RuleSet {
  rules:Rule[];

  constructor(){
    this.rules = []; 
  }

  addRule(rule:Rule){
    this.rules.push(rule);
  }

  addRules(...rules:Rule[]){
    this.rules = this.rules.concat([...rules]);
  }

  join(ruleSet:RuleSet){
    this.rules = this.rules.concat(ruleSet.rules);
  }

  validate(field:Field):RuleResult{
    let rules = [...this.rules];
    const validation = rules.reduce((rule,currentRule)=> {
      if (!rule.status) {
        return rule;
      }
      const validated = currentRule.validate(field);
      return validated.status?rule:validated;
    },DEFAULT_ACCEPTANCE);
    return validation;
  }
}