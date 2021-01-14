import * as React from 'react'

function useLocalStorage(key, initialValue = null) {
  const [item, setItem] = React.useState(() => {
    try {
      const storedItem = window.localStorage.getItem(key)
      return storedItem ? JSON.parse(storedItem) : initialValue
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, "local storage not working")
      return initialValue
    }
  })

  const setValue = (value) => {
    const storableValue = value instanceof Function ? value(item) : value
    setItem(storableValue)
    window.localStorage.setItem(key, JSON.stringify(storableValue))
  }
  return [item, setValue]
}

export default useLocalStorage
