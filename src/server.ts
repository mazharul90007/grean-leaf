import type { Server } from "http";
import app from "./app.js";
import config from "./app/config/index.js";

const port = config.port || 3000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log("Green Leaf Server is running on port: ", port);
  });
}

main();
