import express from "express";
import { register, showMessage } from "../controller/auth";

const router = express.Router();


router.get("/:message", showMessage);
router.post("/register", register)

module.exports = router;