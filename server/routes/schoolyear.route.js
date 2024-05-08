const express = require('express');
const { verifyToken } = require('../lib/helpers/verifyToken');
const { updateUser, deleteUser } = require('../controllers/user.controller');
const {
  addSchoolYear,
  getAllSchoolYear,
  schoolYearToggleStatus,
} = require('../controllers/schoolyear.controller');

const router = express.Router();

router.get('/all', verifyToken, getAllSchoolYear);

router.post('/add', verifyToken, addSchoolYear);

router.patch('/update', verifyToken, updateUser);
router.patch('/toggle', verifyToken, schoolYearToggleStatus);

router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
