<template>
  <div class="freezer">
    <button @click="tempRefreshList">Temp button refresh list</button>
    <ul class="freezer-list">
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
  mounted() {
    this.tempRefreshList();
    //TODO: add event names to constants.js? 
    // TODO: similar to using eventbus, this emits event on root instance
    // which is listened to by Freezer.vue. Better way of sharing state
    // could be with props + events depending on the use case. Vuex could
    // also be used.  
    this.$root.$on("added-item", item => this.freezerItems.push(item));
    this.$root.$on("increase-item", id => this.freezerItems.find(item => item.id == id).amount++);
    this.$root.$on("decrease-item", id => this.freezerItems.find(item => item.id == id).amount--);
  },
  methods: {
    tempRefreshList() {
      fetch(GetItemsUrl)
        .then(res => res.json())
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
.freezer {
  background-color: darkcyan;
  padding: 1em;
  margin: 1em;
  border: solid black 2px;

  .freezer-list {
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
