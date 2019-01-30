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
@import '../assets/css/colors.less';

.quantity {
  @amount-width: 29%;
  @clickable-width: ((100% - @amount-width) / 2);


  .quantity-clickable() {
    display: inline-block;
    vertical-align: top;
    width: @clickable-width;
    text-align: center;
    background-color: @color-quantity;
    img {
      vertical-align: top;
    }

    &:hover {
      background: darken(@color-quantity, 20%);
    }
  }

  .quantity-minus {
    .quantity-clickable();
    //transform: translate(-40%, 0);
  }

  .quantity-amount {
    display: inline-block;
    background-color: @color-quantity-amount;
    color: @color-quantity-text;
    text-align: center;
    font-size: 34px; //TODO: use a % instead?
    line-height: 1.2;
    width: @amount-width;
  }

  .quantity-plus {
    .quantity-clickable();
    //transform: translate(40%, 0);
  }
}
</style>
