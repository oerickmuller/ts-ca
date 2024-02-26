import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { approuter } from "./approuter.js";

dotenv.config();

if (!process.env.PORT) {
  console.log(`no port value specified...`);
  process.exit(1);
}

const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use("/", approuter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
