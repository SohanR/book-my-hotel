import express from "express";
import { showMessage } from "../controller/auth";

const router = express.Router();


router.get("/:message", showMessage);

module.exports = router;