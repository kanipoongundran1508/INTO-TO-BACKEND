import express from "express";

const app = express();

app.use(express.json());

// router imports
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
// route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;
