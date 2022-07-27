import Input from './shared/UI/form/Input'
import Button from './shared/UI/form/Button'
import { useState } from 'react'
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
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { auth } from './firebase'

function App() {
  const [loginMode, setLoginMode] = useState(true)

  const { formState, inputHandler, setForm } = useForm({}, false)

  const onSocialClick = async (event: any) => {
    event.preventDefault()
    const {
      target: { name }
    } = event
    let provider: any
    if (name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }
    const data = await signInWithPopup(auth, provider)
    console.log(data)
  }

  const toggleSignInAndSignUp = () => {
    setLoginMode((prev) => !prev)
    if (!loginMode) {
      setForm(
        { ...formState.inputs },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    } else {
      setForm({ ...formState.inputs }, false)
    }
  }

  return (
    <div className="App">
      <div className="form-contianer flex items-center justify-center min-h-screen bg-gray-100">
        <div className=" px-12 py-10 mt-4 text-left bg-white shadow-lg rounded-md w-full max-w-sm">
          <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
            <h2 className="text-center p-4">{loginMode ? '로그인' : '회원가입'}</h2>
          </div>
          <form className="flex flex-col gap-4">
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
            <p className="text-center text-gray-600">다른 방식으로 로그인</p>
            <div className="flex gap-4">
              <Button onSocialClick={onSocialClick} name={'google'} disabled={false}>
                {loginMode && '구글로 로그인'}
              </Button>
              <Button name={'github'} onSocialClick={onSocialClick} disabled={false}>
                {loginMode && '깃허브로 로그인'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
