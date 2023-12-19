const express = require("express");
const cors = require("cors");
// const fetch = require("node-fetch");
// const { config } = require("dotenv");
// config();

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: true,
  })
);

app.get("/", async (req, res) => {
  try {
    const { q = "" } = req.query;
    const encodedQuery = encodeURIComponent(q);

    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodedQuery}`
    );

    const result = await response.json();
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
