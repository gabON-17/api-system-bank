import "reflect-metadata";
import express from "express";
import { routes } from "./user/routes/users.routes";

export const app = express();

app.listen(3000, () => {
  app.use(express.urlencoded({ extended: true }), express.json());
  app.use("/users", routes);
  console.log("Serve ON");
});
