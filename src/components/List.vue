<template>
  <div class="list">
    <Search @input="onSearchInput"/>
    <ul class="list-grid">
      <Item 
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
import Item from './Item.vue'
import { GetItemsUrl } from '../constants.js'
import Fuse from 'fuse.js'

var fuse = new Fuse([], {
  shouldSort: true,
  threshold: 0.6,
  keys: ["name"]
});

export default {
  name: 'List',
  data() {
    return {
      listItems: [],
      searchString: ""
    }
  },
  computed: {
    // display version of listItems are sorted by search and non-found items are
    // indicated with "notFound" bool to be styled appropiately
    // note: because objects in the arrays are references then listItems also 
    // gets updated/sorted anyway
    displayItems: function() {
      fuse.setCollection(this.listItems);
      let results = fuse.search(this.searchString);
      let missingItems = [];
      for (let item of this.listItems) {
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
      //return (result.length == 0) ? this.listItems : result;
    }
  },
  mounted() {
    console.log(this.$el);
    this.getItems();
    // TODO: add event names to constants.js? 
    this.$root.$on("added-item", item => {
      this.listItems.push(item)
      this.scrollToBottom(); 
      //TODO: could also have a watch on this.listItems for length change
    });
    this.$root.$on("increase-item", id => this.listItems.find(item => item.id == id).amount++);
    this.$root.$on("decrease-item", id => this.listItems.find(item => item.id == id).amount--);
  },
  methods: {
    onSearchInput(value) {
      this.searchString = value;
      this.scrollToTop();
    },
  	scrollToTop() {    	
      var container = this.$el.querySelector(".freezer-list");
      container.scrollTop = 0;
    },
  	scrollToBottom() {    	
      var container = this.$el.querySelector(".freezer-list");
      container.scrollTop = container.scrollHeight;
    },
    getItems() {
      fetch(GetItemsUrl)
        .then(res => res.json())
        .then(data => {
          console.log("Got item list.");
          this.listItems = data;
        });
    }
  },
  components: {
    Search,
    Item
  }
}
</script>

<style lang="less">
.list {
  .list-grid {
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
