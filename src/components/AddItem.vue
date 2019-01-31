<template>
  <div class="add-item">
    <form class="add-form" @submit.prevent="addItem">
      <label class="image-input-wrapper" for="image">
        Click image to change.
        <input class="image-input" type="file" name="image" accept="image/*" @change="onImageChange">
        <img class="preview-image" :src="previewImageURL" alt="" @click="openFileInput">
      </label>
      <div class="name-amount-wrapper">
        <label class="name-label" for="name">
          Item name:<br>
          <input type="text" name="name" required pattern="[A-Za-z ]+" maxlength="50">
        </label>
        <label class="amount-label" for="amount"> 
          Amount:<br>
          <Quantity class="add-item-quantity" :amount="amount" @change="amountChanged"/>
        </label> 
      </div>
      <button class="item-submit-btn" type="submit">Add new item</button>
    </form>
  </div>
</template>

<script>
//<input type="number" name="amount" min="0" max="999">
// TODO: importing everything in just 1 api path..
import { API, EventName } from '../constants.js'
import Quantity from './Quantity.vue'


// TODO: need to import image so webpack sees this as a file dependency and not some random
// string. therefore it will apply loaders (which in this case will copy the file
// to dist/ and rename with hash)
import defaultImage from '../assets/logo.png'

export default {
  name: 'AddItem',
  data() {
    return {
      previewImageURL: defaultImage,
      amount: 0
    }
  },
  methods: {
    openFileInput(e) {
      // Get input and pass click to it.
      // this.$el.querySelector(".image-input");
      e.target.previousSibling.click()
    },
    onImageChange(e) {
      this.setImagePreview(URL.createObjectURL(e.target.files[0])) 	
      var body = document.body,
      html = document.documentElement;

      // TODO:
      // https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
      var height = Math.max( body.scrollHeight, body.offsetHeight, 
                            html.clientHeight, html.scrollHeight, html.offsetHeight );
      // TODO: this doesnt work for small -> big image as at the time of this scroll, the
      // max height is in relation to the small image...
      window.scrollTo({
        top: height,
        left: 0,
        behavior: 'smooth'
      });
    },
    setImagePreview(img) {
      this.previewImageURL = img;
    },
    amountChanged(value) {
      if (this.amount + value < 0) {
        console.log("Can't decrease item below 0");
      } else {
        this.amount += value;
      }
    },
    addItem(e) {
      console.log("Client sending POST request to add new item.");

      const elements = e.target.elements;
      const item = {
        name: elements.name.value,
        amount: this.amount,
        path: defaultImage
        };
        
      let formData = new FormData();
      if (elements.image.files.length > 0) {
        formData.append("image", elements.image.files[0]);
        // after adding the image to the form data, we can clear the previewImage and filelist
        //  of the file <input>

        // TODO: can uncomment these two lines to reset image to default after every submit.
        //elements.image.value = "";
        //this.setImagePreview(defaultImage);
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
  },
  components: {
    Quantity
  }
}
</script>

<style lang="less">
@import '../assets/css/colors.less';

.add-item {
  border-top: dashed black 2px;
  background: @color-panel;
  margin: 3em;
  padding: 1em 0;

  .add-form {
    @width-percentage: 95%;
    color: @color-add-item-text;

    width: 90%;
    margin: 0 auto;
    .image-input-wrapper {
      display:  block;
      text-align: center;
      margin: 1em 0;
      font-size: 2em;
      //min-height: 35em;
      //display: flex;
      //flex-direction: column;
      //justify-content: center;
      //align-items: center;

      .preview-image {
        display:  block;
        background-color: @color-item;
        cursor: grab;
        max-width: @width-percentage;
        margin: 2px auto 0 auto;
        box-sizing: border-box;
        border: dashed 1px black;

        &:hover {
          box-shadow: 0px 0px 10px 5px darken(@color-item, 15%);
        }
      }

      .image-input {
        display: none;
      }
    }

    .name-amount-wrapper {
      margin: 1em 0;
      font-size: 2em;
      text-align: center;
/*
      span {
        height: 1.5em;
      }

      img {
        height: 2.5em;
      }
*/
      .name-label {
        display: block;
        //background-color: red
        width: @width-percentage;;
        margin: 1em auto;

        input {
          border: solid black 1px;
          width: 100%;
          text-align: center;
          height: 3.5rem;
          font-size: 1.25em;
        }
      }

      .amount-label {
        display: block;
        //background-color: blue;
        width: @width-percentage;
        margin: 1em auto;

        .add-item-quantity {
          border: solid black 1px;
        }
      }
    }

    .item-submit-btn {
      border: solid 1px mix(@color-add-item-submit-top, @color-add-item-submit-bot, 50%);
      background: linear-gradient(@color-add-item-submit-top, @color-add-item-submit-bot);
      color: @color-add-item-submit-txt;
      width: 100%;
      height: 3em;
      //box-sizing: border-box;
      font-size: 2.5em;
      padding: 0;

      &:hover {
        @hovered-pct: 25%;

        cursor: grab;
        background: linear-gradient(
                    darken(@color-add-item-submit-top, @hovered-pct),
                    @color-add-item-submit-bot
          );
      }
    }
  }
}
</style>
