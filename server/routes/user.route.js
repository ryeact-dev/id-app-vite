const express = require('express');
const {
  addUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  updateUser,
  toggleUserStatus,
  deleteUser,
} = require('../controllers/user.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');

const router = express.Router();

router.get('/current', verifyToken, getCurrentUser);
router.get('/all', verifyToken, getAllUsers);

router.post('/add', verifyToken, addUser);
router.post('/login', loginUser);

router.patch('/update', verifyToken, updateUser);
router.patch('/toggle-status', verifyToken, toggleUserStatus);

router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
