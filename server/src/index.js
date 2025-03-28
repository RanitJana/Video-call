import "dotenv/config";
import app from "./app.js";
import { createServer } from "http";
import { _env } from "./constants.js";
import connectDB from "./db/index.js";
import realTime from "./socket.js";

const PORT = _env.PORT || 5000;

connectDB()
  .then(() => {
    const server = createServer(app);

    server.listen(PORT, () => {
      console.log(`Navigate : http://localhost:${PORT}`);
    });

    realTime(server);
  })
  .catch(() => {
    process.exit(1);
  });
