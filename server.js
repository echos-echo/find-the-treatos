const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = path.join(__dirname, '/');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));
app.use('/test', (req, res) => {
  res.send('hello world, testing');
})
app.use('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.use(function (err, req, res, next) {

  // render the error page
  res.status(err.status || 500);
  res.send("error: " + err.message);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('listening!');
});