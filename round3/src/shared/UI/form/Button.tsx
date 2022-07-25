import React from 'react'
import { ButtonTypes } from '../../enum'

interface ChildProps {
  href?: string
  children?: React.ReactNode
  large?: boolean
  small?: boolean
  danger?: boolean
  inverse?: boolean
  defaultColor?: boolean
  to?: string
  disabled?: boolean
  type?: ButtonTypes
  defaultSize?: string
  toggleSignInAndSignUp?: any
}

const Button = ({
  href,
  children,
  large,
  small,
  danger,
  inverse,
  type,
  defaultColor,
  to,
  disabled,
  toggleSignInAndSignUp
}: ChildProps) => {
  return (
    <button
      className={`px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 ${
        large ? 'w-64' : ''
      } ${small ? 'w-28 h-10 text-xs break-normal' : ''}`}
      type={type}
      disabled={disabled}
      onClick={toggleSignInAndSignUp}
    >
      {children}
    </button>
  )
}

export default Button
