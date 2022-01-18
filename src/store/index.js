import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    ghUrl: 'https://api.github.com/search/users?q=type:users',
    page: 1,
    users: {},
    queryStr: ''
  },
  actions: {
    async getFilteredUsers(ctx) {
      await axios.get(`${ctx.state.ghUrl}${ctx.state.queryStr ? ('+' + ctx.state.queryStr): ''}&page=${ctx.state.page}`)
        .then(({ data }) => {
          ctx.state.page > 1 ? ctx.commit('setLoadedUsers', data.items): ctx.commit('setInitUsers', data)
        })
        .catch(({ response }) => console.log(response.data))
    }
  },
  mutations: {
    setInitUsers(state, data) {
      state.users = data
      state.page += 1
    },
    setLoadedUsers(state, data) {
      state.users.items.push(...data)
      state.page += 1
    },
    resetQueryPage(state) {
      state.page = 1
    },
    buildStoreQueryStr(state, queryStr) {
      state.queryStr = queryStr
    },
    resetStoreQueryStr(state) {
      state.queryStr = ''
    }
  },
  getters: {
    USERS: state => state.users
  },
  modules: {
  }
})
