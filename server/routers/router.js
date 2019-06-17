import express from "express";
import Cloths from "../controllers/controller";

const router = express.Router();

router.post('/api/v1/cloths', Cloths.CreatItem);

export default router;