<template>
  <div class="add-item">
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
      // TODO:  e.target.elements... or v-model, which is better? v-model updates data 
      // on every input event, also need to store in data object even 
      // tho this component doesnt care about it after it was submitted
      const elements = e.target.elements;
      const item = {
        name: elements.name.value,
        amount: (elements.amount.value.length) ? parseInt(elements.amount.value) : 0
        };
        console.log(item);
      fetch(AddItemUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      }).then(res => res.json())
        .then(data => {
          let infoMessage;
          if (data.error) {
            infoMessage = data.info;
          }
          else {
            item.id = data.id;
            // TODO: similar to using eventbus, this emits event on root instance
            // which is listened to by List.vue. Better way of sharing state
            // could be with props + events depending on the use case. Vuex could
            // also be used.  
            this.$root.$emit("added-item", item);
            infoMessage = "Server successfully added item. Emit added-item event. temp.";
          }
          console.log(data);
          // TODO: remove this temporary html element output
          const ID = "temp-err-div";
          let errNode = document.createElement("div");
          errNode.id = ID;
          errNode.innerHTML = infoMessage;
          errNode.style = "margin-top: 5px; background-color: indianred; border: solid darkred 3px;";
          document.body.appendChild(errNode);
          setTimeout(() => {
            document.body.removeChild(errNode);
          }, 5000);
      });
    }
  }
}
</script>

<style lang="less">
.add-item {
  h1 {
    text-align: center;
  }
}
</style>
