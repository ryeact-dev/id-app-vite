const express = require('express');
const { verifyToken } = require('../lib/helpers/verifyToken');
const {
  schoolYearToggleStatus,
  updateSchoolYear,
  deleteSchoolYear,
} = require('../controllers/schoolyear.controller');
const {
  addSemesterDates,
  getSemesterDates,
} = require('../controllers/semester.controller');

const router = express.Router();

router.get('/all/:id', verifyToken, getSemesterDates);

router.post('/add', verifyToken, addSemesterDates);

router.patch('/update', verifyToken, updateSchoolYear);
router.patch('/toggle', verifyToken, schoolYearToggleStatus);

router.delete('/delete/:id', verifyToken, deleteSchoolYear);

module.exports = router;
