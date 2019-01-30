<template>
  <div id="app">
    <List/>
    <AddItem/>
    <Elevator/>
  </div>
</template>

<script>
import List from './components/List.vue'
import AddItem from './components/AddItem.vue'
import Elevator from './components/Elevator.vue'
import Fonts from './assets/css/fonts.css'

export default  {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    List,
    AddItem,
    Elevator
  }
}
</script>

<style lang="less">
@import './assets/css/colors.less';

html {
  font-size: 10px;
  font-family: 'Lato', sans-serif;
  background-color: @color-background;
  body {
    margin: 0;

    #app {
      min-width: 220px;
      max-width: 130em;
      margin: 0 auto;
    }
  }
}
</style>
