const express = require('express');
const { verifyToken } = require('../lib/helpers/verifyToken');

const {
  addSemesterDates,
  getSemesterDates,
  updateSemesterDates,
  toggleSemesterDates,
} = require('../controllers/semester.controller');

const router = express.Router();

router.get('/all', verifyToken, getSemesterDates);

router.post('/add', verifyToken, addSemesterDates);

router.patch('/update', verifyToken, updateSemesterDates);
router.patch('/toggle', verifyToken, toggleSemesterDates);

// router.delete('/delete/:id', verifyToken, deleteSchoolYear);

module.exports = router;
