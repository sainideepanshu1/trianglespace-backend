const express = require("express");
const app = express();
const dbConnect = require("./Connection/databaseConnect");
const dotenv = require("dotenv");
const registerRouter = require("./Routes/registerRoute");
const blogRoutes = require("./Routes/blog-routes");
const authRoutes = require("./Routes/auth-routes");
const cors = require("cors");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT;

dbConnect();
app.use(cors());
app.use(express.json());
app.use(registerRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/blog", blogRoutes);
app.use("/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
