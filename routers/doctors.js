const { Router } = require("express");
const Doctor = require("../models").doctor;
const router = new Router();
const Appointments = require("../models").appointment;
const { authDoctor } = require("../auth/middleware");
const Patient = require("../models").patient;
const Patientday = require("../models").patientDay;

router.get("/", async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

// ROUTES TO IMPLEMENT

// [ ] fetch docotors details
// [ ] fetch doctors appointments

// fetch docotors details
router.get(
  "/:id",
  /* authPatient, */ async (req, res, next) => {
    try {
      const { id } = req.params;

      console.log(id);
      if (isNaN(parseInt(id))) {
        return res.status(400).send({ message: "Doctor id is not a number" });
      }

      const doctor = await Doctor.findByPk(id, {});

      if (doctor === null) {
        return res.status(404).send({ message: "Doctor not found" });
      }

      res.status(200).send({ message: "ok", doctor });
    } catch (e) {
      next(e);
    }
  }
);

//fetch patient's appointments add /* , authDoctor */,

router.get("/:id/appointments", authDoctor, async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(id);
    if (isNaN(parseInt(id))) {
      return res.status(400).send({ message: "Doctor id is not a number" });
    }

    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const appointments = await Appointments.findAll({
      where: { doctorId: id },
      order: [["datetime", "DESC"]],
      offset,
      limit,
    });

    if (appointments === null) {
      return res.status(404).send({ message: "Appointments not found" });
    }

    res.status(200).send({ message: "ok", appointments });
  } catch (e) {
    next(e);
  }
});

//fetch patient's appointments add /* , authDoctor */,

router.get(
  "/:id/patients",
  /* authDoctor, */ async (req, res, next) => {
    try {
      const { id } = req.params;

      console.log(id);
      if (isNaN(parseInt(id))) {
        return res.status(400).send({ message: "Doctor id is not a number" });
      }

      /*     const appointments = await Doctor.findByPk(id, {
      attributes: { exclude: [Doctor] },
      include: [Patient],
      order: [[Patient, "name", "DESC"]],
    });
 */

      const limit = req.query.limit || 10;
      const offset = req.query.offset || 0;
      const patients = await Patient.findAll({
        where: { doctorId: id },
        order: [["name", "ASC"]],
        offset,
        limit,
      });

      if (patients === null) {
        return res.status(404).send({ message: "Patients not found" });
      }

      res.status(200).send({ message: "ok", patients });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/patient/:id/history", authDoctor, async (req, res, next) => {
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
