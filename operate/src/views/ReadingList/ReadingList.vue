<template>
  <span>
    <div class="issue-fixed-title block-shadow">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col span="12">
          <h1 class="issue-title">阅读清单</h1>
        </a-col>
        <a-col span="12" class="issue-add-btn tar">
          <CreateReading type="add" :query="query">
            <a-button type="primary" class="btn current">新增阅读清单</a-button>
          </CreateReading>
        </a-col>
      </a-row>
    </div>
    <br>
    <div class="issue-content">
      <QuerySearch :queryItems="queryItems" @query="(data) => query(data)"></QuerySearch>
      <a-divider />
      <a-table :scroll="{x: '80%'}" :dataSource="dataList" :columns="columns" :pagination="false" :loading="isLoading">
        <template #bodyCell="{ column, record, index}">
          <template v-if="column.key === 'index'">
            {{index + 1}}
          </template>
          <template v-if="column.key === 'action'">
            <span>
              <a @click="comeOn(record)">冲冲冲</a>
              <a-divider type="vertical" />
              <a>阅读记录</a>
              <a-divider type="vertical" />
              <CreateReading type="edit" :query="query" :detail="record">
                <a>修改</a>
              </CreateReading>
              <a-divider type="vertical" />
              <a @click="deleteAction(record)" class="ant-red">删除</a>
            </span>
          </template>
        </template>
      </a-table>
      <br>
      <a-pagination
        @change="setPageCond"
        :showQuickJumper="true"
        :showSizeChanger="true"
        :current="pageCond.page"
        :page-size="pageCond.pageSize"
        :total="sumCount"
        :show-total="(total: number) => `Total ${total} items`"
      />
    </div>
  </span>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted} from 'vue'
import {ReadingListItem} from './ReadingListType'
import CreateReading from './CreateReading.vue'
import {queryReadingList, deleteReadingList} from '@/api/readingListApi'
import useQueryMixin from '@/mixins/list.mixins'
import {useRouter} from 'vue-router'
import QuerySearch from '@/components/QuerySearch.vue'
import {QueryItem} from '@/typing/common'
import { message, Modal } from 'ant-design-vue'


  const router = useRouter()
  const {dataList, sumCount, pageCond, query, setPageCond, isLoading} = useQueryMixin(queryReadingList)

  const queryItems: Array<QueryItem> = [
    {
      type: 'text',
      label: '标题',
      prop: 'title'
    }
  ]

  let columns = [
    {
      title: '序号',
      key: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '技术栈',
      dataIndex: 'classify',
      width: 90,
      align: 'center'
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 300,
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 600,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      align: 'center'
    },
    {
      title: '上次更新',
      dataIndex: 'updateTime',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: 250,
    },
  ]

  onMounted(() => {
    query()
  })

  const comeOn = (record: ReadingListItem) => {
    window.open(record.address)
  }

  const deleteAction = (record: ReadingListItem) => {
    Modal.confirm({
      title: 'Confirm',
      // icon: createVNode(ExclamationCircleOutlined),
      content: '确认删除?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteReadingList(record.id).then(res => {
          if (res.code === '0') {
            message.success('删除成功')
            query()
          }
        })
      },
    })
    
  }
</script>
<style>

</style>