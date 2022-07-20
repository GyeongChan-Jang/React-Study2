import React, { useReducer } from 'react'
import { ValidatorTypes } from '../../../util/validator'
import { validate } from '../../../util/validator'

interface InputInfo {
  id: string
  label: string
  type: string
  placeholder: string
  error: string
  validators: ValidatorTypes[]
  inputHandler: any
}

interface InputState {
  value: string
  isBlur: boolean
  isValid: boolean | undefined
}

// 타입을 임의의 단어로도 지정할 수 있음!
type Actions = { type: 'CHANGE'; payload: string; validators: ValidatorTypes[] } | { type: 'BLUR' }
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

const input = ({ id, label, type, placeholder, error, validators }: InputInfo) => {
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
    <div className="">
      <div className="mb-2">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      </div>
      <div>
        <input
          className={`w-full px-4 py-2 border rounded-md leading-tight shadow focus:outline-none focus:shadow-out ${
            !inputState.isValid && inputState.isBlur
              ? 'ring-2 ring-red-600 focus:ring-red-600 focus:ring-2 border-none'
              : 'focus:ring-blue-600 focus:ring-2'
          }`}
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        {!inputState.isValid && inputState.isBlur && (
          <p className="text-xs text-red-600 mt-1 ml-1">{error}</p>
        )}
      </div>
    </div>
  )
}

export default input
