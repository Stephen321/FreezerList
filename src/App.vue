<template>
  <div id="app">
    <Search/>
    <Freezer/>
    <AddItem/>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Freezer from './components/Freezer.vue'
import AddItem from './components/AddItem.vue'

export default  {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    Search,
    Freezer,
    AddItem
  }
}
</script>

<style lang="less">
body {
  margin: 0;
  #app {
    font-size: 14px;
    min-width: 220px;
    max-width: 80em;
    margin: 0 auto;
  }
}
</style>
