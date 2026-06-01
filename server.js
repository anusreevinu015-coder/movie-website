const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

const moviesPath = path.join(__dirname, "movies_metadata.json");

const getMovies = () => {
  const data = fs.readFileSync(moviesPath, "utf-8");
  return JSON.parse(data);
};

app.get("/api/movies", (req, res) => {
  res.json(getMovies());
});

app.get("/api/movies/:id", (req, res) => {
  const movie = getMovies().find(m => m.id == req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});