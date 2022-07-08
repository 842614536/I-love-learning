import {ref, toRaw, reactive} from 'vue'


const useQueryMixin = (getTableList: (data: any) => Promise<any>) => {
  const dataList = ref([])
  const sumCount = ref(0)
  const isLoading = ref(false)
  const pageCond = reactive({
    page: 1,
    pageSize: 10
  })

  const query = (parameter?: object) => {
    isLoading.value = true
    getTableList({
      pageCond,
      parameter: toRaw(parameter)
    }).then(res => {
      isLoading.value = false
      if (res.code === '0') {
        dataList.value = res.data.datalist
        Object.assign(pageCond, {
          page: res.data.pageCond.page,
          pageSize: res.data.pageCond.pageSize
        })
        sumCount.value = res.data.sumCount
      }
    })
  }

  const setPageCond =  (page: number, pageSize: number) => {
    Object.assign(pageCond, {
      page,
      pageSize
    })
    query()
  }

  return {
    dataList,
    sumCount,
    pageCond,
    query,
    setPageCond,
    isLoading
  }
}

export default useQueryMixin