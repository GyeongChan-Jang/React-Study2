import Input from './shared/UI/form/Input'
import Button from './shared/UI/form/Button'
import { useLayoutEffect, useState } from 'react'
import { ButtonTypes } from './shared/enum'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH
} from './util/validator'
import { useForm } from './hooks/useForm'
import { nameErrorValue, passwordMinValue, passwordMaxValue } from './util/ErrorText'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [loginMode, setLoginMode] = useState(true)

  const { formState, inputHandler, setForm } = useForm({}, false)

  const [name, setName] = useLocalStorage('name', '없음')
  const [email, setEmail] = useLocalStorage('email', '없음')
  const [password, setPassword] = useLocalStorage('password', '없음')

  const [bgColor, setBgColor] = useLocalStorage('bg-color', 'dark')

  useLayoutEffect(() => {
    if (bgColor === 'dark') {
      document.body.style.backgroundColor = '#000'
    } else if (bgColor === 'light') {
      document.body.style.backgroundColor = 'red'
    } else {
      document.body.style.backgroundColor = '#fff'
    }
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setName(formState.inputs.name.value)
    setEmail(formState.inputs.email.value)
    setPassword(formState.inputs.password.value)
    console.log(name, email, password)
  }

  const onDarkMode = () => {
    bgColor === 'dark' ? setBgColor('light') : setBgColor('dark')
  }

  const toggleSignInAndSignUp = () => {
    setLoginMode((prev) => !prev)
    if (!loginMode) {
      // 회원가입 모드
      setForm(
        { ...formState.inputs },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
      console.log('sign-up: ', formState)
    } else {
      // 로그인 모드
      setForm({ ...formState.inputs }, false)
      console.log('sign-in: ', formState)
    }
  }

  return (
    // flex-col flex items-center justify-center py-12 px-4
    <div className="App">
      <div className="form-contianer flex items-center justify-center min-h-screen bg-gray-100">
        <div className=" px-12 py-10 mt-4 text-left bg-white shadow-lg rounded-md w-full max-w-sm">
          <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
            <h2 className="text-center p-4">{loginMode ? '로그인' : '회원가입'}</h2>
          </div>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Button onDarkMode={onDarkMode}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            </Button>
            <Button toggleSignInAndSignUp={toggleSignInAndSignUp} type={ButtonTypes.BUTTON}>
              {loginMode ? '회원가입' : '로그인'}하러 가기
            </Button>
            {!loginMode && (
              <Input
                id="name"
                label="이름"
                type="text"
                placeholder="이름을 입력하세요!"
                error={`이름은 ${nameErrorValue}자 이상 입력해주세요.`}
                validators={[VALIDATOR_MINLENGTH(2)]}
                inputHandler={inputHandler}
              />
            )}
            <Input
              id="email"
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요!"
              error="이메일 형식이 맞지 않습니다."
              validators={[VALIDATOR_EMAIL()]}
              inputHandler={inputHandler}
            />
            <Input
              id="password"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요!"
              error={`비밀번호는 ${passwordMinValue}자 이상 ${passwordMaxValue}자 이하로 입력해주세요!`}
              validators={[
                VALIDATOR_MINLENGTH(passwordMinValue),
                VALIDATOR_MAXLENGTH(passwordMaxValue)
              ]}
              inputHandler={inputHandler}
            />
            <Button disabled={!formState.isFormValid}>{loginMode ? '로그인' : '회원가입'}</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
