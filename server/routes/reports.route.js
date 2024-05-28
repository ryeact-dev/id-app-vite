const express = require('express');

const { verifyToken } = require('../lib/helpers/verifyToken');

const {
  getPagindatedPrintedIDsReport,
  getPagindatedValidatedIDsReport,
} = require('../controllers/reports.controller');

const router = express.Router();

router.post('/all-printed-ids', verifyToken, getPagindatedPrintedIDsReport);
router.post('/all-validated-ids', verifyToken, getPagindatedValidatedIDsReport);

module.exports = router;
