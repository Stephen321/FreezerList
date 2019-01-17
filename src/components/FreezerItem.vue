<template>
  <li class="freezer-item">
    <img class="freezer-item-img" src="../assets/logo.png" alt="">
    <div class="freezer-item-name"><span>{{ item.name }} {{ item.id }}</span></div>
    <Quantity :amount="item.amount" @change="amountChanged"/>
  </li>
</template>

<script>
import Quantity from './Quantity.vue'
import { DecreaseItemUrl, IncreaseItemUrl } from '../constants.js'

//TODO: images should come from server and be uploaded when adding new items.
// Stored on server filesystem with file paths in sqlite3 database.
export default {
  name: 'FreezerItem',
  props: {
    item:  {
      type: Object,
      required: true
    }
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
        body: JSON.stringify({ id: this.item.id})
      }).then(res => {
          if (res.status == 200) {
            // TODO: same note as for emit in Freezer.vue except there it was the challenge
            // of getting an event to a sibling component while this case is more straight 
            // forward as the event has to go up 2 parents. (no need to use $root)
            this.$root.$emit(EventName, this.item.id);
            return "Server successfully increased/decreased item count. Emit " + EventName + " event.";
          } 
          return res.text();
      }).then(info => {
        console.log(info);
        // TODO: remove this temporary html element output
        const ID = "temp-err-div-quantity";
        let errNode = document.createElement("div");
        errNode.id = ID;
        errNode.innerHTML = info;
        errNode.style = "margin-top: 5px; background-color: indianred; border: solid darkred 3px;";
        document.body.appendChild(errNode);
        setTimeout(() => {
          document.body.removeChild(errNode);
        }, 5000);
      });
    }
  },
  components: {
    Quantity
  }
}
</script>

<style lang="less">
.freezer-item {
  background-color: lightblue;
  border: solid black 2px;

  .freezer-item-img {
    @img-size: 200px;

    display: block;
    margin: 0 auto;
    // TODO: wrap img in div so that div is always img-size x img-size and img is centered
    // inside it?
    //width: @img-size;
    height: @img-size;
  }

  .freezer-item-name {
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
</style>
