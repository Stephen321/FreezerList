<template>
  <div class="search">
    <input class="search-box" type="text" name="name" placeholder="Search..."
      @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="less">
@import '../assets/css/colors.less';

.search {
  background-color: @color-search;
  margin: 0 1em 2em 1em;
  padding: 1em 1em;
  border: solid darken(grey, 40%) 1px;
  position: sticky;
  top: 0px;
  z-index: 100;
    
  .search-box {
    border-radius: 10px;
    color: @color-search-txt;
    width: 100%;
    font-size: 3em;
    box-sizing: border-box;
    border-radius: 5px;
  }
}

</style>
