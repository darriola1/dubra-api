import { Router } from "express";
import { PedidoController } from "../controllers/order.controller";

const router = Router();
const pedidoController = new PedidoController();

router.post("/", async (req, res, next) => {
    try {
        await pedidoController.create(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/", (req, res) => pedidoController.findAll(req, res));

router.get("/:id", async (req, res, next) => {
    try {
        await pedidoController.findById(req, res);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        await pedidoController.upgrade(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", (req, res) => pedidoController.delete(req, res));

export default router;
