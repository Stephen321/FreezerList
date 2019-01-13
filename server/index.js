const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.static('dist'));

app.get('/api/:id', function (req, res) {
  res.send(`Did do a GET for /api/${req.params.id}!`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));