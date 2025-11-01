// server.js (Node 18+ or with node-fetch / axios installed)
import express from "express";
import fetch from "node-fetch"; // or use built-in fetch in Node 18+

const app = express();
app.use(express.json());

const 7738348705:AAGGbXz5g683t-KHmrnvyCfK8ial6yFhHNU = process.env.7738348705:AAGGbXz5g683t-KHmrnvyCfK8ial6yFhHNU;   // set on your server
const CHAT_ID  = process.env.8456018521;      // admin chat id or group id

if (!7738348705:AAGGbXz5g683t-KHmrnvyCfK8ial6yFhHNU || !8456018521) {
  console.warn("7738348705:AAGGbXz5g683t-KHmrnvyCfK8ial6yFhHNU!");
}

app.post("/api/register", async (req, res) => {
  try {
    const { fullname, phone, fulladdress, barangay, product } = req.body;

    // Basic validation (do more on production)
    if (!fullname || !phone || !fulladdress) {
      return res.status(400).json({ ok:false, error: "missing fields" });
    }

    // Build a safe message (yes passwords)
    const message = [
      "🆕 New Registration",
      `Name: ${escapeHtml(fullname)}`,
      `Phone: ${escapeHtml(phone)}`,
      `Barangay: ${escapeHtml(barangay || "—")}`,
      `Address: ${escapeHtml(fulladdress)}`,
      `Product: ${escapeHtml(product || "—")}`,
    ].join("\n");

    // Send to Telegram
    const tgUrl = `https://api.telegram.org/bot${7738348705:AAGGbXz5g683t-KHmrnvyCfK8ial6yFhHNU}/sendMessage`;
    const resp = await fetch(tgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    });

    const tgResult = await resp.json();
    if (!tgResult.ok) {
      console.error("Telegram error:", tgResult);
      // continue — don't leak bot token to client
    }

    // Optionally store to DB here...

    return res.json({ ok:true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok:false });
  }
});

function escapeHtml(s=""){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("Server listening on", PORT));
