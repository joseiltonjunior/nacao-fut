import { SelectHTMLAttributes } from 'react'

export interface ItensDropdownProps {
  value: string | number
  name: string
  defaultValue?: string
  flag?: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  itens: ItensDropdownProps[]
  label: string
  onAction(key: ItensDropdownProps): void
  isLoading?: boolean
}
