import express from "express";



const router = express.Router();


// middleware
import { requireSingin } from "../middlewares";
// controller
import { createConnectAccount, getAccountBalance, getAccountStatus, payoutSetting, stripSessionId } from "../controllers/stripe";




router.post("/create-connect-account", requireSingin, createConnectAccount);

router.post("/get-account-status", requireSingin, getAccountStatus)

router.post("/get-account-balance", requireSingin, getAccountBalance )

router.post("/payout-setting", requireSingin, payoutSetting)

router.post("/stripe-session-id", requireSingin, stripSessionId)

module.exports = router;