const express = require('express');
const {
  updateUser,
  toggleUserStatus,
  deleteUser,
} = require('../controllers/user.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');
const {
  getPaginatedPrintedIds,
} = require('../controllers/printing.controller');

const router = express.Router();

router.get('/all', verifyToken, getPaginatedPrintedIds);

router.post('/print', verifyToken, getPaginatedPrintedIds);

router.patch('/update', verifyToken, updateUser);
router.patch('/toggle-status', verifyToken, toggleUserStatus);

router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
