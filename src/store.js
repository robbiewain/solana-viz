import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blocks: []
  },
  mutations: {
    SOCKET_ONMESSAGE(state, message) {
      if (message.t != 'blk') return
      let fields = message.m.split('#')
      let block = {
        tick_height: fields[0],
        leader: fields[1],
        slot: fields[2],
        timestamp: fields[3],
        blockId: fields[4],
        parentId: state.blocks.length ? state.blocks[state.blocks.length - 1].blockId : null
      }
      state.blocks.push(block)
      if (state.blocks.length > 10) {
        state.blocks.shift()
        state.blocks[0].parentId = null
      }
    },
    SOCKET_ONOPEN() {
      console.info('Socket open')
    },
    SOCKET_ONCLOSE() {
      console.info('Socket closed')
    },
    SOCKET_ONERROR(state, event) {
      console.error('Socket error', event)
    },
    SOCKET_RECONNECT(state, count) {
      console.info('Socket reconnect', count)
    },
    SOCKET_RECONNECT_ERROR() {
      console.info('Socket reconnect error')
    },
  },
  actions: {
    sendMessage: function(context, message) {
      Vue.prototype.$socket.send(message)
      console.log({ context, message })
    }
  }
})
