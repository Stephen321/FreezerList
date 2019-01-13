<template>
  <div id="add-item">
    <h1>Add new item</h1>
    <form action="" method="get">
      <label>Item name:</label> <input type="text" name="name"><br>
      <label>Amount:</label> <input type="text" name="amount"><br>
      <button>Add new item</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddItem'
}
</script>

<style lang="less">
#add-item {
  background-color: darkcyan;
  padding: 1em;
  margin: 1em;
  border: solid black 2px;
}
</style>
