import { FieldCollection } from "../FieldCollection";

export abstract class SelectFabric {
  public abstract select(selector:string):SelectFabric;
  public abstract build() : FieldCollection;
}
