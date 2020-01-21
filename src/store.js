import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const MAX_SLOTS = 10

export default new Vuex.Store({
  state: {
    blocks: []
  },
  mutations: {
    addSlotChange(state, slotChange) {
      if (state.blocks.length > MAX_SLOTS) return
      // Clear the parent if it's unknown
      if (!state.blocks.find((block) => block.slot === slotChange.parent)) {
        slotChange.parent = null
      }
      state.blocks.push(slotChange)
    }
  }
})
