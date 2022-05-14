import express from "express";
import fs from 'fs';

const app = express();

// route middleware
// console.log(fs.readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`))));
fs.readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)));


// app.use('/api', router)

app.listen(8000, () => console.log("server is running on port 8000"));