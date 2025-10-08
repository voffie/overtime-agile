import express from "express";
import cors from "cors";

import { db } from "./db/index.js";

const app = express();

try {
  const [results, fields] = await db.query("SELECT * FROM `player`");

  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Backend is running on port 3000!");
});
