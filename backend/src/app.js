import express from "express";

const app = express();

app.use(express.json());

// router imports
import userRouter from "./routes/user.route.js";

// route declaration
app.use("/api/v1/users", userRouter);

export default app;
