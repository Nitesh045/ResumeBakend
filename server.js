const express =require("express");
const cors= require('cors')
const dotenv = require('dotenv')
const analyzeRoutes =require("./routes/analyzeRoutes.js");

dotenv.config();

const app = express();

app.use(cors({
  origin: "*", // allow all for now
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json({ limit: "5mb" }));

app.use("/api", analyzeRoutes);

app.get("/", (req, res) => {
  res.send("ATS Analyzer API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});