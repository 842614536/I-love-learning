const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')


/**
 * isRewrite 如果是true   直接重写excel 不用push
 */
export default (fileName, data, isRewrite?: Boolean) =>{
  let excelPath = path.join('/Users/LPF-MacBook/Desktop/I love learning/service/src/assets/', fileName)
  let exceldata = xlsx.parse(excelPath)
  if (isRewrite === true) {
    exceldata[0].data = data
  } else {
    exceldata = xlsx.parse(excelPath)
    exceldata[0].data.splice(1, 0, data)
  }
  /** 构建数据流 */
  const buffer = xlsx.build(exceldata);
  fs.writeFileSync(excelPath, buffer)
}