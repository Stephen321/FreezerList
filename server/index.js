const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

const errLogger = err =>  { if (err) console.log(err)};
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

//TODO: use express.Router instead of repeating /api

app.use(cors())
app.use(express.static('dist'));
app.use('/api/add-item', express.json());

app.get('/api/\\d+$', (req, res) => {
  res.send(`Did a test GET for /api/${req.params.id}!`);
});

app.post('/api/add-item', (req, res, next) => {
  const sql = "INSERT INTO Items (name, amount) VALUES (?, ?);";
  const name = req.body.name;
  const amount = req.body.amount;
  console.log("Name: " + name);
  console.log("Amount: " + amount);
  if (name.length > 0) { 
    db.run(sql, [name, amount], err => { 
      if (err) {
        //TODO: is this correct for async errors?
        next(err);
      } else {
        res.end();
      }
    });
  }
  else {  
    //TODO: default error handler logs and respponds with error and stack trace
    throw new Error("Name can't be empty when adding new item.");
  }
});

app.get('/api/get-items', (req, res, next) => {
  const sql = "SELECT * FROM Items;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      //TODO: is this correct for async errors?
      next(err);
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));