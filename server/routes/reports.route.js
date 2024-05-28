const express = require('express');

const { verifyToken } = require('../lib/helpers/verifyToken');

const {
  getPagindatedPrintedIDsReport,
} = require('../controllers/reports.controller');

const router = express.Router();

router.post('/all', verifyToken, getPagindatedPrintedIDsReport);

module.exports = router;
