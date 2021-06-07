import { useState } from 'react';

export function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    return setValue(event.target.value);
  };
  const reset = () => {
    return setValue('');
  };

  return { onChange, reset, value, setValue };
}
