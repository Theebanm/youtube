import express from "express";

const router = express.Router();
import { Phone } from "../models/phone";

router.post("/add", async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const newPhone = new Phone({ phoneNumber });
    await newPhone.save();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
