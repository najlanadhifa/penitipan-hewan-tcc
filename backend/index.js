import express from "express";
import cors from "cors";
import router from "./routes/route.js";
import "./models/Index.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(port, () => {
  console.log(`SERVER JALAN DI PORT ${port}`);
});