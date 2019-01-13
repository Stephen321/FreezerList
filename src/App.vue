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

const apiBaseUrl = "http://192.168.1.12:3000/api/"


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
  font-size: 14px;
}
</style>
