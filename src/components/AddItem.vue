<template>
  <div class="add-item">
    <h1>Add new item</h1>
    <form @submit.prevent="addItem">
      <label for="name">Item name:</label> <input type="text" name="name" required pattern="[A-Za-z ]+" maxlength="50"><br>
      <label for="amount"> Amount:</label> <input type="number" name="amount" min="0" max="999"><br>
      <label for="image"> Image:</label> <input type="file" name="image" accept="image/*" @change="onImageChange">
      <img class="preview-image" :src="previewImageURL" alt="">
      <button type="submit">Add new item</button>
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
      if (elements.image.files.length > 0) {
        // no image will result with server setting path to "default" which once it returns
        // will be set by the client to the default image file
        formData.append("image", elements.image.files[0]);
      }
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
            console.log("item.path is now: " , item.path, ". data.path was: ", data.path, " and defaultImage: ", defaultImage);
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
  font-size: 1.2em;

  .preview-image {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 30em;
    margin-top: 1em;
    border: dashed 1px black;
    //box-shadow: 1px 2px 5px lighten(black, 25%)
  }
  
  // TODO: use classes
  button {
    @color-top: #44d4f8;
    @color-bottom: #04464b;
    @color-text: rgb(255, 200, 97);

    border: solid 1px black;
    background: linear-gradient(@color-top, @color-bottom);
    color: @color-text;
    margin-top: 1em;
    width: 100%;
    height: 2em;
    box-sizing: border-box;
    font-size: 1.5em;
    padding: 0;

    &:hover {
      @hovered-lighten-pct: 15%;

      cursor: grab;
      background: linear-gradient(lighten(@color-top, @hovered-lighten-pct), @color-bottom);
    }
  }

  input[type="file"] {
    
  }
}
</style>
