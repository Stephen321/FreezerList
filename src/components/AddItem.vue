<template>
  <div id="add-item">
    <h1>Add new item</h1>
    <form @submit.prevent="addItem">
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
  methods: {
    addItem(e) {
      console.log("Client sending POST request to add new item.");
      //TODO: this or v-model, which is better? v-model updates data 
      //on every input event, also need to store in data object even 
      //tho this component doesnt care about it after it was submitted
      const item = {
        name: e.target.elements.name.value,
        amount: parseInt(e.target.elements.amount.value)
        };
        console.log(item);
      fetch(AddItemUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      }).then(res => {
          if (res.status == 200) {
            //TODO: similar to using eventbus, this emits event on root instance
            //which is listened to by Freezer.vue. Better way of sharing state
            //could be with props + events depending on the use case. For this,
            //Vuex could be used.  
            this.$root.$emit("addedItem", item);
            return "Server successfully added item. Emit addedItem event to parent.";
          } 
          return res.text();
      }).then(info => {
        console.log(info);
        //TODO: remove this temporary html element output
        const ID = "temp-err-div";
        let errNode = document.getElementById(ID);
        if (errNode === null) {
          errNode = document.createElement("div");
          errNode.id = ID;
          errNode.style = "margin-top: 5px; background-color: indianred; border: solid darkred 3px;";
          document.body.appendChild(errNode);
        }
        errNode.innerHTML = info;
      });
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
