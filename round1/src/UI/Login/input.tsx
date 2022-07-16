import React, { useReducer } from 'react'

interface InputInfo {
  id: string
  label: string
  type: string
  placeholder: string
  error: string
}

interface inputState {
  value: string
  isBlur: boolean
  isValid: boolean | undefined
}

// const [inputState, dispatch] = useReducer(inputReducer, {})

// const onChange = () => {
//   payload: e.currentTarget.value,
// }

const input = ({ id, label, type, placeholder, error }: InputInfo) => {
  return (
    <div>
      <div className="mb-2 block">
        <label htmlFor={id}>{label}</label>
      </div>
      <input id={id} type={type} placeholder={placeholder} />
    </div>
  )
}

export default input
