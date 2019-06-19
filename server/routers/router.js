import express from "express";
import Cloths from "../controllers/controller";

const router = express.Router();

router.post('/api/v1/cloths', Cloths.CreatItem);
router.patch('/api/v1/cloths/:id', Cloths.updateItem);
router.delete('/api/v1/cloths/:clothId', Cloths.DeleteItem);
router.get('/api/v1/cloths', Cloths.GetAllItems);

export default router;