const express = require('express');
const { verifyToken } = require('../lib/helpers/verifyToken');
const {
  addStudent,
  getPaginatedStudents,
} = require('../controllers/student.controller');
const multer = require('multer');

const router = express.Router();

const multerFields = [
  { name: 'esign', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
];

// router.get('/single', verifyToken, getCurrentUser);

// Paginated Page
router.get('/all', verifyToken, getPaginatedStudents);

router.post(
  '/add',
  verifyToken,
  multer({ dest: 'uploads/img/dummy' }).fields(multerFields),
  addStudent
);

// router.patch('/update', verifyToken, updateUser);

// router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
