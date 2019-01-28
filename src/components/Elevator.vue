<template>
  <div class="elevator" @scroll="onPageScroll" @click="scrollToBottom" :class="{ 'elevator-hidden': hasNoScrollBar}">
    <img src="../assets/down.png" alt="">
  </div>
</template>

<script>

export default {
  name: 'Elevator',
  data() {
    return {
      scrollPercentage: 0
    }
  },
  computed: {
    hasNoScrollBar() {
      return this.scrollPercentage > 80;
    }
  },
  methods: {
    onPageScroll(e) {
      // TODO: 
      // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
      var h = document.documentElement, 
          b = document.body,
          st = 'scrollTop',
          sh = 'scrollHeight';

      this.scrollPercentage = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
      console.log(this.scrollPercentage);
    },
    scrollToBottom() {// TODO: AddItem.vue repeats this logic, 
                      // it could emit an event to trigger this?
      var body = document.body,
      html = document.documentElement;

      // TODO: 
      // https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
      var height = Math.max( body.scrollHeight, body.offsetHeight, 
                            html.clientHeight, html.scrollHeight, html.offsetHeight );
      window.scrollTo({
        top: height,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style lang="less">
.elevator {
  display: block;
  background-color: rgb(37, 160, 190);
  position: fixed;
  bottom: 1%;
  right: 1%;
  padding: 10px 5px 8px 5px;
  border: black solid 1px;
  box-shadow: 1px 1px 15px 1px black;
  z-index: 5;
  cursor: grab;
  
  img {
    vertical-align: middle;
  }
}

.elevator-hidden {
  visibility: hidden;
}
</style>
