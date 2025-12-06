import express from "express";
import { PaymentController } from "./payment.controller.js";
const router = express.Router();
router.post("/init-payment/:appointmentId", PaymentController.initPayment);
router.get("/ipn", PaymentController.PaymentValidation);
export const PaymentRoutes = router;
//# sourceMappingURL=payment.route.js.map