<template>
  <div class="quantity">
        <img class="quantity-plus-img" src="../assets/minus.png" alt="">
        <span class="quantity-amount">0</span>
        <img class="quantity-minus-img" src="../assets/plus.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Quantity'
}
</script>

<style lang="less">
.quantity {
  background-color: rgb(129, 209, 236);
}

.quantity-plus-img, 
.quantity-minus-img {
  background-color: lightcoral;
}

.quantity-amount {
  display: inline-block;
  background-color: red;
  font-size: 2em;
}
</style>
