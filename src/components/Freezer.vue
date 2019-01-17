<template>
  <div class="freezer">
    <Search @input="searchString = $event"/>
    <ul class="freezer-list">
      <FreezerItem 
      v-for="item in sortedItems"
      :item="item"
      :key="item.id"/>
    </ul>
  </div>
</template>

<script>
import Search from './Search.vue'
import FreezerItem from './FreezerItem.vue'
import { GetItemsUrl } from '../constants.js'
import Fuse from 'fuse.js'

var fuse = new Fuse([], {
  shouldSort: true,
  threshold: 0.6,
  keys: ["name"]
});

export default {
  name: 'Freezer',
  data() {
    return {
      freezerItems: [
      ],
      searchString: ""
    }
  },
  computed: {
    sortedItems: function() {
      fuse.setCollection(this.freezerItems);
      const sortedResults = fuse.search(this.searchString);
      const missingItems = this.freezerItems.filter(item => sortedResults.find(x => item.id == x.id) === undefined);
      const result = sortedResults.concat(missingItems)
      return result;
      // If you want to not see the results Fuse didnt return:
      //return (result.length == 0) ? this.freezerItems : result;
    }
  },
  mounted() {
    this.getItems();
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
    getItems() {
      fetch(GetItemsUrl)
        .then(res => res.json())
        .then(data => {
          console.log("Got item list.");
          this.freezerItems = data;
        });
    }
  },
  components: {
    Search,
    FreezerItem
  }
}
</script>

<style lang="less">
.freezer {
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
