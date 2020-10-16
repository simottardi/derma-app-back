const { Router } = require("express");
const Patient = require("../models").patient;
const Doctor = require("../models").doctor;
const Prescription = require("../models").prescription;
const Patientday = require("../models").patientDay;
const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (e) {
    next(e);
  }
});

// ROUTES TO IMPLEMENT
/*
fetch patient's details
fetch patient's doctor 
fetch patient's prescription
fetch patient's history [array of days] // add pagination later
fetch patient's day by date

set patients's itch score for the day
set patient's picture for the day --> to be done with cloudify
set patient's dayly medication as true or false
[] adding auth
*/


// fetch patient details
router.get("/:id", async (req, res, next) => {
    try {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Patient id is not a number" });
  }

  const homepage = await Patient.findByPk(id, {
    // include: [Story],
    // order: [[Story, "createdAt", "DESC"]]
  });

  if (homepage === null) {
    return res.status(404).send({ message: "Patient not found" });
  }

  res.status(200).send({ message: "ok", homepage });
  } catch (e) {
    next(e);
  }
});



//fetch patient's doctor 
router.get("/:id/doctor", async (req, res,next) => {
  try{
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Patient id is not a number" });
  }

  const homepage = await Patient.findByPk(id, {
     include: [Doctor],
    //  order: [[Story, "createdAt", "DESC"]]
  });

  if (homepage === null) {
    return res.status(404).send({ message: "Patient not found" });
  }

  res.status(200).send({ message: "ok", homepage });
  } catch (e) {
    next(e);
  }
});



//fetch patient's prescription
router.get("/:id/prescription", async (req, res, next) => {
      try {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Patient id is not a number" });
  }

  const homepage = await Patient.findByPk(id, {
     include: [Prescription],
     order: [[Prescription, "createdAt", "DESC"]]
  });

  if (homepage === null) {
    return res.status(404).send({ message: "Patient not found" });
  }

  res.status(200).send({ message: "ok", homepage });
 } catch (e) {
    next(e);
  }
});



//fetch patient's history [array of days] // add pagination later
router.get("/:id/history", async (req, res, next) => {
    try {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Patient id is not a number" });
  }

  const homepage = await Patient.findByPk(id, {
     include: [Patientday],
    //  order: [[Patientday, "createdAt", "DESC"]]
  });

  if (homepage === null) {
    return res.status(404).send({ message: "Patient not found" });
  }

  res.status(200).send({ message: "ok", homepage });
  } catch (e) {
    next(e);
  }
});



// fetch patient's day by date


module.exports = router;