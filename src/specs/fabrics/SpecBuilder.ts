import { FieldCollection } from "../FieldCollection";
import { SpecFabric, Specs } from "./SpecFabric";


export class SpecLayout {

  build(spec:Specs,layoutId:string) : FieldCollection{
    let specFabric = new SpecFabric(); 
    let specLayout = specFabric.select(spec).select(layoutId);
  }

}
