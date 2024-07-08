import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoConnect from "../../infrastructure/database/mongo";
import morgan from "morgan";
import {userRoutes} from "../routes/UserRoutes";
import {licenseRoutes} from "../routes/LicenseRoutes";
const { altPort } = require("alternateports");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/v1/users",userRoutes);
app.use("/v1/license",licenseRoutes);


const createServer = async () => {
  const port = await altPort(process.env.PORT || 3000);
  const db = await mongoConnect();
  app.listen(port, () => {
    db?.connection?.readyState === 1
      ? console.log(`Mongo database name: ${db?.connection?.name}`)
      : console.log("Error connecting to MongoDB");
    console.log(`Server is running on: http://localhost:${port}`);
  });
};

export default createServer;
