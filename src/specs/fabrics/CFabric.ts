import { FieldCollection } from "../FieldCollection";
import { SelectFabric } from "./SelectFabric";
import { SpecFabric } from "./SpecFabric";



export class CFabric extends SpecFabric {
  public select(selector: string): SelectFabric {
    
  }
  public build(): FieldCollection {
    throw new Error("Could not produce Spec Layout.");
  }
}