<template>
  <div class="add-item">
    <h1>Add new item</h1>
    <form @submit.prevent="addItem">
      <label>Item name:</label> <input type="text" name="name" required pattern="[A-Za-z]+" maxlength="50"><br>
      <label>Amount:</label> <input type="number" name="amount" required min="1" max="999"><br>
      <input type="file" id="take-picture" accept="image/*" value="">
      <button type="submit">Add new item</button>
      <img :src="previewImage" alt="">
    </form>
  </div>
</template>

<script>
import { AddItemUrl } from '../constants.js'

export default {
  name: 'AddItem',
  data() {
    return {
      previewImage: ""
    }
  },
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
        
      let fileInput = this.$el.querySelector("input[type='file'");
      const image = fileInput.files[0];
      let formData = new FormData();
      formData.append("image", image);

      console.log("image: ", image);
      // TODO.wip: preview image, need to do this onchange of input not here and also
      // style correctly
      this.previewImage = URL.createObjectURL(image); 

      // TODO: following doesn't work so straightforward as the separate "part" in the 
      // request body doesn't getthe content-type json and "multer" on the server probably
      // doesnt know how to parse json and would take the entire string as just a single
      // value (use json.parse on server). multer probably wouldnt use express.json() to
      // parse it anyway? (it would still have other parts to do after) 
      formData.append("info", JSON.stringify(item));
      
      fetch(AddItemUrl, {
        method: 'POST',
        //headers: { // TODO: switching to use multipart/form-data so can upload image +
                     // other data in one request
        //  'Content-Type': 'application/json'
        //},
        //body: fileInput.files[0] // TODO: this was no longer working?
        body: formData
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
  
}
</style>
