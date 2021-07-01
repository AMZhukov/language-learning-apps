import { useState } from 'react';

type EventOnChangeType = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export interface IUseInput {
  onChange: (event: EventOnChangeType) => void;
  reset: () => void;
  value: string;
  setValue: (string: string) => void;
}

export const useInput = (initialValue: string): IUseInput => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event: EventOnChangeType): void => {
    return setValue(event.target.value);
  };
  const reset = (): void => {
    return setValue('');
  };

  return { onChange, reset, value, setValue };
};
