import express from "express";
import fetch from "node-fetch";
import https from "https";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());

// Disable SSL verification in development mode
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // WARNING: This disables certificate verification.
});

const apiKey = "9f9959c1b6418da499d23550af5096e5";

app.get("/popular-movies", async (req, res) => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  try {
    const response = await fetch(url, { agent: httpsAgent }); // Use custom agent for fetch
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/movie-details/:id", async (req, res) => {
  const movieId = req.params.id;

  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url, { agent: httpsAgent });
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details for ID: ${movieId}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/search-movies", async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url, { agent: httpsAgent });
    if (!response.ok) {
      throw new Error("Failed to search movies");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on http:", PORT);
});
