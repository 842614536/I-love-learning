import { Injectable } from '@nestjs/common';
import readExcel from 'src/utils/readExcel';
import writeExcel from 'src/utils/writeExcel';


// 这个顺序跟excel表头顺序必须一致
enum ReadingListExcelEnum {
  id = 0,
  createTime,
  updateTime,
  readingRecord,
  classify,
  title,
  description,
  address,
  isDocument,
}

@Injectable()
export class ReadingListService {
  query(data): any {
    return {
      code: '0',
      data: {
        pageCond: data.pageCond || {page: 1, pageSize: 10},
        ...readExcel('reading-list.xlsx', data, false, ReadingListExcelEnum)
      },
      message: '成功'
    }
  }

  save(data): any {
    let category = ['classify', 'title', 'description', 'address', 'isDocument']
    // id 和创建时间
    let nowDate: string = String(+new Date())
    let id: string = data.id || nowDate
    let createTime: string = data.id || nowDate
    let updateTime = data.id ? nowDate : '--'
    // 依次: id 创建时间 更新时间 阅读记录
    let transformData = [id, createTime, updateTime, [], ...category.map(v => data[v])]
    console.log(transformData)
    writeExcel('reading-list.xlsx', transformData)
    return {
      code: '0',
      message: '成功'
    }
  }

  delete(id) {
    let allData = readExcel('reading-list.xlsx', {
      pageCond: {page: 1, pageSize: 999999},
      parameter: null
    }, true, ReadingListExcelEnum).datalist
    writeExcel('reading-list.xlsx', allData.filter(v => (v[0] !== id) || v[0] === 'id'), true)
    return {
      code: '0',
      message: '成功'
    }
  }

  edit(data) {
    this.delete(data.id)
    this.save(data)
    return {
      code: '0',
      message: '成功'
    }
  }
}
