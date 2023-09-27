import { Field } from "./Field";

export class FieldCollection {
  private fields:Field[];
  constructor(fields:Field[]){
    this.fields = fields;
  }

  getField(fieldName:string): Field | undefined{
    const field = this.fields.find((field)=>{
      return field.getDescriptor().getName() === fieldName;
    });
    return field;
  }

}