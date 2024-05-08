const express = require('express');
const { verifyToken } = require('../lib/helpers/verifyToken');
const {
  addSchoolYear,
  getAllSchoolYear,
  schoolYearToggleStatus,
  updateSchoolYear,
  deleteSchoolYear,
} = require('../controllers/schoolyear.controller');

const router = express.Router();

router.get('/all', verifyToken, getAllSchoolYear);

router.post('/add', verifyToken, addSchoolYear);

router.patch('/update', verifyToken, updateSchoolYear);
router.patch('/toggle', verifyToken, schoolYearToggleStatus);

router.delete('/delete/:id', verifyToken, deleteSchoolYear);

module.exports = router;
