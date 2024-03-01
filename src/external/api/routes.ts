import express from 'express';

const routing = express.Router();

routing.get("/health", (req, res) => {
  res.send("OK");
});

export { routing };
