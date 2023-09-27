import { FieldCollection } from "../FieldCollection";
import { CFabric } from "./CFabric";
import { SelectFabric } from "./SelectFabric";


export const enum Specs {h='h',i='i',d='d',f='f',p='p',c='c',o='o'};

const FABRIC_C = {
  fabricId: Specs.c,
  fabric: new CFabric()
};

const fabrics = [
  FABRIC_C
];


export class SpecFabric extends SelectFabric{
  public build(): FieldCollection {
    throw new Error("Could not produce Spec Layout.");
  }

  public select(selector: string): SelectFabric {
    const fabric = fabrics.find((spec)=> spec.fabricId === selector);
    if (!fabric) {
      throw new Error(`Undefined Spec of type ${selector}`);
    }
    return fabric.fabric;
  }
}