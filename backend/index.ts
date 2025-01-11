import express from "express"
import rootRouter from "./routes/index"
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const PORT = 3000;

app.use("/api/v1",rootRouter);

app.listen(PORT,() => {console.log("Listening to 3000")});

