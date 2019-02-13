#!/usr/bin/env node
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express();
const Port = 3000;
const sqlite3 = require('sqlite3').verbose()
const multer = require('multer')


//-------------------------------------
// sqlite3 config
//-------------------------------------
let db = new sqlite3.Database('database/item_lister.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


//-------------------------------------
// multer config
//-------------------------------------
const ImageBasePath = "uploads/"
const storage = multer.diskStorage({
  destination: ImageBasePath,
  filename: function (req, file, cb) {
    // TODO: https://github.com/expressjs/multer#diskstorage
    // "Note that req.body might not have been fully populated yet. 
    // It depends on the order that the client transmits fields and
    // files to the server."
    var fileObj = {
      "image/png": ".png",
      "image/jpeg": ".jpeg",
      "image/jpg": ".jpg"
    };
    if (fileObj[file.mimetype] === undefined) {
      cb(new Error("file format not valid"));
    } else {
      cb(null, file.fieldname + '-' + Date.now() + fileObj[file.mimetype])
    }
  }
})
const upload = multer({ storage }).single("image")

// TODO: use express.Router instead of repeating /api


//-------------------------------------
//express middleware config
//-------------------------------------
app.use(cors());
app.use(express.static('static'));

// TODO: dist is where webpack/vue-cli outputs files (including static images)
// and uploads is where multer is configured to output its files (which will be images)
// Add another middleware that will check for them here. Later, all files should be in one
// place and this won't be necessary.

// TODO+: Why does a request for /uploads/helloworld.txt not work? It has to 
// be /helloworld.txt only? or add '/uploads' as first arguement to app.use
app.use(express.static('uploads'));

app.use('/api/add', express.json());
app.use('/api/remove', express.json());
app.use('/api/increase', express.json());
app.use('/api/decrease', express.json());

//-------------------------------------
// express routes
//-------------------------------------

// POST
// TODO: middleware in these functions instead of app.use for all routes?
// TODO: .single(<NAME>). <NAME> has to be the same as the "name" in formdata from browser
app.post('/api/add', upload, (req, res) => {
  const sql = "INSERT INTO Items (name, amount, path) VALUES (?, ?, ?);";
  const info = JSON.parse(req.body.info);
  const name = info.name;
  const amount = (info.amount === null) ? 0 : info.amount;
  // req.headers.host possibly insecure, use some other method from nodejs to ip and
  // already have Port. (create another httpServer that doesnn't listen)
  // (https://www.skeletonscribe.net/2013/05/practical-http-host-header-attacks.html) 
  // https://stackoverflow.com/a/17697134
  // https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
  const path = (req.file === undefined) 
    ? info.path // TODO: this doesn't have ip/port so its the webpack dev server and not nodejs 
    : req.protocol + '://' + req.headers.host + '/' + req.file.filename; //req.file.path;

  console.log("Name: " + name);
  console.log("Amount: " + amount);
  console.log("Path: " + path);
  if (name.length > 0) { 
    db.run(sql, [name, amount, path], function (err) { 
      if (err) {
        res.json({error: true, info: err});
      } else {
        // this callback cant be arrow function as "this" would then be bound to the current 
        // lexical scope rather than being reassignned to the sqlite3 Statement the callback
        // is called in (which has lastID set)
         console.log("Added item with id: " + this.lastID)
        res.json({error: false, id: this.lastID, path: path});
      }
    });
  }
  else {  
    res.json({error: true, info: new Error("Name can't be empty when adding new item.").stack});
  }
});

app.post('/api/remove', (req, res) => {
  const id = req.body.id;  
  
  //1. First get the "path" of the image associated with the item we are removing so we can remove it later
  const getSql = "SELECT path FROM Items WHERE id = ?;";
  db.get(getSql, [id], function (err, row) { 
    if (err) {
      res.json({error: true, info: err});
    } else {
      console.log("Found item with row: ", row);
      let imagePath = row.path;

      if (imagePath === undefined) {
        // client can send delete after item already removed on server by another client
        // TODO: change json response as an error will prevent client from removing item locally
        res.json({error: true, info: new Error("imagePath is undefined.")});
        return;
      }


      //2. Now attempt to remove the item from the database
      const removeSql = "DELETE FROM Items WHERE id = ?;";
      db.run(removeSql, [id], function (err) { 
        if (err) {
          res.json({error: true, info: err});
        } else {
          console.log("Removed item with id: " + this.lastID)

          //3. Successfully remove item from database so time to remove the image file
          if (req.body.defaultImage === false) {
            imagePath = ImageBasePath + imagePath.substr(imagePath.lastIndexOf('/'));
            try {
              fs.unlinkSync(imagePath);
            } catch (e) {
              console.log("Deleting image file resulted in err: ", e);
              // TODO: no need to let client know?
            }
          }
          res.json({error: false});
        }
      });
    }
  });
});

// TODO: could DRY these increase/decrease
app.post('/api/increase', (req, res, next) => {
  const sql = "UPDATE Items SET amount = amount + 1 WHERE id = ?";
  const id = req.body.id;
  console.log("id: " + id);
  console.log("Increase");
  if (id === undefined) {
    throw new Error("Id is undefined, cant change quantity.");
  }
  db.run(sql, [id], err => { 
    if (err) {
      // pass error to default error handler:
      // https://expressjs.com/en/guide/error-handling.html
      // (console logged and html is sent in response)
      next(err);
    } else {
      res.end();
    }
  });
});

app.post('/api/decrease', (req, res, next) => {
  const sql = "UPDATE Items SET amount = amount - 1 WHERE id = ? AND amount > 0";
  const id = req.body.id;
  console.log("id: " + id);
  console.log("Decrease");
  if (id === undefined) {
    throw new Error("Id is undefined, cant change quantity.");
  }
  db.run(sql, [id], err => { 
    if (err) {
      next(err);
    } else {
      res.end();
    }
  });
});

// GET
app.get('/api/get-items', (req, res, next) => {
  const sql = "SELECT * FROM Items;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/\\d+$', (req, res) => {
  res.send(`Did a test GET for /api/${req.params.id}!`);
});


//-------------------------------------
// listen
//-------------------------------------
app.listen(Port, () => console.log(`Item lister api server listening on port ${Port}!`));