const express = require('express');

const { verifyToken } = require('../lib/helpers/verifyToken');
const { deleteTransaction } = require('../controllers/printing.controller');

const {
  addValidatedID,
  getPaginatedValidations,
} = require('../controllers/id_validation.controller');

const router = express.Router();

router.get('/all', verifyToken, getPaginatedValidations);

router.post('/add', verifyToken, addValidatedID);

router.delete('/delete/:id', verifyToken, deleteTransaction);

module.exports = router;
