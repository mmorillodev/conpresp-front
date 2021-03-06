import { useCallback, useState } from 'react'

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setLocalStorage = useCallback(
    (value: T) => {
      window.localStorage.setItem(key, JSON.stringify(value))
      setStoredValue(value)
    },
    [setStoredValue, key]
  )

  const destroy = useCallback(() => {
    window.localStorage.setItem(key, JSON.stringify(initialValue))
    setStoredValue(initialValue)
  }, [setStoredValue, initialValue, key])

  return [storedValue, setLocalStorage, destroy] as const
}

export default useLocalStorage
