const express = require('express');
const { verifyToken } = require('../lib/helpers/verifyToken');

const {
  addDepartment,
  getAllDepartments,
  deleteDepartment,
  updateDepartment,
} = require('../controllers/department.controller');

const router = express.Router();

router.get('/all', verifyToken, getAllDepartments);

router.post('/add', verifyToken, addDepartment);

router.patch('/update', verifyToken, updateDepartment);

router.delete('/delete/:id', verifyToken, deleteDepartment);

module.exports = router;
