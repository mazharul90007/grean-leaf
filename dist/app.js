import express, {} from "express";
import cors from "cors";
import router from "./app/routes/index.js";
import status from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import { AppointmentServices } from "./app/modules/Appoinment/appoinment.service.js";
import cron from "node-cron";
const app = express();
//parser
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
AppointmentServices.cancelUnpaidAppointments();
cron.schedule("* * * * *", () => {
    try {
        AppointmentServices.cancelUnpaidAppointments();
    }
    catch (error) {
        console.error(error);
    }
});
app.get("/", (req, res) => {
    res.send("Green Leaf is running");
});
app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use((req, res, next) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND...!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found",
        },
    });
});
export default app;
//# sourceMappingURL=app.js.map