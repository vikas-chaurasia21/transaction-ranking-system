const API_BASE_URL = "http://localhost:5000/api";

const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

const summaryBtn = document.getElementById("summaryBtn");
const summaryResult = document.getElementById("summaryResult");

const rankingBtn = document.getElementById("rankingBtn");
const rankingResult = document.getElementById("rankingResult");

const totalUsers = document.getElementById("totalUsers");
const totalTransactions = document.getElementById("totalTransactions");
const topScore = document.getElementById("topScore");

submitBtn.addEventListener("click", async () => {
  const userId = document.getElementById("userId").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  const idempotencyKey = `${userId}-${amount}-${type}`;

  try {
    const response = await fetch(`${API_BASE_URL}/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        amount,
        type,
        idempotencyKey,
      }),
    });

    const data = await response.json();

    if (data.success) {
      message.innerHTML = `
        <div>✅ ${data.message}</div>
        <div style="margin-top:6px;">
          Reference ID: <strong>${data.data.transactionId}</strong>
        </div>
      `;
      message.style.color = "#22c55e";
      loadRanking();
    } else {
      message.innerHTML = `❌ ${data.message}`;
      message.style.color = "#ef4444";
    }
  } catch (error) {
    message.innerHTML = "❌ Backend server is not running";
    message.style.color = "#ef4444";
  }
});

summaryBtn.addEventListener("click", async () => {
  const userId = document.getElementById("summaryUserId").value.trim();

  if (!userId) {
    summaryResult.innerHTML = "Please enter a User ID";
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/summary/${userId}`);
    const data = await response.json();

    if (!data.success) {
      summaryResult.innerHTML = data.message;
      return;
    }

    const user = data.data;

    summaryResult.innerHTML = `
      <div class="summary-card">
        <p>User ID <span>${user.userId}</span></p>
        <p>Total Credits <span>${user.totalCredits}</span></p>
        <p>Total Debits <span>${user.totalDebits}</span></p>
        <p>Transactions <span>${user.transactionCount}</span></p>
        <p>Score <span>${user.score}</span></p>
      </div>
    `;
  } catch (error) {
    summaryResult.innerHTML = "Failed to fetch summary";
  }
});

rankingBtn.addEventListener("click", loadRanking);

async function loadRanking() {
  try {
    const response = await fetch(`${API_BASE_URL}/ranking`);
    const data = await response.json();

    totalUsers.innerText = data.totalUsers || 0;

    if (!data.data || data.data.length === 0) {
      totalTransactions.innerText = 0;
      topScore.innerText = 0;
      rankingResult.innerHTML = `<p class="empty-text">No ranking data found</p>`;
      return;
    }

    let txCount = 0;

    data.data.forEach((user) => {
      txCount += user.transactionCount;
    });

    totalTransactions.innerText = txCount;
    topScore.innerText = data.data[0].score;

    let html = `
      <table>
        <tr>
          <th>Rank</th>
          <th>User ID</th>
          <th>Score</th>
          <th>Credits</th>
          <th>Debits</th>
          <th>Transactions</th>
        </tr>
    `;

    data.data.forEach((user) => {
      html += `
        <tr>
          <td>${user.rank}</td>
          <td>${user.userId}</td>
          <td>${user.score}</td>
          <td>${user.totalCredits}</td>
          <td>${user.totalDebits}</td>
          <td>${user.transactionCount}</td>
        </tr>
      `;
    });

    html += `</table>`;
    rankingResult.innerHTML = html;
  } catch (error) {
    rankingResult.innerHTML = `<p class="empty-text">Failed to load ranking. Start backend server first.</p>`;
  }
}

loadRanking();