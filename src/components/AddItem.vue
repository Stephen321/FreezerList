<template>
  <div id="add-item">
    <h1>Add new item</h1>
    <form :action="AddItemUrl" method="post">
      <label>Item name:</label> <input type="text" name="name"><br>
      <label>Amount:</label> <input type="number" name="amount"><br>
      <button type="submit">Add new item</button>
    </form>
  </div>
</template>

<script>
import { AddItemUrl } from '../constants.js'

export default {
  name: 'AddItem',
  data() {
    return {
      AddItemUrl
    }
  }
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
