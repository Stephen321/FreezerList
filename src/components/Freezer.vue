<template>
  <div id="freezer">
    <h1>Items:</h1>
    <ul id="freezer-list">
      <FreezerItem/>
      <FreezerItem/>
      <FreezerItem/>
      <FreezerItem/>
      <FreezerItem/>
      <FreezerItem/>
      <FreezerItem/>
      <FreezerItem/>
      <FreezerItem/>
    </ul>
  </div>
</template>

<script>
import FreezerItem from './FreezerItem.vue'

export default {
  name: 'Freezer',
  components: {
    FreezerItem
  }
}
</script>

<style lang="less">
#freezer {
  background-color: darkcyan;
  padding: 1em;
  margin: 1em;
  border: solid black 2px;
}

#freezer-list {
  padding: 0 0;
  margin: 0 0;
  list-style: none;
  background-color: cornflowerblue;
  border: solid black 2px;
  display: grid;
  //grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px 10px;
}
</style>
