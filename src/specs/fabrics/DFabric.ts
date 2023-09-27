import { SelectFabric } from "./SelectFabric";
import { SpecFabric } from "./SpecFabric";

export class DFabric extends SpecFabric {
  public select(selector: string): SelectFabric {
    throw new Error("Method not implemented.");
  }
}

