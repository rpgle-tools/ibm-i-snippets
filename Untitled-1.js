

const factor1Descriptor = {
  descriptor: {
    name: "factor1",
    initialPosition: 0,
    finalPosition: 0,
  }
}

const opCodeDescriptor = {
  descriptor: {
    name: "opcode",
    initialPosition: 0,
    finalPosition: 0,
  },
}

const extensorsDescriptor = {
  descriptor: {
    name: "extensors",
    initialPosition: 0,
    finalPosition: 0,
  },
}

const factor2Descriptor = {
  descriptor: {
    name: "factor2",
    initialPosition: 0,
    finalPosition: 0,
  },
}

const resultDescriptor = {
  descriptor: {
    name: "result",
    initialPosition: 0,
    finalPosition: 0,
  },
}



const cSpecLayout = {
  type: "c",
  fields: [
    { ...factor1Descriptor },
    { ...opCodeDescriptor },
    { ...extensorsDescriptor },
    { ...factor2Descriptor },
    { ...resultDescriptor },
  ],
};

const ruleSet = {
  id: 'ruleSet1',
  description: 'This ruleset is used for the first operand of some operations like sum, sub, z-add and so on',
}

const factorMaxLengthRule =  {
  id: 'factorMaxLengthRule',
  ruleType: 'maxLength',
  value: 14,
}

const requiredValueRule = {
  id: 'requiredValueRule',
  ruleType: 'requiredValue',
  value: true
}

const singleWordValueRule = {
  id: 'singleWordValueRule',
  ruleType: 'singleWordValue',
  value: true
}

const chooseOptionValueRule = {
  id: 'chooseOptionValueRule',
  ruleType: 'chooseOptionValue',
  value: ['*none','']
}


const firstOperandRuleSetLayout = {
  layoutId: 'firstOperandRuleSetLayout1',
  applyFor: ['add','sub','z-add'],
  rules: [
    {...factorMaxLengthRule},
    {...chooseOptionValueRule},
  ],
}

const sumCSpec = [
  {
    type: 'c',
    specialLayout : 'c-sum-layout',
    fields: [
      {
        value: '',
        descriptor: {
          name: 'factor1',
          initialPosition: 0,
          finalPosition: 0, 
        },
        detail: {
          alias: 'First operand (Factor 1)',
          description: 'It is used to sum a value, is not necessary for this operation.'
        },
        ruleSet: {...firstOperandRuleSetLayout}
      }
    ]
  }
]