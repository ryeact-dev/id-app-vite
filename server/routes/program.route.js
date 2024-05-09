const express = require('express');
const { verifyToken } = require('../lib/helpers/verifyToken');

const {
  addProgram,
  getAllPrograms,
  deleteProgram,
  updateProgram,
} = require('../controllers/program.controller');

const router = express.Router();

router.get('/all', verifyToken, getAllPrograms);

router.post('/add', verifyToken, addProgram);

router.patch('/update', verifyToken, updateProgram);

router.delete('/delete/:id', verifyToken, deleteProgram);

module.exports = router;
