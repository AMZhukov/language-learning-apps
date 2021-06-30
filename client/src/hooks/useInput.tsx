import { useState } from 'react';

type InitialValueType = string;
type EventOnChangeType = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function useInput(initialValue: InitialValueType) {
  const [value, setValue] = useState<InitialValueType>(initialValue);
  const onChange = (event: EventOnChangeType): void => {
    return setValue(event.target.value);
  };
  const reset = (): void => {
    return setValue('');
  };

  return { onChange, reset, value, setValue };
}
