const { Router } = require("express");
const Doctor = require("../models").doctor;
const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (e) {
    next(e);
  }
});

module.exports = router;