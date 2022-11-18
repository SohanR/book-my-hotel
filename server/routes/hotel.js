import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();


// middleware
import { hotelOwner, requireSingin } from "../middlewares";

//controller
import { create, hotels, image, remove, sellerHotels } from "../controllers/hotel";



router.post("/create-hotel",requireSingin, formidable(),  create );

router.get("/hotels", hotels)

router.get("/hotel/image/:hotelId", image);

router.get("/seller-hotels", requireSingin, sellerHotels);

router.delete('/delete-hotel/:hotelId', requireSingin, hotelOwner, remove);


module.exports = router;