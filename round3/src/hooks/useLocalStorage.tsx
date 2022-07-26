import { useState } from 'react'

type localValue = string | number

const useLocalStorage = (key: string, defalutValue: localValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key)

      if (value) {
        return JSON.parse(value)
      } else {
        localStorage.setItem(key, JSON.stringify(defalutValue))
        // return defaultValue
      }
    } catch (error) {
      console.log(error)
      return defalutValue
    }
  })

  const setValue = (newValue: localValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.log(error)
    }
    setStoredValue(newValue)
  }
  return [storedValue, setValue]
}

export default useLocalStorage
