import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();


// middleware
import { requireSingin } from "../middlewares";

//controller
import { create, hotels, image } from "../controllers/hotel";



router.post("/create-hotel",requireSingin, formidable(),  create );

router.get("/hotels", hotels)

router.get("/hotel/image/:hotelId", image);


module.exports = router;