const Patient = require("../models").patient;
const Doctor = require("../models").doctor;
const { toData } = require("./jwt");

async function authPatient(req, res, next) {
  console.log(
    "REQUEST HEADERS",
    req.headers,
    "REQ BODY",
    req.body //  req.IncomingMessage.params
  );
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  if (!auth || !auth[0] === "Bearer" || !auth[1]) {
    res.status(401).send({
      message:
        "This endpoint requires an Authorization header with a valid token",
    });
  }

  try {
    const data = toData(auth[1]);
    const patient = await Patient.findByPk(data.patientId);
    if (!patient) {
      return res.status(404).send({ message: "Patient does not exist" });
    }

    // add patient object to request
    req.patient = patient;
    // next handler
    return next();
  } catch (error) {
    console.log("ERROR IN AUTH MIDDLEWARE", error);

    switch (error.name) {
      case "TokenExpiredError":
        return res
          .status(401)
          .send({ error: error.name, message: error.message });

      case "JsonWebTokenError":
        return res
          .status(400)
          .send({ error: error.name, message: error.message });

      default:
        return res.status(400).send({
          message: "Something went wrong, sorry",
        });
    }
  }
}

async function authDoctor(req, res, next) {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  if (!auth || !auth[0] === "Bearer" || !auth[1]) {
    res.status(401).send({
      message:
        "This endpoint requires an Authorization header with a valid token",
    });
  }

  try {
    const data = toData(auth[1]);
    const doctor = await Doctor.findByPk(data.doctorId);
    if (!doctor) {
      return res.status(404).send({ message: "Doctor does not exist" });
    }

    // add doctor object to request
    req.doctor = doctor;
    // next handler
    return next();
  } catch (error) {
    console.log("ERROR IN AUTH MIDDLEWARE", error);

    switch (error.name) {
      case "TokenExpiredError":
        return res
          .status(401)
          .send({ error: error.name, message: error.message });

      case "JsonWebTokenError":
        return res
          .status(400)
          .send({ error: error.name, message: error.message });

      default:
        return res.status(400).send({
          message: "Something went wrong, sorry",
        });
    }
  }
}

module.exports = { authPatient, authDoctor };
