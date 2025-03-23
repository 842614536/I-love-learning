import { useState } from "react"
const UseToggleRender = (Components: any) => {
  const [isShow, setIsShow] = useState(false)
  const toggleShow = () => {
    setIsShow(!isShow)
  }

  const renderCompotent = () => {
    if (!isShow) return null
    return (
      <Components />
    )
  }
  return [toggleShow, renderCompotent]
}

export default UseToggleRender
