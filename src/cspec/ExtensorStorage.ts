import { Extensors } from "./OperationCodeStore";

export const ROUND_UP_EXTENSOR_H:Extensors = {
  label: 'h',
  detail: 'Round up the result value.',
  description: 'Half adjusted extensor'
};

export const ERROR_EXTENSOR_E:Extensors = {
  label: 'e',
  detail: 'If an error occurs during the operation %ERROR and %STATUS built-in function are set.',
  description: 'Save error on %ERROR and %STATUS.'
};

export const OPERATIONAL_DESCRIPTOR_EXTENSOR_D:Extensors = {
  label: 'd',
  detail: 'Additional information is caused for every parameter for a procedures which is called',
  description: 'Operational descriptor'
};