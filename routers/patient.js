const { Router } = require("express");
const Patient = require("../models").patient;
const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (e) {
    next(e);
  }
});

module.exports = router;