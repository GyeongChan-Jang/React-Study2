import React, { useReducer } from 'react'
import { ValidatorTypes } from '../../utill/validator'
import { validate } from '../../utill/validator'

interface InputInfo {
  id: string
  label: string
  type: string
  placeholder: string
  error: string
  validators: ValidatorTypes[]
}

interface InputState {
  value: string
  isBlur: boolean
  isValid: boolean | undefined
}

// 타입을 임의의 단어로도 지정할 수 있음!
type Actions =
  | { type: 'CHANGE'; payload: string; validators: ValidatorTypes[] }
  | { type: 'BLUR' }
// reducer 함수는 인수로 초기값과 action을 받음
const inputReducer = (state: InputState, action: Actions): InputState => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators)
      }

    case 'BLUR':
      return {
        ...state,
        isBlur: true
      }

    default:
      return state
  }
}

const input = ({
  id,
  label,
  type,
  placeholder,
  error,
  validators
}: InputInfo) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isBlur: false,
    isValid: false
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CHANGE',
      payload: e.currentTarget.value,
      validators: validators
    })
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    dispatch({
      type: 'BLUR'
    })
  }

  return (
    <div>
      <div className="mb-2 block">
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default input
