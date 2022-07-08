 <template>
  <div class="query-content">
    <a-row>
      <a-col :span="24">
        <a-form :model="queryParams" :label-col="{style: {width: '150px'}}">
          <a-row :gutter="16">
            <!-- 普通输入框 -->
            <a-col :span="enableThreeCol ? item.span || 8 : item.span || 12" v-for="(item, index) in queryItems" :key="index" :style="{ display: index < count ? 'block' : 'none'}">
              <a-form-item v-if="item.type === 'text'" :label="item.label + '：'">
                <a-input v-model:value="queryParams[item.prop]" :placeholder="item.placeholder ? item.placeholder : '请输入' + item.label"></a-input>
              </a-form-item>
              <!-- 普通下拉框 -->
              <a-form-item v-if="item.type === 'select'" :label="item.label + '：'">
                <a-mentions :multiple="!!item.multiple" v-model:value="queryParams[item.prop]" :clearable="item.clearable" :placeholder="item.placeholder ? item.placeholder : '请选择' + item.label" :transfer="item.transfer ? true : false">
                  <a-mentions-option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</a-mentions-option>
                </a-mentions>
              </a-form-item>
              <!-- 时间 单个 -->
              <a-form-item v-if="item.type === 'dateSingle'" :label="item.label + '：'">
                <a-datePicker :showBottomShortcut="false" :editable="item.editable || false" type="date" format="yyyy-MM-dd" placeholder="请选择日期" v-model:value="queryParams[item.prop]" @on-change="(date: any) => handleDateChange(date, item.prop)" :transfer="item.transfer ? true : false"></a-datePicker>
              </a-form-item>
              <!-- 时间组件 区间 todo props 类型搞不定 -->
              <!-- <a-form-item v-if="item.type === 'date'" :label="item.label + '：'">
                <a-row>
                  <a-col span="11">
                    <a-datePicker :showBottomShortcut="false" :editable="item.editable || false" type="date" format="yyyy-MM-dd" placeholder="开始" v-model:value="queryParams[item.props[0]]" @on-change="(date: any) => handleDateChange(date, item.props[0])" :transfer="item.transfer ? true : false"></a-datePicker>
                  </a-col>
                  <a-col span="2" class="tac">-</a-col>
                  <a-col span="11">
                    <a-datePicker :showBottomShortcut="false" :editable="item.editable || false" type="date" format="yyyy-MM-dd" placeholder="结束" v-model:value="queryParams[item.props[1]]" @on-change="(date: any) => handleDateChange(date, item.props[1])" :transfer="item.transfer ? true : false"></a-datePicker>
                  </a-col>
                </a-row>
              </a-form-item> -->
            </a-col>
            <a-col :class="[queryItems.length > minCount ? hasMore : justButton,queryText=='收起' ? 'open-style' :'']">
              <a-button size="small" class="btn current" @click="getQuery">查询</a-button>
              <a-button size="small" class="btn" style="margin-left: 8px" @click="reset">重置</a-button>
              <div class="more-search" v-if="queryItems.length > minCount">
                <a href="javascript:void(0)" @click="queryText=='展开'?(queryText='收起'):(queryText='展开')">
                  <span :class="[ queryText === '展开' ? 'icon-chaxun_icon_zhankai' : 'icon-chaxun_icon_shouqi','iconfont']"></span>
                  {{queryText}}
                </a>
              </div>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, onMounted, ref, computed, reactive} from 'vue'
import {QueryItem} from '@/typing/common'

  interface QuerySearchProps {
    queryItems: Array<QueryItem>
  }
  const props = defineProps<QuerySearchProps>()

  let queryText = ref<string>('展开')
  
  const emit = defineEmits<{
    (e: 'query', queryParams: object): void
  }>()

  onMounted(() => {
    
  })

  const queryParams = reactive<any>({})

  const hasMore: string = 'button-item-more'
  const justButton: string = 'button-item'
  
  const enableThreeCol: boolean = true
  const minCount: number = 5

  const count = computed((): number => queryText.value ==='收起' ? props.queryItems.length : minCount)

  const getQuery = () => {
    emit('query', queryParams)
  }

  const reset = () => {
    for (let key in queryParams) {
      delete queryParams[key]
    }
  }
  const handleDateChange = (prop: string, v: string) => {
    queryParams[prop] = v
  }
</script>

<style lang="less" scoped>
// todo var 添加到全局配置中
  // @import '@/assets/style/var.less';
  .button-item{
    float: right;
    text-align: right;
    flex: 1;
  }
  .button-item-more{
    float: right;
    text-align: right;
    padding-right: 70px !important;
    flex: 1;
  }
  .open-style{
    padding-bottom:24px !important;
  }
  .query-content{
    margin-top: 16px;
    padding: 24px 0px 4px;
    background: #fff;
    position:relative;
    &.no-mt {
      margin-top: 0px;
    }
    .ant-form {
      .ant-form-item:last-child {
        margin-bottom: 20px;
      }
    }
    .more-search {
      position: absolute;
      right: 0;
      top:2px;
      .iconfont,a{
        color:#767780;
      }
    }
  }
</style>
