import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();
const orderController = new OrderController();

router.post("/", async (req, res, next) => {
    try {
        await orderController.create(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/", (req, res) => orderController.findAll(req, res));

router.get("/:id", async (req, res, next) => {
    try {
        await orderController.findById(req, res);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        await orderController.update(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", (req, res) => orderController.delete(req, res));

export default router;
