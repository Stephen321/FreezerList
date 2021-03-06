<template>
  <div class="list">
    <Search @input="onSearchInput"/>
    <ul class="list-grid">
      <Item 
      v-for="item in displayItems"
      :id="item.id"
      :name="item.name"
      :amount="item.amount"
      :path="item.path"
      :found="item.found"
      :key="item.id"/>
      <!--TODO: pass whole "item" as object or each prop separately? passing item
          meant .found/itemClass in child wasnt reactive.. but passing each separately
          is longer and more difficult to maintain. -->
    </ul>
  </div>
</template>

<script>
import Search from './Search.vue'
import Item from './Item.vue'
import { API, EventName } from '../constants.js'
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
      return results;
      // If you want to not see the results Fuse didnt return:
      //return (result.length == 0) ? this.listItems : result;
    }
  },
  mounted() {
    this.getItems();
    // TODO: add event names to constants.js? 
    this.$root.$on(EventName.Item.Add, item => {
      this.listItems.push(item)
    });
    this.$root.$on(EventName.Item.Remove, id => {
      this.listItems.splice(this.listItems.findIndex(item => item.id === id), 1);
    });
    this.$root.$on(EventName.Item.Increase, id => {
      this.listItems.find(item => item.id === id).amount++
    });
    this.$root.$on(EventName.Item.Decrease, id => {
      this.listItems.find(item => item.id === id).amount--
    });
  },
  methods: {
    onSearchInput(value) {
      this.searchString = value;
      this.scrollToTop();
    },
  	scrollToTop() {    	
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    getItems() {
      fetch(API.Item.GetAll)
        .then(res => res.json())
        .then(data => {
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
@import '../assets/css/colors.less';

.list {
  background: @color-panel;
  margin: 3em;
  padding: 1em 0;

  .list-grid {
    padding: 0;
    margin: 0 2em;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    grid-gap: 1.5em;
    overflow-x: hidden;
  }
}
</style>
