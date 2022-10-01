import express from 'express';

const router = express.Router();


//controller

import { create } from "../controllers/hotel";


router.post("/create-hotel",create );


module.exports = router;