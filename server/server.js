import cors from 'cors';
import express from "express";
import fs from 'fs';
import mongoose from 'mongoose';
require("dotenv").config();
const morgan = require("morgan");






const app = express();


// Database connection
mongoose.connect(process.env.DATABASE)
.then(() => console.log("BookMyHotelDB is connected"))
.catch(err => console.log("DB connection error: ". err))


//middleware
app.use(cors());
app.use(morgan('dev'));

// route middleware
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))




const port = process.env.PORT || 3010;

app.listen(port, () => console.log(`Book My Hotel server is running on port ${port} `))