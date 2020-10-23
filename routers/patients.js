const { Router } = require("express");
const Patient = require("../models").patient;
const Doctor = require("../models").doctor;
const Prescription = require("../models").prescription;
const Patientday = require("../models").patientDay;
const router = new Router();
const { authPatient, authDoctor } = require("../auth/middleware");

// ROUTE FOR DOCTORS
router.get("/", authDoctor, async (req, res, next) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (e) {
    next(e);
  }
});

// ROUTES TO IMPLEMENT
/*
[x] fetch patient's details
[x]fetch patient's doctor 
[x]fetch patient's prescription
[x]fetch patient's history [array of days] // add pagination later
[x]fetch patient's day by date

[x]create a patient's day
[x]set patients's itch score for the day
[X]set patient's picture for the day --> to be done with cloudify
[x]set patient's dayly medication as true or false

[ ] adding auth to the routes that need it 
*/

// fetch patient details
router.get("/:id", authPatient, async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(id);
    if (isNaN(parseInt(id))) {
      return res.status(400).send({ message: "Patient id is not a number" });
    }

    const patient = await Patient.findByPk(id, {});

    if (patient === null) {
      return res.status(404).send({ message: "Patient not found" });
    }

    res.status(200).send({ message: "ok", patient });
  } catch (e) {
    next(e);
  }
});

//fetch patient's doctor
router.get("/:id/doctor", authPatient, async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(id);
    if (isNaN(parseInt(id))) {
      return res.status(400).send({ message: "Patient id is not a number" });
    }

    const patient = await Patient.findByPk(id, {
      include: [Doctor],
    });

    if (patient === null) {
      return res.status(404).send({ message: "Patient not found" });
    }

    res.status(200).send({ message: "ok", patient });
  } catch (e) {
    next(e);
  }
});

//fetch patient's prescription
router.get("/:id/prescriptions", authPatient, async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(id);
    if (isNaN(parseInt(id))) {
      return res.status(400).send({ message: "Patient id is not a number" });
    }

    const prescription = await Patient.findByPk(id, {
      include: [Prescription],
      order: [[Prescription, "createdAt", "DESC"]],
    });

    if (prescription === null) {
      return res.status(404).send({ message: "Patient not found" });
    }

    res.status(200).send({ message: "ok", prescription });
  } catch (e) {
    next(e);
  }
});

//fetch patient's history [array of days] // add pagination later
router.get("/:id/history", authPatient, async (req, res, next) => {
  try {
    const id = req.params.id;

    console.log(id);
    if (isNaN(parseInt(id))) {
      return res.status(400).send({ message: "Patient id is not a number" });
    }
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const patientArrayDays = await Patientday.findAll({
      where: { patientId: id },
      order: [["date", "DESC"]],
      offset,
      limit,
    });

    if (patientArrayDays === null) {
      return res.status(404).send({ message: "Patient not found" });
    }

    res.status(200).send({ message: "ok", patientArrayDays });
  } catch (e) {
    next(e);
  }
});

// fetch patient's day by date
router.get("/:id/patientdays/:date", authPatient, async (req, res, next) => {
  try {
    const date = req.params.date;
    const id = req.params.id;

    console.log("id", id, "date", date, "req.body", req.body);
    if (isNaN(parseInt(id))) {
      return res.status(400).send({ message: "Patient id is not a number" });
    }

    const patientDayByDate = await Patientday.findOne({
      where: { date: date, patientId: id },
    });

    if (patientDayByDate === null) {
      return res.status(404).send({ message: "Patient not found" });
    }

    res.status(200).send({ message: "ok", patientDayByDate });
  } catch (e) {
    next(e);
  }
});

//POSTING
//createa patient's day
router.post("/:id/patientdays", authPatient, async (req, res, next) => {
  try {
    const date = req.body.date;
    const id = req.params.id;

    const day = await Patientday.findOne({
      where: { date: date, patientId: id },
    });
    console.log("my day", day);

    if (day !== null) {
      return res.status(404).send({ message: "This day already exist" });
    }

    // console.log("REQBODY", req.body);
    const { data } = req.body;
    console.log("data", data);
    if (!date) {
      return res.status(400).send({ message: "A day must have a date" });
    }

    const newDay = await Patientday.create({
      ...data,
    });

    res.status(201).send({ message: "Day created", newDay });
  } catch (e) {
    next(e);
  }
});

//PATCHING
router.patch("/:id/patientdays", authPatient, async (req, res, next) => {
  console.log("REQUEST B", req.body, "REQ Header", req.headers);
  try {
    const date = req.body.date;
    const id = req.params.id;

    const updateDay = await Patientday.findOne({
      where: { date: date, patientId: id },
    });
    console.log("my day", updateDay);

    console.log("REQBODY", req.body);
    const { data } = req.body;

    if (!date) {
      return res.status(400).send({
        message:
          "A day must have a date and must be created before it is updated date",
      });
    }

    await updateDay.update({
      ...data,
    });

    res.status(201).send({ message: "Day updated", updateDay });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
