const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const bodyParser=require('body-parser');

const mongoose=require('./config/connections');

const userapis = require('./routes/user');
const userlogin = require('./routes/login');


let PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/user', userapis);
app.use('/login', userlogin);

app.get('/', (req, res)=>{
  res.send('hey');
})

app.listen(PORT, 'localhost', (req, res)=>{

  console.log(`Server starting at ${PORT}`);
})

















// 

// 
