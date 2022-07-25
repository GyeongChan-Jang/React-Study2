import { useCallback, useReducer } from 'react'

export interface initialStateType {
  inputs: {
    [key: string]: {
      value: string
      isValid: boolean
    }
  }
  isFormValid: boolean
}

enum ActionTypes {
  CHANGE = 'CHANGE'
  // SETFORM = 'SETFORM'
}

type Actions = {
  type: ActionTypes.CHANGE
  inputId: string
  value: string
  isValid: boolean
}

const formReducer = (state: initialStateType, action: Actions): initialStateType => {
  switch (action.type) {
    case ActionTypes.CHANGE:
      let formValid = true

      for (const inputId in state.inputs) {
        // 첫번째 if문이 없으면 기존 state의 새로들어온 inputid 값이 없어서 에러가 날 수도 있음
        // 내가 알고 있으니까 그거 빼고 실행해
        // -> 일단 새로 들어온 값 몰라도 그거 빼고 진행하고 나중에 리턴 값으로 새로 들어온 값도 기존 값의 병합
        if (!state.inputs[inputId]) {
          continue
        }
        // 같으면 => inputId값이 기존의 이미 있으면 (emai, password 등)
        if (inputId === action.inputId) {
          formValid = formValid && action.isValid
        } else {
          // 다른 경우
          formValid = formValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isFormValid: formValid && action.isValid
      }
    default:
      return state
  }
}

interface InitialInputType {
  [key: string]: {
    value: string
    isValid: boolean
  }
}

export const useForm = (initialInput: InitialInputType, initialFormValid: boolean) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
    isFormValid: initialFormValid
  })

  const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatch({
      type: ActionTypes.CHANGE,
      value: value,
      inputId: id,
      isValid: isValid
    })
  }, [])

  return { formState, inputHandler }
}
