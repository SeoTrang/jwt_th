const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require("cookie-parser");
let { engine } =require('express-handlebars');
var bodyParser = require('body-parser')



// set views engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// thieu cookie parser
app.use(cookieParser());

// conect to mongodb
const db = require('./config/db');
db.connect();

// static file
app.use('/',express.static(path.join(__dirname,'public')));

dotenv.config();

const PORT = process.env.PORT || 3000;
let router = require('./routes/index.route');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
router(app);


app.listen(PORT,()=>{
    console.log(`app listening at http://localhost:${PORT}`);
});