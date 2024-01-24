const express = require("express");
const app = express();
const dbConnect = require("./Connection/databaseConnect");
const dotenv = require("dotenv");
const registerRouter = require("./Routes/registerRoute");
const postRoutes = require("./Routes/post-routes");
const cors = require("cors");
dotenv.config();

const PORT = process.env.PORT;

dbConnect();
app.use(cors());
app.use(express.json());
app.use(registerRouter);
app.use("/post",postRoutes);
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
