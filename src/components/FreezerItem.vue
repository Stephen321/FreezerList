<template>
  <li class="freezer-item">
    <img class="freezer-item-img" src="../assets/logo.png" alt="">
    <span class="freezer-item-name">Name</span>
    <Quantity/>
  </li>
</template>

<script>
import Quantity from './Quantity.vue'

export default {
  name: 'FreezerItem',
  components: {
    Quantity
  }
}
</script>

<style lang="less">
.freezer-item {
  background-color: lightblue;
  border: solid black 2px;
  text-align: center;
}

.freezer-item-img {
}

.freezer-item-name {
  display: block;
  background-color: lightcyan;
  border: solid black 2px;
}

</style>
