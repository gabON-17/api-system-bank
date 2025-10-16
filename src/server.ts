import express from "express";
import dotenv from "dotenv";
import { routesUsers } from "./user/routes/users.routes";
import { routesAuth } from "./auth/routes/auth.routes";
dotenv.config();
export const app = express();

app.listen(3000, () => {
  app.use(express.urlencoded({ extended: true }), express.json());
  app.use("/users", routesUsers);
  app.use("/auth", routesAuth);
  console.log("Serve ON");
});
