<template>
  <li class="freezer-item">
    <img class="freezer-item-img" src="../assets/logo.png" alt="">
    <span class="freezer-item-name">{{ item.name }}</span>
    <Quantity :amount="item.amount"/>
  </li>
</template>

<script>
import Quantity from './Quantity.vue'

export default {
  name: 'FreezerItem',
  props: {
    item:  {
      type: Object,
      required: true
    }
  },
  components: {
    Quantity
  }
}
</script>

<style lang="less">
@img-size: 200px;

.freezer-item {
  background-color: lightblue;
  border: solid black 2px;
}

.freezer-item-img {
  display: block;
  margin: 0 auto;
  width: @img-size;
  height: @img-size;
}

.freezer-item-name {
  display: block;
  background-color: lightcyan;
  font-size: 2em;
  border-style: solid;
  border-width: 2px 0;
  text-align: center;
  line-height: 1.2;
}

</style>
