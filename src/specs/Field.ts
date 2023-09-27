import { RuleSet } from "../rule-sets/RuleSet";
import { FieldDescriptor } from "./FieldDescriptor";

export class Field {
  private value: string;
  private descriptor: FieldDescriptor;
  private ruleSet: RuleSet;
  constructor(
    value: string,
    descriptor: FieldDescriptor,
    ruleSet: RuleSet = new RuleSet()
  ) {
    this.value = value;
    this.descriptor = descriptor;
    this.ruleSet = ruleSet;
  }

  public getValue(): string {
    return this.value;
  }

  public getTrimmedValue(): string {
    return this.value.trim();
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public getDescriptor(): FieldDescriptor {
    return this.descriptor;
  }

  public setDescriptor(descriptor: FieldDescriptor): void {
    this.descriptor = descriptor;
  }

  public getRuleSet(): RuleSet {
    return this.ruleSet;
  }

  public setRuleSet(ruleSet: RuleSet): void {
    this.ruleSet = ruleSet;
  }
}
