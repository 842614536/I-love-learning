import React, {FC} from "react"

interface IProps {
  component: Element;
}

const asyncComponent: FC<IProps> = () => {
  return (
    <button></button>
  )
}

export default asyncComponent