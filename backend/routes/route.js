import express from "express";
import {
  createHewan,
  getHewan,
  getHewanById,
  updateHewan,
  deleteHewan,
} from "../controller/DaftarHewanController.js";
import {
  createPemilik,
  getPemilik,
  getPemilikById,
  updatePemilik,
  deletePemilik,
} from "../controller/DaftarPemilikController.js";

const router = express.Router();

router.get("/daftarhewan", getHewan); 
router.get("/daftarhewan/:id", getHewanById); 
router.post("/daftarhewan", createHewan);
router.put("/daftarhewan/:id", updateHewan);
router.delete("/daftarhewan/:id", deleteHewan);

router.get("/daftarpemilik", getPemilik); 
router.get("/daftarpemilik/:id", getPemilikById); 
router.post("/daftarpemilik", createPemilik);
router.put("/daftarpemilik/:id", updatePemilik);
router.delete("/daftarpemilik/:id", deletePemilik);

export default router;
