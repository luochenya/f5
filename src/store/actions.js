import * as types from './mutation-types'
export default {
  getFormA ({ commit }, formA) {
    commit(types.MC_FORMA, formA)
  },
  getMeProduct ({ commit }, custWaterProd) {
    commit(types.MC_CUSTWATERPROD, custWaterProd)
  },
  getUserName ({ commit }, userName) {
    commit(types.MC_USERNAME, userName)
  },
  getUser ({ commit }, userId) {
    commit(types.MC_USER, userId)
  }
}
