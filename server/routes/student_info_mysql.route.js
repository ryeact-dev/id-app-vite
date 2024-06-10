const express = require('express');

const { verifyToken } = require('../lib/helpers/verifyToken');

const {
  getStudentInfo,
} = require('../controllers/student_info_mysql.controller');

const router = express.Router();

router.get('/student-info/:id_number', getStudentInfo);

module.exports = router;
