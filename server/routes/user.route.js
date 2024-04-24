const express = require('express');
const {
  addUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
} = require('../controllers/user.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');

const router = express.Router();

router.get('/current', verifyToken, getCurrentUser);
router.get('/all', verifyToken, getAllUsers);

router.post('/add', addUser);
router.post('/login', loginUser);

// router.patch('/update-question', updateQuestion);

// router.delete('/delete-question/:id', deleteQuestion);

module.exports = router;
