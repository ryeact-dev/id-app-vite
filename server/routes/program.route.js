const express = require('express');
const { verifyToken } = require('../lib/helpers/verifyToken');

const {
  addDepartment,
  getAllDepartments,
  deleteDepartment,
} = require('../controllers/department.controller');
const {
  addProgram,
  getAllPrograms,
  deleteProgram,
} = require('../controllers/program.controller');

const router = express.Router();

// router.get('/current', verifyToken, getCurrentUser);
router.get('/all', verifyToken, getAllPrograms);

router.post('/add', verifyToken, addProgram);
// router.post('/login', loginUser);

// router.patch('/update', verifyToken, updateUser);
// router.patch('/toggle-status', verifyToken, toggleUserStatus);

router.delete('/delete/:id', verifyToken, deleteProgram);

module.exports = router;
