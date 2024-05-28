require('dotenv').config();
const PORT = process.env.SERVER_PORT || 4000;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { shutdownPrisma } = require('./lib/utils/prismaDisconnect');

// Routes
const userRoute = require('./routes/user.route');
const departmentRoute = require('./routes/department.route');
const programRoute = require('./routes/program.route');
const schoolyearRoute = require('./routes/schoolyear.route');
const semesterRoute = require('./routes/semester.route');
const studentRoute = require('./routes/student.route');
const printingRoute = require('./routes/printing.route');
const idValidationRoute = require('./routes/id_validation.route');
const reportsRoute = require('./routes/reports.route');

const app = express();

app.set('trust proxy', true); // So the req.ip will reveal the client's real IP
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(helmet());

app.use('/api/user', userRoute);
app.use('/api/department', departmentRoute);
app.use('/api/program', programRoute);
app.use('/api/school-year', schoolyearRoute);
app.use('/api/semester', semesterRoute);
app.use('/api/student', studentRoute);
app.use('/api/printing', printingRoute);
app.use('/api/id-validation', idValidationRoute);
app.use('/api/reports', reportsRoute);

// Disconnect Prisma when the server exit
process.on('SIGINT', shutdownPrisma);
process.on('SIGTERM', shutdownPrisma);

// Error handler
app.use((err, req, res, next) => {
  // const statusCode = err.statusCode || 500;
  const errorTitle = err.title;
  console.error(`${errorTitle} :: ${err.stack}`);
  return res
    .status(500)
    .send(`Error: ${errorTitle || 'Internal Server Error'}`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(process.env.DB_NAME),
    console.log(`Server running on PORT ${PORT}`);
});
