import Input from './UI/form/Input'

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from './utill/validator'

function App() {
  return (
    // flex-col flex items-center justify-center py-12 px-4
    <div className="App">
      <div className="form-contianer flex items-center justify-center min-h-screen bg-gray-100">
        <div className=" px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md">
          <div className="text-center">
            <h2>회원가입</h2>
          </div>
          <form className="flex flex-col gap-4">
            <Input
              id="name"
              label="이름"
              type="text"
              placeholder="이름을 입력하세요!"
              error="이름은 두 글자 이상 입력해주세요."
              validators={[VALIDATOR_REQUIRE()]}
            />
            <Input
              id="email"
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요!"
              error="이메일 형식이 맞지 않습니다."
              validators={[VALIDATOR_EMAIL()]}
            />
            <Input
              id="password"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요!"
              error="비밀번호는 8자 이상 20자 이하로 입력해주세요!"
              validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MINLENGTH(20)]}
            />
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
