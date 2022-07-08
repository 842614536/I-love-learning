<template>
  <span>
    <span @click="toggleShow()">
      <slot></slot>
    </span>
    <a-modal
      :keyboard="false"
      :maskClosable="false"
      v-model:visible="isShow"
      :title="title"
      :confirm-loading="submitting"
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
        <a-form-item
          label="官方文档"
          name="isDocument"
          v-bind="validateInfos.isDocument"
        >
          <a-radio-group v-model:value="formState.isDocument">
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </span>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, defineProps } from 'vue'
import {ReadingForm} from './ReadingListType'
import { useForm } from 'ant-design-vue/lib/form'
import {saveReadingList, editReadingList} from '@/api/readingListApi'
import { message } from 'ant-design-vue'
  interface CreateReadingProps {
    readonly type: 'add' | 'edit'
    query(): void,
    detail?: ReadingForm
  }

  const props = defineProps<CreateReadingProps>()

  const title = ref<string>('');
  const isShow = ref<boolean>(false);
  const submitting = ref<boolean>(false);

  enum TypeEnum {
    add = '新增',
    edit = '修改'
  }

  // todo 把技术栈类型放到主应用 通过props传进来
  const classifyOptions = ['react', 'vue', 'git', 'ts', 'FE', 'Micro-Frontends', 'socket'].map(v => {
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
    isDocument: [{ required: true }]
  })

  // 表单数据
  const initFormState: ReadingForm = {
    classify: '',
    title: '',
    description: '',
    address: '',
    isDocument: false
  }
  const formState = reactive<ReadingForm>({
    ...initFormState
  })

  const {resetFields, validate, validateInfos} = useForm(formState, formRule, {
    // onValidate: (...args) => console.log(...args)
  })

  const toggleShow = () => {
    isShow.value = !isShow.value
    if (isShow.value) {
      Object.assign(formState, props.detail || {...initFormState})
      resetFields()
      title.value = props.type ? {
        add: '新增阅读清单',
        edit: '修复阅读清单'
      }[props.type] : ''
    }
  }

  const handleOk = () => {
    validate().then(async () => {
      let data = toRaw(formState)
      submitting.value = true;
      let res: any
      if (props.type === 'add') {
        res = await saveReadingList(data)
      } else {
        res = await editReadingList(data)
      }
      submitting.value = false
      if (res.code === '0') {
        message.success('添加成功')
        props.query()
        toggleShow()
      } else {
        message.error(res.message)
      }
    })
  }

</script>
