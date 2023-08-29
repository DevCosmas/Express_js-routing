const express = require('express');
const path = require('path'); 
const itemRouter=require('./items/items_router')
const userRouter=require('./Users/user_Router')

const app = express();
const PORT = 3000;
const HOSTNAME = 'localhost';

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/items',itemRouter)
app.use('/User',userRouter)


app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at port:${PORT}`);
});
