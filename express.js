const express = require('express');
const path = require('path');
const reqMethod = require('./items/reqMethod');
const createUser = require('./Users/user');
const Auth = require('./Global_middleware/middleware')

const app = express();
const PORT = 3000;
const HOSTNAME = 'localhost';

app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/get', Auth.apiKeys, reqMethod.getAll)

app.get('/get/:id', Auth.basicAuth, reqMethod.getOne)

app.post('/user', (req, res) => {
  createUser(req, res)
})
// app.use(Auth.requestBody)
app.post('/post', Auth.checkStaff, reqMethod.postData)
app.patch('/patch/:id', Auth.checkStaff,  reqMethod.update)
app.delete('/delete/:id', Auth.basicAuth, reqMethod.deleteData)

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at port ${PORT}`);
});
