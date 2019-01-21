<template>
  <div class="add-item">
    <h1>Add new item</h1>
    <form @submit.prevent="addItem">
      <label>Item name:</label> <input type="text" name="name" required pattern="[A-Za-z]+" maxlength="50"><br>
      <label>Amount:</label> <input type="number" name="amount" min="0" max="999"><br>
      <input type="file" name="image" accept="image/*" @change="onImageChange">
      <button type="submit">Add new item</button>
      <img :src="previewImageURL" alt="">
    </form>
  </div>
</template>

<script>
import { AddItemUrl } from '../constants.js'
import defaultImage from '../assets/logo.png'

export default {
  name: 'AddItem',
  data() {
    return {
      // TODO: need require so webpack sees this as a file dependency and not some random
      // string. therefore it will apply loaders (which in this case will copy the file
      // to dist/ and rename with hash)
      previewImageURL: defaultImage,
    }
  },
  methods: {
    onImageChange(e) {
      this.previewImageURL = URL.createObjectURL(e.target.files[0]);
    },
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
        
      let formData = new FormData();
      formData.append("image", elements.image.files[0]);

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
            console.error(data.info);
          }
          else {
            item.id = data.id; // get id that was added by the server

            // TODO: could store URL or File/Blob here instead for server to send
            // to prevent another request and waiting for data to come back. However,
            // file paths are easier and file system is there for that. (and less memory)
            item.path = (data.path === "default") ? defaultImage : data.path; //get the image path on the server

            console.log("Server has added item: ", item);

            // TODO: similar to using eventbus, this emits event on root instance
            // which is listened to by List.vue. Better way of sharing state
            // could be with props + events depending on the use case. Vuex could
            // also be used.  
            this.$root.$emit("added-item", item);
          }
      });
    }
  }
}
</script>

<style lang="less">
.add-item {
  
}
</style>
