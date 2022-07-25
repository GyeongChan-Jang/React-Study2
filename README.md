# 리액트 스터디!

## Round3

> **개별 input 값 검증 → inputReducer**

- Input으로 내려준 정보들에 따라 input의 타입이 결정됨
  - 검증
    - **onChange** → input의 내용이 변하면 **inputReducer**에 action이 dispatch됨
      - app에서 내려준 validator에 따라 검증 동작
      - payload로 입력값을 전달
    - **onBlur** → focus가 사라질 때 또한!
      - validator 함수에 따라 검증 동작

> **form 전체 검증 → formReducer**

- inputHandler에 인풋에 id, value, isValid가 인수로 들어감
  - inputHandler는 input의 id, value, isValid 값을 받아 formReducer에 action을 담아 dispatch한다.
    - CHANGE → inputs에는 input값과 검증 여부가 쌓이는 로직
    - formReducer에 의해 inputs 내부 값이 쌓여 만들어진 formState 반환
      - 로그인 모드 formState
      ```jsx
      formState: {
      	inputs: {
      		email: {value: "kc9994@naver.com", isValid: true},
      		password: {value: "", isValid: false}
      	},
      	isFormValid: false
      }
      ```
    - SETFORM → 로그인 혹은 회원가입에 따라서 전체 폼 검증 여부를 전달
      - loginMode 상태에 따라 setForm에 전달하는 값들이 달라지고 isFormValid 로직도 다르게 전달한다.
      ```jsx
      const toggleSignInAndSignUp = () => {
        setLoginMode((prev) => !prev)
        if (!loginMode) {
          // 회원가입모드라면
          setForm(
            {
              ...formState.inputs
            },
            formState.inputs.email.isValid && formState.inputs.password.isValid
          )
          console.log('sign-up: ', formState)
        } else {
          // 로그인 모드라면
          setForm(
            {
              ...formState.inputs
            },
            false
          )
          console.log('sign-in: ', formState)
        }
      }
      ```
