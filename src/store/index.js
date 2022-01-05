import { createStore } from 'vuex'
import state from './login/state'
import * as mutations from './login/mutations'
import * as actions from './login/actions'
export default createStore({
  state,
  mutations,
  actions
})
