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
      currentTarget: { name }
    } = event
    console.log(name)
    let provider: any
    if (name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }
    signInWithPopup(auth, provider)
      .then((result) => console.log(result))
      .catch((error) => console.log(error))
    // const data = await signInWithPopup(auth, provider)
    // console.log(data)
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
                <div className="flex gap-2">
                  <div>
                    <svg
                      width="14px"
                      height="14px"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#fff"
                    >
                      <title>Google</title>
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                  </div>
                  <div className="text-xs leading-4">{loginMode && '구글로 로그인'}</div>
                </div>
              </Button>
              <Button name={'github'} onSocialClick={onSocialClick} disabled={false}>
                <div className="flex gap-2">
                  <div>
                    <svg
                      width="16px"
                      height="16px"
                      fill="#fff"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </div>
                  <div className="text-xs leading-4">{loginMode && '깃허브로 로그인'}</div>
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
