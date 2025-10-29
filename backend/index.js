import express from "express";
import cors from "cors";

import { PlayerRouter } from "./routes/playerRoutes.js";
import { AuthRouter } from "./routes/authRoutes.js";

const app = express();

// Express settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(PlayerRouter);
app.use(AuthRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Backend is running on port 3000!");
});
