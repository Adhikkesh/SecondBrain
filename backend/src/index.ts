import express from "express";
import rootRouter from "./routes/index.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log("Listening to 3000");
});
