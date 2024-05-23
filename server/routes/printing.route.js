const express = require('express');

const { verifyToken } = require('../lib/helpers/verifyToken');
const {
  getPaginatedPrintedIds,
  addPrintId,
  updatePrintId,
  releaseId,
  deleteTransaction,
} = require('../controllers/printing.controller');

const router = express.Router();

router.get('/all', verifyToken, getPaginatedPrintedIds);

router.post('/add', verifyToken, addPrintId);
router.patch('/update', verifyToken, updatePrintId);

router.patch('/release/:id', verifyToken, releaseId);

router.delete('/delete/:id', verifyToken, deleteTransaction);

module.exports = router;
