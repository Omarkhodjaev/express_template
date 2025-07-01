import "reflect-metadata";
import "./config";
import { AppDataSource } from "./config/ormconfig";
import express from "express";
import userRouter from "./routes/user.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("DB connection error:", error));
