import React from 'react'
import {useSelector} from 'react-redux'

const GlobalSearch:React.FC = () => {
  const isShowGlobalDialog = useSelector((state: any) => state.commonReduce.isShowGlobalDialog)

  return (
    <span>{isShowGlobalDialog && (
      <div>????</div>
    )}</span>
  )
}

export default GlobalSearch