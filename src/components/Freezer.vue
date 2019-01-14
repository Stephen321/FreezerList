<template>
  <div id="freezer">
    <ul id="freezer-list">
      <FreezerItem 
      v-for="item in freezerItems"
      :item="item"
      :key="item.id"/>
    </ul>
  </div>
</template>

<script>
import FreezerItem from './FreezerItem.vue'

export default {
  name: 'Freezer',
  data() {
    return {
      freezerItems: [
        { 
          id: 0,
          name: "item 1",
          amount: 8
        },
        { 
          id: 1,
          name: "some thing 2",
          amount: 11
        },
        { 
          id: 2,
          name: "long name",//long name long name",
          amount: 9
        },
        { 
          id: 3,
          name: "another item",
          amount: 4
        },
        { 
          id: 4,
          name: "again an item",
          amount: 2
        },
        { 
          id: 5,
          name: "this is a name",
          amount: 3
        },
        { 
          id: 6,
          name: "another's name",
          amount: 5
        }
      ]
    }
  },
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
  min-width: 220px;
}

#freezer-list {
  padding: 0;
  margin: 0 0;
  list-style: none;
  background-color: cornflowerblue;
  border: solid black 2px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  grid-gap: 10px 10px;
  max-height: 572px;
  overflow-y: auto;
}
</style>
