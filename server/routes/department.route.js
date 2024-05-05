const express = require('express');
const { verifyToken } = require('../lib/helpers/verifyToken');

const { addDepartment } = require('../controllers/department.controller');

const router = express.Router();

// router.get('/current', verifyToken, getCurrentUser);
// router.get('/all', verifyToken, getAllUsers);

router.post('/add', verifyToken, addDepartment);
// router.post('/login', loginUser);

// router.patch('/update', verifyToken, updateUser);
// router.patch('/toggle-status', verifyToken, toggleUserStatus);

// router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
