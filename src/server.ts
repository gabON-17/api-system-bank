import express from "express";
import dotenv from "dotenv";
import { routesUsers } from "./routes/users.routes";
import { routesAuth } from "./routes/auth.routes";
import { routesBank } from "./routes/bank.routes";
dotenv.config();
export const app = express();

app.listen(3000, () => {
  app.use(express.urlencoded({ extended: true }), express.json());

  app.use("/users", routesUsers);
  app.use("/auth", routesAuth);
  app.use("/bank", routesBank);

  console.log("Serve ON");
});
