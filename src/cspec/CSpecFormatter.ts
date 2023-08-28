const FACTOR_SIZE = 14;
const OPCODE_SIZE = 10;
const FACTOR_PAD = ' '.repeat(FACTOR_SIZE);
const OPCODE_PAD = ' '.repeat(OPCODE_SIZE);


export class CSpecFormatter{
  private padFactor(factor:string):string{
    return (factor+FACTOR_PAD).substring(0,FACTOR_SIZE);
  }
  
  private padOpCode(opCode:string):string{
    return (opCode+OPCODE_PAD).substring(0,OPCODE_SIZE);
  }
  
  format(opcode:string,extensors:string[],factor1:string,factor2:string,result:string):string{
    factor1 = this.padFactor(factor1);  
    factor2 = this.padFactor(factor2);
    result = this.padFactor(result);
    const extensorStr = extensors.length>0?"(" +  extensors.reduce((extensorString,extensor)=>extensorString + extensor,"") + ")":"";
    opcode = this.padOpCode(opcode + extensorStr);
    return `     c     ${factor1}${opcode}${factor2}${result}\n`;
  }
}