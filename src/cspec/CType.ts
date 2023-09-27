export class CType {
  private factor1: string;
  private factor2: string;
  private opcode: string;
  private extensors: string[];
  private result: string;

  public constructor(
    factor1: string,
    factor2: string,
    opcode: string,
    extensors: string[],
    result: string
  ) {
    this.factor1 = factor1;
    this.factor2 = factor2;
    this.opcode = opcode;
    this.extensors = extensors;
    this.result = result;
  }

  public getFactor1(): string {
    return this.factor1;
  }

  public setFactor1(factor1: string): void {
    this.factor1 = factor1;
  }

  public getFactor2(): string {
    return this.factor2;
  }

  public setFactor2(factor2: string): void {
    this.factor2 = factor2;
  }

  public getOpcode(): string {
    return this.opcode;
  }

  public setOpcode(opcode: string): void {
    this.opcode = opcode;
  }

  public getExtensors(): string[] {
    return this.extensors;
  }

  public setExtensors(extensors: string[]): void {
    this.extensors = extensors;
  }

  public getResult(): string {
    return this.result;
  }

  public setResult(result: string): void {
    this.result = result;
  }
}
