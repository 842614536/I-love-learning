import { legacy_createStore as createStore, combineReducers} from 'redux'
import commonReduce from './reducers/common'

const store = createStore(
  combineReducers({
    commonReduce
  })
)

export default store