<template>
  <div id="freezer">
    <button @click="tempRefreshList">Temp button refresh list</button>
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
import { GetItemsUrl } from '../constants.js'

export default {
  name: 'Freezer',
  data() {
    return {
      freezerItems: [
      ]
    }
  },
  created() {
    this.tempRefreshList();
  },
  methods: {
    tempRefreshList() {
      console.log("temp refresh list");
      fetch(GetItemsUrl
      /*, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
       */
       )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.freezerItems = data;
        });
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

  #freezer-list {
    padding: 0;
    margin: 0 0;
    list-style: none;
    background-color: cornflowerblue;
    border: solid black 2px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    grid-gap: 10px 10px;
    max-height: 44em;
    overflow-y: auto;
  }
}
</style>
