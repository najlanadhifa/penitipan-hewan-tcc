import express from "express";
import {
  createHewan,
  getHewan,
  getHewanById,
  updateHewan,
  deleteHewan,
} from "../controller/DaftarHewanController.js";

const router = express.Router();

router.get("/daftarhewan", getHewan); 
router.get("/daftarhewan/:id", getHewanById); 
router.post("/daftarhewan", createHewan);
router.put("/daftarhewan/:id", updateHewan);
router.delete("/daftarhewan/:id", deleteHewan);

export default router;
