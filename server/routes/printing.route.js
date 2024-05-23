const express = require('express');
const {
  toggleUserStatus,
  deleteUser,
} = require('../controllers/user.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');
const {
  getPaginatedPrintedIds,
  addPrintId,
  updatePrintId,
} = require('../controllers/printing.controller');

const router = express.Router();

router.get('/all', verifyToken, getPaginatedPrintedIds);

router.post('/add', verifyToken, addPrintId);
router.patch('/update', verifyToken, updatePrintId);

router.patch('/toggle-status', verifyToken, toggleUserStatus);

router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
