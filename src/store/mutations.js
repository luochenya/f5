import * as types from './mutation-types'
export default {
  [types.MC_FORMA] (state, formA) {
    state.formA = formA
  },
  [types.MC_CUSTWATERPROD] (state, custWaterProd) {
    state.custWaterProd = custWaterProd
  },
  [types.MC_USERNAME] (state, userName) {
    state.userName = userName
  },
  [types.MC_USER] (state, userId) {
    state.userId = userId
  }
}
