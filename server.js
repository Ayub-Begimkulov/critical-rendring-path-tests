import express from "express";
import path from "path";

const app = express();

const relativePath = (pathString) => path.resolve(path.dirname(""), pathString);
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const parseTimeout = (timeout) => {
  if (!timeout) {
    return 0;
  }

  const parsed = parseInt(timeout, 10);

  if (Number.isNaN(parsed)) {
    return 0;
  }

  return parsed;
};

app.get("/", (_req, res) => {
  res.sendFile(relativePath("./index.html"));
});

app.get("/css/:name", async (req, res) => {
  const timeout = parseTimeout(req.query.timeout);

  await sleep(timeout);

  res.sendFile(relativePath("./style.css"));
});

app.get("/js/:name", async (req, res) => {
  const timeout = parseTimeout(req.query.timeout);

  await sleep(timeout);

  res.sendFile(relativePath("./script.js"));
});

app.listen(3000, () => {
  console.log("===================");
  console.log("app started");
  console.log("===================");
});
