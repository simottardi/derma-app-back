const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth.js");
const authMiddleWare = require("./auth/middleware");
const patientRouter = require("./routers/patient.js")
const doctorRouter = require("./routers/doctor.js")

const app = express();

app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}


app.use("/", authRouter);
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
