<template>
  <div id="app">
    <Freezer class="panel"/>
    <AddItem class="panel"/>
  </div>
</template>

<script>
import Freezer from './components/Freezer.vue'
import AddItem from './components/AddItem.vue'

export default  {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
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

  .panel {
    @colour: darkcyan;

    //border: solid black 2px;
    background: @colour;
    margin: 1em;
    padding: 1em;
    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 3px 4px 4px darken(@colour, 15%),
          inset 1px 1px lighten(@colour, 10%);
  }
}
</style>
