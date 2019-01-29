<template>
  <div id="app">
    <List class="panel"/>
    <AddItem class="panel"/>
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
html {
  font-size: 10px;
  font-family: 'Lato', sans-serif;

  body {
    margin: 0;

    #app {
      min-width: 220px;
      max-width: 130em;
      margin: 0 auto;
    }

    .panel {
      @colour: darkcyan;

      //border: solid black 2px;
      background: @colour;
      margin: 1.25em;
      padding: 1.25em; // TODO: padding here or use margin inside?
      /* offset-x | offset-y | blur-radius | spread-radius | color */
      box-shadow: 2px 3px 4px darken(@colour, 15%);
    }
  }
}
</style>
