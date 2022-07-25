import { useCallback, useReducer } from 'react'

export interface initialStateType {
  // inputHandler를 통해 쌓이는 inputValue들에 모음
  inputs: {
    // 예시 -> email: {value: '', isValid: false}
    [key: string]: {
      value: string
      isValid: boolean
    }
  }
  // 전체 폼에 검증
  isFormValid: boolean
}

// Action (dispatch 함수에 입력할 액션 타입)
enum ActionTypes {
  CHANGE = 'CHANGE',
  SETFORM = 'SETFORM'
}

// CHANGE일 때
// -> 액션 크리에이터에 inputId, value, isValid가 담겨야함
// -> 각 input에 입력하는 input 값들을 누적해가는 개념
// SETFORM일 때
// -> 액션 크리에이터에 inputs, isFormValid가 담겨야함
// -> 로그인/회원가입 모드를 결정해서 -> input들을 그에 맞게 변경함
type Actions =
  | {
      type: ActionTypes.CHANGE
      inputId: string
      value: string
      isValid: boolean
    }
  | {
      type: ActionTypes.SETFORM
      inputs: InitialInputType
      isFormValid: boolean
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
        // inputs 객체에 새로운 input(값을 입력받는 input)을 쌓는다
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isFormValid: formValid && action.isValid
      }

    case ActionTypes.SETFORM:
      return {
        inputs: action.inputs,
        isFormValid: action.isFormValid
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
  // 예시 -> 인풋에 따라 다름 email: {value: '', isValid: false}
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

  const setForm = (inputData: InitialInputType, formValidity: boolean) => {
    dispatch({
      type: ActionTypes.SETFORM,
      inputs: inputData,
      isFormValid: formValidity
    })
  }

  return { formState, inputHandler, setForm }
}
