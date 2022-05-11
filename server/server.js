import cors from 'cors';
import express from "express";
import fs from 'fs';
import mongoose from 'mongoose';
require("dotenv").config();
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');






const app = express();


// Database connection
mongoose.connect(process.env.DATABASE)
.then(() => console.log("BookMyHotelDB is connected"))
.catch(err => console.log("DB connection error: ". err))


//middleware
app.use(cors(
//   {
//     "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "credentials": true
// }

));

app.options('*', cors())
app.use(morgan('dev'));
app.use(express.json())



// set header
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//     });

// route middleware
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`), createProxyMiddleware({ target: 'http://localhost:3010', changeOrigin: true })))




const port = process.env.PORT || 3010;

app.listen(port, () => console.log(`Book My Hotel server is running on port ${port} `))