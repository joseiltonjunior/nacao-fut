import { InputHTMLAttributes } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  name: string

  label: string
  register: UseFormRegister<any>
}
