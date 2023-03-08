import { ChangeEvent, useState } from 'react';

type ValidateFunction = (value: string) => boolean;

const useInput = (validateValue: ValidateFunction, defaultValue = '') => {
  const [value, setValue] = useState<string>(defaultValue);
  const [touched, setTouched] = useState<boolean>(false);

  const valid = validateValue(value);
  const error = touched && !valid;

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = (event?: FocusEvent) => {
    setTouched(true);
  };

  const reset = () => {
    setValue('');
  }

  return {
    value,
    touched,
    valid,
    error,
    reset,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
