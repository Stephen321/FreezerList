<template>
  <div class="quantity">
        <a class="quantity-minus" href="" @click.prevent="$emit('change', -1)"><img src="../assets/minus.png" alt=""></a>
        <span class="quantity-amount">{{ amount }}</span>
        <a class="quantity-plus" href=""  @click.prevent="$emit('change', 1)"><img src="../assets/plus.png" alt=""></a>
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
  @amount-width: 29%;
  @clickable-width: ((100% - @amount-width) / 2);

  background-color: rgb(129, 209, 236);

  .quantity-clickable() {
    display: inline-block;
    vertical-align: top;
    width: @clickable-width;
    text-align: center;
    img {
      vertical-align: top;
    }
  }

  .quantity-minus {
    .quantity-clickable();
    //transform: translate(-40%, 0);
  }

  .quantity-amount {
    display: inline-block;
    background-color: darkslategrey;
    color: white;
    text-align: center;
    font-size: 2.4em;
    line-height: 1.2;
    width: @amount-width;
  }

  .quantity-plus {
    .quantity-clickable();
    //transform: translate(40%, 0);
  }
}
</style>
