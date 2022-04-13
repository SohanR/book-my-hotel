import cors from 'cors';
import express from "express";
import fs from 'fs';
require("dotenv").config();
const morgan = require("morgan");





const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));

// route middleware
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))




const port = process.env.PORT || 3010;

app.listen(port, () => console.log(`book my show server is running on port ${port} `))