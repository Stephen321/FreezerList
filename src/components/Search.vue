<template>
  <div class="search">
    <input class="search-box" type="text" name="name" placeholder="Search..."
      @input="$emit('input', $event.target.value)"><br>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="less">
.search {
  background-color: grey;
  padding: 1em;
  border: solid black 2px;
  margin-bottom: 1em;
  position: sticky;
  top: 0px;
  z-index: 100;
    
  .search-box {
    border-radius: 10px;
    width: 100%;
    height: 2em;
    box-sizing: border-box;
    border-radius: 5px;
  }
}

</style>
