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
[x] fetch patient's details
[x]fetch patient's doctor 
[x]fetch patient's prescription
[x]fetch patient's history [array of days] // add pagination later
[x]fetch patient's day by date

[x]create a patient's day
[x]set patients's itch score for the day
[ ]set patient's picture for the day --> to be done with cloudify
[x]set patient's dayly medication as true or false

[ ] adding auth to the routes that need it --> do it one level higher maybe at the /patient/ endpoint
*/


// fetch patient details
router.get("/:id", async (req, res, next) => {
    try {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Patient id is not a number" });
  }

  const patient = await Patient.findByPk(id, {
    // include: [Story],
    // order: [[Story, "createdAt", "DESC"]]
  });

  if (patient === null) {
    return res.status(404).send({ message: "Patient not found" });
  }

  res.status(200).send({ message: "ok", patient });
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

  const patient = await Patient.findByPk(id, {
     include: [Doctor],
    //  order: [[Story, "createdAt", "DESC"]]
  });

  if (homepage === null) {
    return res.status(404).send({ message: "Patient not found" });
  }

  res.status(200).send({ message: "ok", patient });
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

  const prescription = await Patient.findByPk(id, {
     include: [Prescription],
     order: [[Prescription, "createdAt", "DESC"]]
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
router.get("/:id/history", async (req, res, next) => {
    try {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Patient id is not a number" });
  }
const limit = req.query.limit || 10;
   const offset = req.query.offset || 0;
   const patientArrayDays  = await Patient.findByPk(id, {
    limit,
    offset,    
     include: [Patientday],
    //  order: [[Patientday, "createdAt", "DESC"]]
  });

  if (patientArrayDays === null) {
    return res.status(404).send({ message: "Patient not found" });
  }

  res.status(200).send({ message: "ok", patientArrayDays  });
  } catch (e) {
    next(e);
  }
});



// fetch patient's day by date
router.get("/:id/daybydate", async (req, res, next) => {
    try {
      const date = req.body.date;
      const  id  = req.params.id;

    console.log("id", id, "date", date);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Patient id is not a number" });
  }

  const patientDayByDate = await Patientday.findOne({
    where: { date: date ,
      patientId: id}
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
router.post("/:id/daybydate", async (req, res, next) => {
    try {
      const date = req.body.date;
      const  id  = req.params.id;

      const day = await Patientday.findOne({
    where: { date: date ,
      patientId: id}
  });
  console.log("my day", day);

   if (day !== null) {
    return res.status(404).send({ message: "This day already exist" });
  }

   const { 

       itchScore,
       medicationAfternoon,
       medicationEvening,
       medicationMorning,
       note,

       image } = req.body;

  if (!date) {
    return res.status(400).send({ message: "A day must have a date" });
  }

  const newDay = await Patientday.create({
       date,
       itchScore,
       medicationAfternoon,
       medicationEvening,
       medicationMorning,
       note,
       patientId: id,
       image 
  });

  res.status(201).send({ message: "Day created", newDay });
  } catch (e) {
    next(e);
  }
});


//PATCHING
//Patching a patient day
router.patch("/:id/daybydate", async (req, res, next) => {
    try {
      const date = req.body.date;
      const  id  = req.params.id;

      const updateDay = await Patientday.findOne({
    where: { date: date ,
      patientId: id}
  });
  console.log("my day", updateDay);

  // to check later, when I add authentication
  // if (patientDay.userId !== req.patient.id) {
  //   return res
  //     .status(403)
  //     .send({ message: "You are not authorized to update this homepage" });
  // }

   const { 
       itchScore,
       medicationAfternoon,
       medicationEvening,
       medicationMorning,
       note,
       image } = req.body;

  if (!date) {
    return res.status(400).send({ message: "A day must have a date and must be created before it is updated date" });
  }

  await updateDay.update({
     //  date,
       itchScore,
       medicationAfternoon,
       medicationEvening,
       medicationMorning,
       note,
     //  patientId: id,
       image 
  });

  res.status(201).send({ message: "Day updated", updateDay });
  } catch (e) {
    next(e);
  }
});



module.exports = router;