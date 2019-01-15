<template>
  <li class="freezer-item">
    <img class="freezer-item-img" src="../assets/logo.png" alt="">
    <div class="freezer-item-name"><span>{{ item.name }}</span></div>
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

  .freezer-item-img {
    display: block;
    margin: 0 auto;
    width: @img-size;
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
