const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')

// interface ReadExcel {
//   fileName: string,
//   data: {
//     pageCond?: {
//       page: number,
//       pageSize: number
//     },
//     parameter?: object
//   }
// }

// isOriginal 直接返回读取的数据 不做操作
export default (fileName, {pageCond = {page: 1, pageSize: 10}, parameter}, isOriginal, enumExcel) =>{
  let excelPath = path.join('/Users/LPF-MacBook/Desktop/I love learning/service/src/assets/', fileName)
  let exceldata = xlsx.parse(excelPath)
  exceldata = exceldata[0].data
  let head = exceldata[0]
  exceldata.shift()


  if (parameter) {

  }
  
  let data = exceldata.slice((pageCond.page - 1) * pageCond.pageSize, pageCond.page * pageCond.pageSize)

  if (!isOriginal) {
    data = data.map(val => {
      let item = {}
      val.forEach((v, idx) => {
        Object.assign(item, {
          [enumExcel[idx]]: v
        })
      })
      return item
    })
  } else {
    data.unshift(head)
  }

  return {
    datalist: data,
    sumCount: exceldata.length
  }
}
