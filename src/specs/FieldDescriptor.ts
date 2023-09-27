export class FieldDescriptor {
  private name: string;
  private initialPosition: number;
  private finalPosition: number;
  private alias: string;
  private description: string;
  private suggetions: string[];
  constructor(
    name: string,
    initialPosition: number,
    finalPosition: number,
    alias: string,
    description: string,
    suggestions: string[]
  ) {
    this.name = name;
    this.initialPosition = initialPosition;
    this.finalPosition = finalPosition;
    this.alias = alias;
    this.description = description;
    this.suggetions = suggestions;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getInitialPosition(): number {
    return this.initialPosition;
  }

  public setInitialPosition(initialPosition: number): void {
    this.initialPosition = initialPosition;
  }

  public getFinalPosition(): number {
    return this.finalPosition;
  }

  public setFinalPosition(finalPosition: number): void {
    this.finalPosition = finalPosition;
  }

  public getAlias(): string {
    return this.alias;
  }

  public setAlias(alias: string): void {
    this.alias = alias;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getSuggetions(): string[] {
    return this.suggetions;
  }

  public setSuggetions(suggetions: string[]): void {
    this.suggetions = suggetions;
  }
}
