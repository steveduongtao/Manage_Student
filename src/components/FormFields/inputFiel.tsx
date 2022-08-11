import { TextField } from '@material-ui/core';
import { Student } from 'models';
import { InputHTMLAttributes } from 'react';
import { useController } from 'react-hook-form';
import { Control } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      label={label}
      variant="outlined"
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
