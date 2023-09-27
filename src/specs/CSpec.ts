import { FieldCollection } from "./FieldCollection";

class CSpec {

  fields:FieldCollection;


  constructor(opCode:string){
    this.fields = new FieldCollection([]);

  }

}