const express = require('express');
const reqMethod = require('./reqMethod');
const app = express();
const PORT = 3000;
const HOSTNAME = 'localhost';

// app.use(public);
app.get('/get', (req, res) => {
  reqMethod.getAll(req, res);
});
app.get('/get/:id', (req, res) => {
  reqMethod.getOne(req, res);
});
app.post('/post', (req, res) => {
  reqMethod.postData(req, res);
});
app.patch('/patch/:id', (req, res) => {
  reqMethod.update(req, res);
});

app.delete('/delete/:id', (req, res) => {
  reqMethod.deleteData(req, res);
});
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at port ${PORT}`);
});
