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
        @finish="handleOk"
      >
        <a-form-item
          label="技术栈"
          name="classify"
          v-bind="validateInfos.classify"
        >
          <a-select
            v-model:value="formState.classify"
            :options="classifyOptions"
          ></a-select>
        </a-form-item>
        <a-form-item
          label="标题"
          name="title"
          v-bind="validateInfos.title"
        >
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item
          label="描述"
          name="description"
          v-bind="validateInfos.description"
        >
          <a-input v-model:value="formState.description" />
        </a-form-item>
        <a-form-item
          label="地址"
          name="address"
          v-bind="validateInfos.address"
        >
          <a-input v-model:value="formState.address" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, defineProps } from 'vue'
import {ReadingForm} from './ReadingListType'
import { useForm } from 'ant-design-vue/lib/form'
import {saveReadingList} from '@/api/readingListApi'

  export interface CreateReadingProps {
    type: 'add' | 'edit'
  }
  const props = defineProps<CreateReadingProps>()

  const title = ref<string>('');
  const isShow = ref<boolean>(false);
  const submtting = ref<boolean>(false);

  // lpf 把技术栈类型放到主应用 通过props传进来
  const classifyOptions = ['react', 'vue', 'git', 'ts'].map(v => {
    return {
      label: v,
      value: v
    }
  })

  // 表单规则
  const formRule = reactive({
    classify: [{ required: true, message: 'Please select classify!' }],
    title: [{ required: true, message: 'Please input title!' }],
    description: [{ required: true, message: 'Please input description!' }],
    address: [{ required: true, message: 'Please input address!' }],
  })

  // 表单数据
  const formState = reactive<ReadingForm>({
    classify: '',
    title: '',
    description: '',
    address: ''
  })

  const toggleShow = () => {
    isShow.value = !isShow.value
    if (isShow.value) {
      title.value = props.type ? {
        add: '新增阅读清单',
        edit: '修复阅读清单'
      }[props.type] : ''
    }
  }

  const {resetFields, validate, validateInfos} = useForm(formState, formRule, {
    // onValidate: (...args) => console.log(...args)
  })

  const handleOk = () => {
    submtting.value = true;
    validate().then(data => {
      console.log(data)
      saveReadingList(data)
    })
    // toRaw(formState)
  }

</script>
