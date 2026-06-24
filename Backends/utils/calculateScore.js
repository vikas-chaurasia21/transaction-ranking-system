const calculateScore = (totalCredits, totalDebits, transactionCount) => {
  const netBalance = totalCredits - totalDebits;

  const activityScore = transactionCount * 10;

  const creditRatio =
    totalCredits + totalDebits === 0
      ? 0
      : totalCredits / (totalCredits + totalDebits);

  const fairnessBonus = creditRatio * 20;

  const score = netBalance * 0.6 + activityScore + fairnessBonus;

  return Number(score.toFixed(2));
};

module.exports = calculateScore;