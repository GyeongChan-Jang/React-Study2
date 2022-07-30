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
  onSocialClick?: any
  onSubmit?: any
  onDarkMode?: any
  name?: string
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
  toggleSignInAndSignUp,
  onSubmit,
  name,
  onSocialClick
}: ChildProps) => {
  return (
    <button
      name={name}
      className={`px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 ${
        large ? 'w-64' : ''
      } ${small ? 'w-28 h-10 text-xs break-normal' : ''} ${
        name === 'google' ? 'w-1/2 bg-[#EA4335] text-white hover:bg-red-600 focus:bg-red-700' : ''
      } ${name === 'github' ? 'w-1/2 bg-black hover:bg-gray-800 focus:bg-gray-900' : ''}`}
      type={type}
      disabled={disabled}
      onClick={name ? onSocialClick : toggleSignInAndSignUp}
    >
      {children}
    </button>
  )
}

export default Button
