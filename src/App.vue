<template>
  <div id="app">
    <img id="logo" alt="Solana logo" src="./assets/logo.png">
    <BlockViz />
  </div>
</template>

<script>
import BlockViz from './components/BlockViz.vue'

export default {
  name: 'app',
  components: {
    BlockViz
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
#logo {
  width: 300px;
}
</style>
