const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./dbConfig");
const blogRoutes = require("./routes/blogRoutes");
dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
