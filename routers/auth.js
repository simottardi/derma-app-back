const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const Patient = require("../models/").patient;
const Doctor = require("../models/").doctor;
const {authPatient,  authDoctor} = require("../auth/middleware");
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

//PATIENTS

router.post("/login/patient", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const patient = await Patient.findOne({ where: { email } });

        if (!patient || !bcrypt.compareSync(password, patient.password)){
return res.status(400).send({
        message: "Patient with that email not found or password incorrect",
      });
    }
    delete patient.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ patientId: patient.id });
    return res.status(200).send({ token, ...patient.dataValues });
     
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup/patient", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newPatient = await Patient.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
            name,

    });

    delete newPatient.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ patientId: newPatient.id });

    res.status(201).json({ token, ...newPatient.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});


// DOCTORS

router.post("/login/doctor", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const doctor = await Doctor.findOne({ where: { email } });

        if (!doctor || !bcrypt.compareSync(password, doctor.password)){
return res.status(400).send({
        message: "Doctor with that email not found or password incorrect",
      });
    }
    delete doctor.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ doctorId: doctor.id });
    return res.status(200).send({ token, ...doctor.dataValues });
     
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});



// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me/doctor", authDoctor, async (req, res) => {
  // don't send back the password hash
  delete req.doctor.dataValues["password"];
  res.status(200).send({ ...req.doctor.dataValues });
});

router.get("/me/patient", authPatient, async (req, res) => {
  // don't send back the password hash
  delete req.patient.dataValues["password"];
  res.status(200).send({ ...req.patient.dataValues });
});

module.exports = router;
