import { ERROR_EXTENSOR_E, OPERATIONAL_DESCRIPTOR_EXTENSOR_D, ROUND_UP_EXTENSOR_H } from "./ExtensorStorage";

export interface OperationCodeElement {
  label: string;
  detail: string;
  description: string;
}

export interface Extensors extends OperationCodeElement{

}


export interface FactorSyntaxRule{
  isRequired: boolean,
  shouldBeAvoided: boolean,
}

export interface OperationCodeElementExtended extends OperationCodeElement {
  posibleExtensors: Extensors[];
  extendedSecondFactor: boolean;
  firstFactorRules: FactorSyntaxRule;
  secondFactorRules: FactorSyntaxRule;
  resultFactorRules: FactorSyntaxRule;
  indicators?:{
    hi?:string
    lo?:string
    eq?:string
  }
}

const OPERATION_CODES: OperationCodeElementExtended[] = [
  {
    label: "add",
    extendedSecondFactor: false,
    detail: "add two numbers, puts the addition on the result field",
    description: "add two numbers, puts the addition on the result field",
    posibleExtensors: [
      {...ROUND_UP_EXTENSOR_H}
    ],
    firstFactorRules:{
      isRequired: false,
      shouldBeAvoided: false
    },
    secondFactorRules:{
      isRequired: true,
      shouldBeAvoided: false
    },
    resultFactorRules:{
      isRequired: true,
      shouldBeAvoided: false
    }
  },
  {
    label: "z-add",
    extendedSecondFactor: false,
    detail: "add one number and zero, puts the addition on the result field",
    description:
      "add one number and zero, puts the addition on the result field",
    posibleExtensors: [],
    firstFactorRules:{
      isRequired: false,
      shouldBeAvoided: false
    },
    secondFactorRules:{
      isRequired: true,
      shouldBeAvoided: false
    },
    resultFactorRules:{
      isRequired: true,
      shouldBeAvoided: false
    }
  },
  {
    label: "sub",
    extendedSecondFactor: false,
    detail:
      "performs the substractions of two numbers, puts the addition on the result field",
    description:
      "performs the substractions of two numbers, puts the addition on the result field",
    posibleExtensors: [],
    firstFactorRules:{
      isRequired: false,
      shouldBeAvoided: false
    },
    secondFactorRules:{
      isRequired: true,
      shouldBeAvoided: false
    },
    resultFactorRules:{
      isRequired: true,
      shouldBeAvoided: false
    }
  },
  {
    label: "alloc",
    extendedSecondFactor: false,
    detail:
      "This operations is used to allocate memory at runtime",
    description:
      "It contains two parameters: length in bytes and the pointer variable which is going to be allocated in memory",
    posibleExtensors: [
      {...ERROR_EXTENSOR_E}
    ],
    firstFactorRules:{
      isRequired: false,
      shouldBeAvoided: true
    },
    secondFactorRules:{
      isRequired: true,
      shouldBeAvoided: false
    },
    resultFactorRules:{
      isRequired: true,
      shouldBeAvoided: false
    }
  },
  {
    label: "callb",
    extendedSecondFactor: false,
    detail:
      "CALLB operation evokes a subprogram or subprocedure taht has been statically linked or bound into the main program",
    description:
      "Call a bound procedure or program",
    posibleExtensors: [
      {...ERROR_EXTENSOR_E},
      {...OPERATIONAL_DESCRIPTOR_EXTENSOR_D}
    ],
    firstFactorRules:{
      isRequired: false,
      shouldBeAvoided: true
    },
    secondFactorRules:{
      isRequired: true,
      shouldBeAvoided: false
    },
    resultFactorRules:{
      isRequired: false,
      shouldBeAvoided: false
    }
  }
];

export class OperationCodeStore {
  static getOperationCodeInformation(): OperationCodeElement[] {
    return OPERATION_CODES;
  }
  static getOperationCodeInformationElement(label:string):OperationCodeElementExtended | undefined{
    return OPERATION_CODES.find(e=>e.label === label);
  }
}
