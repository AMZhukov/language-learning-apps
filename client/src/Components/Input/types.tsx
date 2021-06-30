import { DeepMap, FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import { CSSProperties } from 'react';

interface ReactHookFormType {
  errors: DeepMap<FieldValues, FieldError>;
  name: string;
  register: UseFormRegister<FieldValues>;
  className: string;
  value?: string;
  style?: CSSProperties | undefined;
  setCurrentValue?: (value: number | string | null) => any;
}
type OptionsType = {
  [key: string]: string;
};

export interface SelectForReactHookFormType extends ReactHookFormType {
  setCurrentValue: (value: number | string | null) => any;
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
