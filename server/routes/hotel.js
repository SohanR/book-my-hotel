import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();


// middleware
import { requireSingin } from "../middlewares";

//controller
import { create, hotels } from "../controllers/hotel";



router.post("/create-hotel",requireSingin, formidable(),  create );

router.get("/hotels", hotels)


module.exports = router;