import express from "express";
import fs from 'fs';


const app = express();

// route middleware
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))




app.listen(3010, () => console.log("book my show server is running"))