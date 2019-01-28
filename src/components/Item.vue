<template>
  <li class="item" :class="itemClass" @mouseleave="dialogHidden = true">
    <div class="item-img-wrapper">  
      <img class="item-img" :src="path" alt="">
      <div class="item-img-delete-overlay">
        <img @click="dialogHidden = false" class="item-img-delete-btn" :class="{'hidden-dialog': !this.dialogHidden}" src="../assets/delete.png" alt="">
        <div class="delete-confirmation-dialog" :class="{'hidden-dialog': this.dialogHidden}">
          <span>Are you sure?</span><br>
          <img @click="onDelete" src="../assets/yes.png" alt="">
          <img @click="dialogHidden = true" src="../assets/no.png" alt="">
        </div>
      </div>
    </div>
    <div class="item-name"><span>{{ name }} {{ id }}</span></div>
    <Quantity :amount="amount" @change="amountChanged"/>
  </li>
</template>

<script>
import Quantity from './Quantity.vue'
import { API, EventName } from '../constants.js'
import defaultImage from '../assets/logo.png' // TODO: really need this here?

export default {
  name: 'Item',
  props: {
    id:  { type: Number, required: true },
    name:  { type: String, required: true },
    amount:  { type: Number, required: true },
    path:  { type: String, required: true },
    found:  { type: Boolean, required: true }
  },
  data() {
    return {
      dialogHidden: true
    }
  },
  computed: {
    itemClass() {
      return {
        'item-not-found': !this.found
      }
    }
  },
  methods: {
    onDelete() {
      console.log("onDeleteClick");
      
      fetch(API.Item.Remove, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: this.id, defaultImage: this.path === defaultImage })
      }).then(res => res.json())
        .then(data => {
          let infoMessage;
          if (data.error) {
            console.error(data.info);
          }
          else {
            console.log("Server successfully removed item with id: ", this.id);
            this.$root.$emit(EventName.Item.Remove, this.id);
          }
      });
    },
    amountChanged(value) {
      const ApiUrl = (value > 0) ? API.Item.Increase : API.Item.Decrease;
      console.log(API);
      const EventToEmit = (value > 0) ? EventName.Item.Increase : EventName.Item.Decrease;
      
      if (this.amount + value < 0) {
        console.log("Can't decrease item below 0");
        return;
      }

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
            this.$root.$emit(EventToEmit, this.id);
            return "Server successfully increased/decreased item count. Emit " + EventToEmit + " event.";
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
  @img-wrapper-size: 255px;

  background-color: lightblue;
  border: solid black 2px;

  .item-img-wrapper {
    height: @img-wrapper-size;
    text-align: center;
    position: relative; // needs to not be static so it counts as "static" for the overlay absolute

    .item-img {
      width: 100%;
      height: 100%;
    }

    // TODO: separate component for this not inside img-wrapper div?
    .item-img-delete-overlay {
      z-index: 10;
      text-align: initial;
      position: absolute;
      top: 0px;
      //transform: translateY(-@img-wrapper-size);
      width: 100%;
      height: 100%;

      .item-img-delete-btn {
        float: right;
        width: 14%;
        max-width: 2.5em;
        filter: drop-shadow(1px 1px 1px black);
        padding-top: 1px;
        padding-right: 2px;
        // TODO: too much nesting
      }

      .delete-confirmation-dialog {
        width: 100%;
        text-align: center;
        //clear: right;
        position: absolute;
        top: 50%; 
        transform: translateY(-50%);

        span {
          background-color: lightcyan;
        }
        img {
          vertical-align: middle;
          max-width: 2.5em;
          margin: 1em 1em 0 1em;
          filter: drop-shadow(1px 1px 1px black);
        }
      }
    }
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
      font-size: 1.5em;
      vertical-align: middle;
      line-height: 0.8;
    }
  }

}

.item-not-found {
  border: solid 2px red;
  filter: grayscale(80%);
}

.hidden-dialog {
  visibility: hidden;
}

</style>
