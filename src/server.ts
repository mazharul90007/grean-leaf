import type { Server } from "http";
import app from "./app.js";
import config from "./app/config/index.js";

const port = config.port || 3000;
let server: Server;

async function startServer() {
  try {
    server = app.listen(port, () => {
      console.log("Green Leaf Server is running on port: ", port);
    });

    //Handle process events
    processEventsHandler();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

const processEventsHandler = () => {
  //Uncaught Exceptions
  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    gracefulShutdown();
  });

  //Unhandled Rejection
  process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error);
    gracefulShutdown();
  });

  //SIGTERM (Docker container stop)
  process.on("SIGTERM", (error) => {
    console.log("SIGTERM received. Shutting Down...");
    gracefulShutdown();
  });

  //SIGINT (CTRL + C)
  process.on("SIGINT", () => {
    console.log("SIGINT received. Shutting Down...");
    gracefulShutdown();
  });
};

const gracefulShutdown = () => {
  console.log("Graceful shutdown initiated...");
  if (server) {
    server.close(() => {
      console.log("Server closed successfully!");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

startServer();
