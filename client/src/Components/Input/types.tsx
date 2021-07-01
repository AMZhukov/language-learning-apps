import { DeepMap, FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import { CSSProperties } from 'react';

export type setCurrentValue = (value: string) => any;
interface ReactHookFormType {
  errors: DeepMap<FieldValues, FieldError>;
  name: string;
  register: UseFormRegister<FieldValues>;
  className: string;
  value?: string;
  style?: CSSProperties | undefined;
  setCurrentValue?: setCurrentValue;
}
type OptionsType = {
  [key: string]: string;
};

export interface SelectForReactHookFormType extends ReactHookFormType {
  setCurrentValue: setCurrentValue;
  options?: OptionsType[];
  size?: number;
}

export interface TextareaForReactHookFormType extends ReactHookFormType {}

export interface InputForReactHookFormType extends ReactHookFormType {
  type: string;
}

export interface CustomUniversalInputForReactHookFormType extends ReactHookFormType {
  tag: 'textarea' | 'input' | 'select';
  size?: number;
  options?: OptionsType[];
  type?: string;
}
