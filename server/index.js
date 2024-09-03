const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./dbConfig");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');
dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api", blogRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
