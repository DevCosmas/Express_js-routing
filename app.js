const express = require('express');
const path = require('path');
const itemRouter = require('./items/items_router')
const signUpRoute = require('./Users/user_Router')

const app = express();
const PORT = 3000;
const HOSTNAME = 'localhost';

// for rendering stactic html file
app.use('/static', express.static(path.join(__dirname, 'public')));

// all items endpoint
app.use('/api', itemRouter)

// for signing up users
app.use(express.json())
app.use('/', signUpRoute)


app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at port:${PORT}`);
});
