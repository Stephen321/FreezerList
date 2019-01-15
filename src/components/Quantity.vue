<template>
  <div class="quantity">
        <a class="quantity-minus" href=""><img src="../assets/minus.png" alt=""></a>
        <span class="quantity-amount">{{ amount }}</span>
        <a class="quantity-plus" href=""><img src="../assets/plus.png" alt=""></a>
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
  text-align: center;

  .quantity-clickable() {
    display: inline-block;
    vertical-align: top;
    
    img {
      background-color: lightcoral;
      vertical-align: top;
    }
  }

  .quantity-minus {
    .quantity-clickable();
    transform: translate(-40%, 0);
  }

  .quantity-plus {
    .quantity-clickable();
    transform: translate(40%, 0);
  }

  .quantity-amount {
    display: inline-block;
    background-color: red;
    font-size: 2.4em;
    line-height: 1.2;
    width: 2em;
  }
}
</style>
