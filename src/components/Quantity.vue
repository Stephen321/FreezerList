<template>
  <div class="quantity">
        <img class="quantity-plus-img" src="../assets/minus.png" alt="">
        <span class="quantity-amount">{{ amount }}</span>
        <img class="quantity-minus-img" src="../assets/plus.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Quantity',
  props: {
    amount:  {
      type: Number,
      required: true
    }
  },
}
</script>

<style lang="less">
.quantity {
  background-color: rgb(129, 209, 236);
  text-align: initial;
}

.quantity-plus-img, 
.quantity-minus-img {
  background-color: lightcoral;
  vertical-align: top;
}

.quantity-amount {
  display: inline-block;
  background-color: red;
  font-size: 2.4em;
  line-height: 1.2;
}
</style>
