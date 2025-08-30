const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Serve pages
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.get("/admin", (req, res) => res.sendFile(__dirname + "/views/admin.html"));

// Get points
app.get("/api/points", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json"));
  res.json(data);
});

// Update points
app.post("/api/points", (req, res) => {
  const newData = req.body;
  fs.writeFileSync("db.json", JSON.stringify(newData, null, 2));
  res.json({ status: "success" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));