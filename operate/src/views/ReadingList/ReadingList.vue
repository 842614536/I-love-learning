<template>
  <div>
    <div class="issue-fixed-title block-shadow">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col span="12">
          <h1 class="issue-title">阅读清单</h1>
        </a-col>
        <a-col span="12" class="issue-add-btn tar">
          <CreateReading type="add">
            <a-button type="primary" class="btn current">新增阅读清单</a-button>
          </CreateReading>
        </a-col>
      </a-row>
    </div>
    <br>
    <div class="issue-content">
      <a-table :dataSource="readingList" :columns="columns" />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import {ReadingListItem} from './ReadingListType'
import CreateReading from './CreateReading.vue'
  let readingList: Array<ReadingListItem> = [
    {
      id: '1',
      classify: '1',
      title: '',
      description: '',
      address: '',
      createTime: '1'
    }
  ]
  let columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 50
    },
    {
      title: '技术栈',
      dataIndex: 'classify',
      width: 90
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '地址',
      dataIndex: 'address',
    }
  ]
</script>

<style>

</style>