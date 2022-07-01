<template>
  <div>
    <span @click="toggleShow()">
      <slot></slot>
    </span>
    <a-modal
      :keyboard="false"
      :maskClosable="false"
      v-model:visible="isShow"
      :title="title"
      :confirm-loading="submtting"
      @ok="handleOk"
    >
      <a-form
        :model="formState"
        name="createReading"
      >
        <a-form-item
          label="classify"
          name="classify"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-select
            v-model:value="formState.classify"
            placeholder="Tags Mode"
            :options="classifyOptions"
          ></a-select>
        </a-form-item>
        
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRaw, defineProps } from 'vue'
import {DialogType, ReadingForm, CreateReadingProps as Props} from './ReadingList'
import {TechnologyClassify} from '../../typing/common'
  
  const props = defineProps<Props>({
    type: {
      type: DialogType,
      default: 'add'
    }
  })

  const title = ref<string>('');
  const isShow = ref<boolean>(false);
  const submtting = ref<boolean>(false);

  const classifyOptions = ['react', 'vue', 'git', 'ts']
  const formState = reactive<ReadingForm>({
    classify: '',
    title: '',
    description: '',
    address: ''
  })

  const toggleShow = (type?: DialogType) => {
    isShow.value = !isShow.value
    if (isShow.value) {
      title.value = type ? {
        add: '新增阅读清单',
        edit: '修复阅读清单'
      }[type] : ''
    // }
  }

  const handleOk = () => {
    submtting.value = true;
    toRaw(formState)
  }
</script>
