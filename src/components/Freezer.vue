<template>
  <div class="freezer">
    <Search @input="searchString = $event"/>
    <ul class="freezer-list">
      <FreezerItem 
      v-for="item in displayItems"
      :id="item.id"
      :name="item.name"
      :amount="item.amount"
      :found="item.found"
      :key="item.id"/>
      <!--TODO: pass whole "item" as object or each prop separately? passing item
          meant .found/itemClass in child wasnt reactive.. -->
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
      freezerItems: [],
      searchString: ""
    }
  },
  computed: {
    // display version of freezerItems are sorted by search and non-found items are
    // indicated with "notFound" bool to be styled appropiately
    // note: because objects in the arrays are references then freezerItems also 
    // gets updated/sorted anyway
    displayItems: function() {
      fuse.setCollection(this.freezerItems);
      let results = fuse.search(this.searchString);
      let missingItems = [];
      for (let item of this.freezerItems) {
          const searchAlreadyFound = !!results.find(x => item.id == x.id);
          // item.found will be used to apply the correct style
          item.found = searchAlreadyFound || this.searchString === ""; 
          if (searchAlreadyFound === false) {
            //this item wasnt returned by the search so push it onto that array
            missingItems.push(item);
          }
      }
      results = results.concat(missingItems);
      console.log(results);
      return results;
      // If you want to not see the results Fuse didnt return:
      //return (result.length == 0) ? this.freezerItems : result;
    }
  },
  mounted() {
    this.getItems();
    // TODO: add event names to constants.js? 
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
    padding: 1ex;
    margin: 0 0;
    list-style: none;
    background-color: cornflowerblue;
    border: solid black 2px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    grid-gap: 1em;
    max-height: 44em;
    overflow-y: auto;
  }
}
</style>
