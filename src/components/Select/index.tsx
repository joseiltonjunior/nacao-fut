import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import {
  Container,
  DropdownContainer,
  SelectedItem,
  DropdownSelection,
  DropdownItem,
  DropdownItemName,
  SelectedItemName,
} from './styles'
import Image from 'next/image'
import { SelectProps } from '@/types/select'

export function Select({
  itens,
  onAction,
  label,
  disabled,
  defaultValue,
  isLoading,
}: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  useEffect(() => {
    const itemFoundIndex = itens.findIndex((item) => item.name === defaultValue)

    setSelectedItemIndex(itemFoundIndex)
  }, [defaultValue, itens])

  if (isLoading) {
    return (
      <Container>
        <Skeleton width={'100%'} height={40} />
      </Container>
    )
  }

  return (
    <Container
      onMouseLeave={() => {
        setIsDropdownOpen(false)
      }}
      onMouseEnter={() => {
        if (!disabled) {
          setIsDropdownOpen(true)
        }
      }}
    >
      <DropdownSelection isOpen={isDropdownOpen} isDisabled={disabled}>
        <SelectedItem>
          <SelectedItemName>
            {selectedItemIndex >= 0 &&
            itens.length !== 0 &&
            selectedItemIndex < itens.length
              ? itens[selectedItemIndex].name
              : label}
          </SelectedItemName>
        </SelectedItem>
      </DropdownSelection>

      {isDropdownOpen && (
        <DropdownContainer>
          {itens.map((item, index) => (
            <DropdownItem
              key={item.name}
              onClick={() => {
                onAction(item)
                setSelectedItemIndex(index)
                setIsDropdownOpen(false)
              }}
            >
              {item.flag && (
                <Image
                  src={item.flag}
                  alt="flag country"
                  width={30}
                  height={30}
                />
              )}
              <DropdownItemName>{item.name}</DropdownItemName>
            </DropdownItem>
          ))}
        </DropdownContainer>
      )}
    </Container>
  )
}
