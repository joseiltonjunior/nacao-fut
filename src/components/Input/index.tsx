import { Container } from './styles'

import { useState } from 'react'
import { InputProps } from '@/types/input'

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
