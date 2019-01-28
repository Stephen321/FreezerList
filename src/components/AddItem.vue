<template>
  <div class="add-item">
    <h1>Add new item</h1>
    <form @submit.prevent="addItem">
      <label for="name">Item name:</label> <input type="text" name="name" required pattern="[A-Za-z ]+" maxlength="50"><br>
      <label for="amount"> Amount:</label> <input type="number" name="amount" min="0" max="999"><br>
      <label class="image-input-wrapper" for="image">
        Click image to change.
        <input class="image-input" type="file" name="image" accept="image/*" @change="onImageChange">
        <img class="preview-image" :src="previewImageURL" alt="" @click="openFileInput">
      </label>
      <button class="item-submit-btn" type="submit">Add new item</button>
    </form>
  </div>
</template>

<script>
// TODO: importing everything in just 1 api path..
import { API, EventName } from '../constants.js'


// TODO: need to import image so webpack sees this as a file dependency and not some random
// string. therefore it will apply loaders (which in this case will copy the file
// to dist/ and rename with hash)
import defaultImage from '../assets/logo.png'

export default {
  name: 'AddItem',
  data() {
    return {
      previewImageURL: defaultImage,
    }
  },
  methods: {
    openFileInput(e) {
      console.log(e);
      // Get input and pass click to it.
      // this.$el.querySelector(".image-input");
      e.target.previousSibling.click()
    },
    onImageChange(e) {
      this.setImagePreview(URL.createObjectURL(e.target.files[0])) 	
      var body = document.body,
      html = document.documentElement;

      // https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
      var height = Math.max( body.scrollHeight, body.offsetHeight, 
                            html.clientHeight, html.scrollHeight, html.offsetHeight );
                            console.log(height);
      window.scrollTo({
        top: height,
        left: 0,
        behavior: 'smooth'
      });
    },
    setImagePreview(img) {
      this.previewImageURL = img;
    },
    addItem(e) {
      console.log("Client sending POST request to add new item.");

      const elements = e.target.elements;
      const item = {
        name: elements.name.value,
        amount: (elements.amount.value.length) ? parseInt(elements.amount.value) : 0,
        path: defaultImage
        };
        
      let formData = new FormData();
      if (elements.image.files.length > 0) {
        formData.append("image", elements.image.files[0]);
        // after adding the image to the form data, we can clear the previewImage and filelist
        //  of the file <input>
        elements.image.value = "";
        this.setImagePreview(defaultImage);
      }
      // TODO: following doesn't work so straightforward as the separate "part" in the 
      // request body doesn't getthe content-type json and "multer" on the server probably
      // doesnt know how to parse json and would take the entire string as just a single
      // value (use json.parse on server). multer probably wouldnt use express.json() to
      // parse it anyway? (it would still have other parts to do after) 
      formData.append("info", JSON.stringify(item));
      
      fetch(API.Item.Add, {
        method: 'POST',
        body: formData
      }).then(res => res.json())
        .then(data => {
          let infoMessage;
          if (data.error) {
            console.error(data.info);
          }
          else {
            item.id = data.id; // get id that was added by the server
            item.path = data.path; //get the image path set on the server
            console.log("Server has added item: ", item);

            // TODO: similar to using eventbus, this emits event on root instance
            // which is listened to by List.vue. Better way of sharing state
            // could be with props + events depending on the use case. Vuex could
            // also be used.  
            this.$root.$emit(EventName.Item.Add, item);
          }
      });
    }
  }
}
</script>

<style lang="less">
.add-item {
  font-size: 1.2em;

  .item-submit-btn {
    @color-top: #44d4f8;
    @color-bottom: #04464b;
    @color-text: rgb(255, 200, 97);

    border: solid 1px black;
    background: linear-gradient(@color-top, @color-bottom);
    color: @color-text;
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

  .image-input-wrapper {
    display:  block;
    text-align: center;
    margin-top: 1em;
    margin-bottom: 1em;
    color: white;
    //min-height: 35em;
    //display: flex;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;

    .preview-image {
      background-color: white;
      cursor: grab;
      display: block;
      margin: 0 auto;
      margin-top: 2px;
      max-width: 100%;
      box-sizing: border-box;
      border: dashed 1px black;

      &:hover {
        box-shadow: 0px 0px 10px 5px darken(white, 15%);
      }
    }

    .image-input {
      display: none;
    }
  }
}
</style>
