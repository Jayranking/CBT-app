require('dotenv').config();
const express = require('express');
const path = require('path');
const { dbConnection } = require('./src/config/connectDb');
const authRoute = require('./src/routes/authRoute');
const adminRoute = require('./src/routes/adminRoute');
const lecturerRoute = require('./src/routes/lecturerRoute');
const studentRoute = require('./src/routes/studentRoute');
const pageRoute = require('./src/routes/pageRoute');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');


const app = express();

const port = process.env.APP_PORT || 7000;

// point to views
app.set('view engine', 'ejs');

// point to public folder
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use(cookieParser());

// set up route
app.use('/auth', authRoute);
app.use('/admin',adminRoute);
app.use('/tutor', lecturerRoute);
app.use('/student', studentRoute);
app.use(pageRoute);

dbConnection()
.then(res => console.log('connected'))
.catch(err => console.log(err));

app.listen(port, ()=>{
    console.log('server started on port', port); 
})