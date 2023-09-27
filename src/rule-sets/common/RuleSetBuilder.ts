import { RuleSet } from "../RuleSet";
import { MaxLengthRule } from "../../rules/common/MaxLengthRule";
import { RequiredFieldRule } from "../../rules/common/RequiredFieldRule";
import { SingleWordRule } from "../../rules/common/SingleWordRule";
import { ChooseRule } from "../../rules/common/ChooseRule";
import { OrRule } from "../../rules/common/OrRule";
import { Rule } from "../../rules/Rule";

export class RuleSetBuilder{

  private ruleSet:RuleSet;

  constructor(ruleSet:RuleSet = new RuleSet()){
    this.ruleSet = ruleSet;
  }

  isRequired(required:boolean):RuleSetBuilder{
    if (!required){
      return this;
    }
    this.ruleSet.addRule(new RequiredFieldRule());
    return this;
  }

  maxLength(len:number = -1):RuleSetBuilder{
    if (len<0){
      return this;
    }
    this.ruleSet.addRule(new MaxLengthRule(len));
    return this;
  }

  oneWordOnly(oneWordOnly:boolean):RuleSetBuilder{
    if (!oneWordOnly){
      return this;
    }
    this.ruleSet.addRule(new SingleWordRule());
    return this;
  }

  mustBeIn([...options]:string[]):RuleSetBuilder{
    if (!options || options.length <= 0){
      return this;
    }
    this.ruleSet.addRule(new ChooseRule([...options]));
    return this;
  }

  anyOfTheeseConditionsHappend([...conditions]:Rule[]){
    if (!conditions || conditions.length <= 0){
      return this;
    }
    this.ruleSet.addRule(new OrRule([...conditions]));
    return this;
  }

  build():RuleSet{
    return this.ruleSet;
  }

}