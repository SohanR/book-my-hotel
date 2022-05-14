import cors from 'cors';
import express from "express";
import fs from 'fs';
import mongoose from 'mongoose';
const morgan = require('morgan')
require("dotenv").config();

const app = express();

// database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
})
.then(() => console.log("BookMyHotel's DataBase is Connected"))
.catch(err => console.log("DataBase connection error: ",err))

//middleware
app.use(cors());
app.use(morgan("dev"));

// route middleware

fs.readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)));


const port = process.env.PORT || 8000;
app.listen(8000, () => console.log(`BookMyHotel's server is running on port ${port}`));