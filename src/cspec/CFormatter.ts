import { CType } from "./CType";

const FACTOR_SIZE = 14;
const OPCODE_SIZE = 10;
const FACTOR_PAD = ' '.repeat(FACTOR_SIZE);
const OPCODE_PAD = ' '.repeat(OPCODE_SIZE);


export class CFormatter{
  private padFactor(factor:string):string{
    return (factor+FACTOR_PAD).substring(0,FACTOR_SIZE);
  }
  
  private padOpCode(opCode:string):string{
    return (opCode+OPCODE_PAD).substring(0,OPCODE_SIZE);
  }
  
  format(opcode:string,extensors:string[],factor1:string,factor2:string,result:string,returnLine:boolean=false):string{
    const eol = returnLine?"\n":"";
    factor1 = this.padFactor(factor1);  
    factor2 = this.padFactor(factor2);
    result = this.padFactor(result);
    const extensorStr = extensors.length>0?"(" +  extensors.reduce((extensorString,extensor)=>extensorString + extensor,"") + ")":"";
    opcode = this.padOpCode(opcode + extensorStr);
    return `     c     ${factor1}${opcode}${factor2}${result}${eol}`;
  }

  read(instruction:string):CType{
    const factor1:string = instruction.substring(11,24).trim();
    let opcode:string =  instruction.substring(25,34).trim();
    const factor2:string = instruction.substring(35,48).trim();
    const result:string = instruction.substring(49,63).trim();
    let extensors:string[] = [];
    if(opcode.indexOf("(") > 0){
      extensors = [...opcode.split("(")[1].trim().replace(" ","").replace(")","")];
      opcode = opcode.split("(")[0];
    }
    return new CType(factor1,factor2,opcode,extensors,result);
  }


}