import express from "express";
import {
  createShipping,
  deleteShipping,
  getAllShipping,
  getShipping,
  updateShipping,
} from "../controllers/shipping.js";
const router = express.Router();

//CREATE
router.post("/", createShipping);

//UPDATE
router.put("/:id", updateShipping);
//DELETE
router.delete("/:id", deleteShipping);
//GET

router.get("/find/:id", getShipping);
//GET ALL

router.get("/", getAllShipping);

// router.get("/all", getAllRequestbyDate);

export default router;
