import { createStore, useStore } from 'vuex'

const store = createStore({
  mutations:{
    setPage(state, val) {
      state.page = val
    },
    resetPage(state) {
      state.page = 0
    },
    setParams(state, params) {
      state.params = params
    }
  },
  state: {
    page: 1,
    params: {
      sortMode: 0,
      timeRangeMode: 0,
      pageSize: 10,
    }
  }
})

export default store