import express from "express";
import { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authUserRouter from "./routes/auth.js";
import "./models/associations";
import inventoryRoutes from "./routes/inventory.js";
import studentRouter from "./routes/student";
import studentLeaveRouter from "./routes/studentLeave";
import facultyResearchRouter from "./routes/facultyResearch";
import facultyRouter from "./routes/faculty";
import cdbRouter from "./routes/cdb.js";
import hostelcomplaintRouter from "./routes/hostelammeneties.js";
import facultyLeaveRouter from "./routes/facultyLeave";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/user", authUserRouter);
app.use("/inventory", inventoryRoutes);
app.use("/student", studentRouter);
app.use("/studentLeave", studentLeaveRouter);
app.use("/facultyResearch", facultyResearchRouter);
app.use("/faculty", facultyRouter);
app.use("/complaint", cdbRouter);
app.use("/facultyLeave", facultyLeaveRouter);
app.use("/hostelcomplaint",hostelcomplaintRouter);

app.listen(PORT, () => {
  console.log(`server is listening  on ${PORT}`);
});
