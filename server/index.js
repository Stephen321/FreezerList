const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');

let db = new sqlite3.Database(':memory:', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
  ///*
  db.run(`CREATE TABLE Items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT    NOT NULL,
    amount         INT     NOT NULL
 );`, (err) => { if (err) console.log(err)});
 //*/
});

// TODO: use express.Router instead of repeating /api

app.use(cors());
app.use(express.static('dist'));
app.use('/api/add', express.json());
app.use('/api/increase', express.json());
app.use('/api/decrease', express.json());

app.get('/api/\\d+$', (req, res) => {
  res.send(`Did a test GET for /api/${req.params.id}!`);
});

// POST
// TODO: middleware in these functions instead of app.use?
// TODO: .single(<NAME>). <NAME> has to be the same as the "name" in formdata from browser
app.post('/api/add', multer({ dest: 'uploads/' }).single("image"), (req, res, next) => {
  const sql = "INSERT INTO Items (name, amount) VALUES (?, ?);";
  const info = JSON.parse(req.body.info);
  const name = info.name;
  const amount = (info.amount === null) ? 0 : info.amount;
  
  // TODO: got the file parsed by multer, 
  console.log(req.file);

  console.log("Name: " + name);
  console.log("Amount: " + amount);
  if (name.length > 0) { 
    db.run(sql, [name, amount], function (err) { 
      if (err) {
        res.json({error: true, info: err});
      } else {
        // this callback cant be arrow function as "this" would then be bound to the current 
        // lexical scope rather than being reassignned to the sqlite3 Statement the callback
        // is called in (which has lastID set)
         console.log("Added item with id: " + this.lastID)
        res.json({error: false, id: this.lastID});
      }
    });
  }
  else {  
    res.json({error: true, info: new Error("Name can't be empty when adding new item.").stack});
  }
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
  const sql = "UPDATE Items SET amount = amount - 1 WHERE id = ?";
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));