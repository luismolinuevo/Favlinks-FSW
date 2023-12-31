const express = require("express");
const path = require("path");
const db = require("./db");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const PORT = 3000;

const clientPath = path.resolve(__dirname, "../client/dist");
app.use(express.static(clientPath));

app.get("/", (req, res) => {
  // we'll do some stuff here
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.get('/api/links', db.getLinks);
app.post("/api/links", db.insertLink);
app.put("/api/links/:id", db.updateLink);
app.delete("/api/links/:id", db.deleteLink);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
