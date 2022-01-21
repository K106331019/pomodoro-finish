import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const time = parseInt(process.env.VUE_APP_TIME)
const timebreak = parseInt(process.env.VUE_APP_TIMEBREAK)

export default new Vuex.Store({
  state: {
    sound: 'alarm.mp3',
    items: [],
    implement: '',
    finished: [],
    timestart: time,
    break: false
  },
  mutations: {
    // 選擇聲音
    selectSound (state, data) {
      state.sound = data
    },
    additem (state, data) {
      state.items.push({
        name: data,
        edit: false,
        model: data
      })
    },
    reviseitem (state, data) {
      state.items[data].edit = true
    },
    delitem (state, data) {
      state.items.splice(data, 1)
    },
    okitem (state, data) {
      state.items[data].name = state.items[data].model
      state.items[data].edit = false
    },
    returnitem (state, data) {
      state.items[data].model = state.items[data].name
      state.items[data].edit = false
    },
    start (state) {
      state.implement = state.break ? '休息一下' : state.items.shift().name
    },
    countdown (state) {
      state.timestart--
    },
    finish (state) {
      if (!state.break) {
        state.finished.push(state.implement)
      }
      state.implement = ''
      if (state.items.length > 0) {
        state.break = !state.break
      }
      state.timestart = state.break ? timebreak : time
    },
    delfinish (state, data) {
      state.finished.splice(data, 1)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({ key: 'pomodoro' })
  ]
})
