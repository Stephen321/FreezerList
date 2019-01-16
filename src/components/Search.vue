<template>
  <div class="search">
    <input class="search-box" type="text" name="name" placeholder="Search..."><br>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="less">
.search {
  background: darkcyan;
  margin: 1em;
  padding: 1em;
  border: solid black 2px;
}

.search-box {
  border-radius: 10px;
  width: 100%;
  height: 2em;
  margin-bottom: 1em;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>
