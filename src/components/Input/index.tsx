import { Container } from './styles'

import { FieldError, UseFormRegister } from 'react-hook-form'
import { InputHTMLAttributes, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  name: string

  label: string
  register: UseFormRegister<any>
}

export function Input({
  label,
  error,
  register,

  name,

  disabled,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Container isError={!!error} isFocused={isFocused} isDisabled={disabled}>
      <input
        {...register(name)}
        placeholder={label}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        disabled={disabled}
        {...rest}
      />
    </Container>
  )
}
