const express= require('express');
const connect =require('../backend/config/db.js');
const cors =require('cors');
const dotenv= require('dotenv');
const checkToAuth = require('./middleware/checkToAuth.js');

const app=express();
require('dotenv').config();
connect();
app.use(cors());
app.use(express.json({extended:false}));

app.use('/api/auth',require('./routes/auth'));
app.use('/api/debts',checkToAuth,require('./routes/debts.js'));
app.use('/api/payments',checkToAuth,require('./routes/payments.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server baslangic portu:${PORT}`)});


