import express from "express";



const router = express.Router();


// middleware
import { requireSingin } from "../middlewares";
// controller
import { createConnectAccount } from "../controllers/stripe";




router.post("/create-connect-account", requireSingin, createConnectAccount);

module.exports = router;