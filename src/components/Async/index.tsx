import { useEffect, useState } from "react"

export const Async = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(false)
    }, 1000)
  }, [])

  return (
    <div>
      <h1>Hello World!</h1>
      {isButtonVisible && <button>Button</button>}
    </div>
  )
}
