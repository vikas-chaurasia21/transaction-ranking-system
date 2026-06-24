const express = require("express");
const { createTransaction, getUserSummary, getRanking,} = require("../controllers/transactionController");

const router = express.Router();

router.post("/transaction", createTransaction);
router.get("/summary/:userId",  getUserSummary);
router.get("/ranking", getRanking);

module.exports = router;