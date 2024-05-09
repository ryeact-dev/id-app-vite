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
const { addStudent } = require('../controllers/student.controller');

const router = express.Router();

router.get('/single', verifyToken, getCurrentUser);

// Paginated Page
router.get('/all', verifyToken, getAllUsers);

router.post('/add', verifyToken, addStudent);

router.patch('/update', verifyToken, updateUser);

router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
