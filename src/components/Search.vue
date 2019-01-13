<template>
  <div id="search">
    <h1>Search:</h1>
    <input id="search-box" type="text" name="name"><br>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="less">
#search {
  background: darkcyan;
  margin: 1em;
  padding: 1em;
  border: solid black 2px;
}

#search-box {
  border-radius: 10px;
  width: 100%;
  height: 2em;
  margin-bottom: 1em;
}
</style>
