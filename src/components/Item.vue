<template>
  <li class="item" :class="itemClass">
    <img class="item-img" :src="path" alt="">
    <div class="item-name"><span>{{ name }} {{ id }}</span></div>
    <Quantity :amount="amount" @change="amountChanged"/>
  </li>
</template>

<script>
import Quantity from './Quantity.vue'
import { DecreaseItemUrl, IncreaseItemUrl } from '../constants.js'

//TODO.feature: delete X and confirmation overlay (only within component)

//TODO: images should come from server and be uploaded when adding new items.
// Stored on server filesystem with file paths in sqlite3 database.
export default {
  name: 'Item',
  props: {
    id:  { type: Number, required: true },
    name:  { type: String, required: true },
    amount:  { type: Number, required: true },
    path:  { type: String, required: true },
    found:  { type: Boolean, required: true }
  },
  computed: {
    itemClass() {
      return {
        'item-not-found': !this.found
      }
    },
  },
  methods: {
    amountChanged(value) {
      const ApiUrl = (value > 0) ? IncreaseItemUrl : DecreaseItemUrl;
      const EventName = (value > 0) ? "increase-item" : "decrease-item";
      
      fetch(ApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // TODO: using json body for just 1 number okay?
        body: JSON.stringify({ id: this.id})
      }).then(res => {
          if (res.status == 200) {
            // TODO: same note as for emit in List.vue except there it was the challenge
            // of getting an event to a sibling component while this case is more straight 
            // forward as the event has to go up 2 parents. (no need to use $root)
            this.$root.$emit(EventName, this.id);
            return "Server successfully increased/decreased item count. Emit " + EventName + " event.";
          } 
          return res.text();
      }).then(info => {
        console.log(info);
      });
    }
  },
  components: {
    Quantity
  }
}
</script>

<style lang="less">
.item {
  background-color: lightblue;
  border: solid black 2px;

  .item-img {
    @img-size: 200px;

    display: block;
    margin: 0 auto;
    // TODO: wrap img in div so that div is always img-size x img-size and img is centered
    // inside it?
    width: 100%;
    height: @img-size;
  }

  .item-name {
    background-color: lightcyan;
    border-style: solid;
    border-width: 2px 0;
    text-align: center;
    line-height: 4em;
    max-height: 4em;

    span {
      display: inline-block;
      font-size: 2em;
      vertical-align: middle;
      line-height: 0.8;
    }
  }

}

.item-not-found {
  border: solid 2px red;
  filter: grayscale(80%);
}
</style>
