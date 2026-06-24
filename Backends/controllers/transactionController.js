const User = require("../models/User");
const Transaction = require("../models/Transaction");
const calculateScore = require("../utils/calculateScore");

const createTransaction = async (req, res) => {
  try {
    const {userId, amount, type, idempotencyKey} = req.body;

    const transactionId = "TXN_" + Date.now() + "_" + Math.floor(Math.random() * 10000);

    if (!userId || !amount || !type || !idempotencyKey) {
      return res.status(400).json({
        success: false,
        message: "userId, amount, type and idempotencyKey are required",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    if (!["credit", "debit"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be either credit or debit",
      });
    }

    const existingTransaction = await Transaction.findOne({ idempotencyKey });

    if (existingTransaction) {
      return res.status(409).json({
        success: false,
        message:
          "Duplicate request. This transaction is already processed.",
      });
    }

    let user = await User.findOne({ userId });

    if (!user) {
      user = await User.create({ userId });
    }

    await Transaction.create({
      transactionId,
      idempotencyKey,
      userId,
      amount,
      type,
    });

    if (type === "credit") {
      user.totalCredits += amount;
    } else {
      user.totalDebits += amount;
    }

    user.transactionCount += 1;

    user.score = calculateScore(
      user.totalCredits,
      user.totalDebits,
      user.transactionCount,
    );

    await user.save();

    res.status(201).json({
      success: true,
      message: "Transaction Processed Successfully",
      data: {
        transactionId,
        userId: user.userId,
        totalCredits: user.totalCredits,
        totalDebits: user.totalDebits,
        transactionCount: user.transactionCount,
        score: user.score,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while processing transaction",
      error: error.message,
    });
  }
};


const getUserSummary = async (req, res) => {
  try {
      const { userId } = req.params;
      
      const user = await User.findOne({ userId });
      
      if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message,
    });
}
};
const getRanking = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ score: -1 })
      .select("-__v");

    const ranking = users.map((user, index) => ({
      rank: index + 1,
      userId: user.userId,
      score: user.score,
      totalCredits: user.totalCredits,
      totalDebits: user.totalDebits,
      transactionCount: user.transactionCount,
    }));

    res.status(200).json({
      success: true,
      totalUsers: ranking.length,
      data: ranking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { 
    createTransaction,
    getUserSummary,
    getRanking,
};