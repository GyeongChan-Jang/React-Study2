export interface ValidatorTypes {
  type: string
  value?: string | number
}

const TYPE_REQUIRE = 'REQUIRE'
const TYPE_MINLENGTH = 'MINLENGTH'
const TYPE_MAXLENGTH = 'MAXLENGTH'
const TYPE_MIN = 'MIN'
const TYPE_MAX = 'MAX'
const TYPE_EMAIL = 'EMAIL'

// 글자 유무 검증
export const VALIDATOR_REQUIRE = () => ({ type: TYPE_REQUIRE })
// 최소 글자수 검증
export const VALIDATOR_MINLENGTH = (value: number) => ({
  type: TYPE_MINLENGTH,
  value: value
})
// 최대 글자수 검증
export const VALIDATOR_MAXLENGTH = (value: number) => ({
  type: TYPE_MAXLENGTH,
  value: value
})
// 최소 글자수 -> 스트링에 + 붙이면 number가 된다!
export const VALIDATOR_MIN = (value: number) => ({
  type: VALIDATOR_MIN,
  value: value
})
export const VALIDATOR_MAX = (value: number) => ({
  type: VALIDATOR_MAX,
  value: value
})
// 이메일 검증
export const VALIDATOR_EMAIL = () => ({ type: TYPE_EMAIL })

// 모든 검증을 처리하는 함수!
export const validate = (value: string, validators: ValidatorTypes[]) => {
  // 모든 검증을 통합 처리하기 위해
  let isValid = true

  for (let validator of validators) {
    if (validator.type === TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0
    }
    // && validator.value  -> 이부분은 타입가드 validator.value가 undefined가 넘어오면 안됨!
    if (validator.type === TYPE_MINLENGTH && validator.value) {
      isValid = isValid && value.trim().length >= validator.value
    }
    if (validator.type === TYPE_MAXLENGTH && validator.value) {
      isValid = isValid && value.trim().length <= validator.value
    }
    if (validator.type === TYPE_MIN && validator.value) {
      isValid = isValid && +value >= validator.value
    }
    if (validator.type === TYPE_MAX && validator.value) {
      isValid = isValid && +value >= validator.value
    }
    if (validator.type === TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value)
    }
  }
  return isValid
}
