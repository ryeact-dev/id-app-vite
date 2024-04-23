const express = require('express');
const { addUser } = require('../controllers/user.controller');

const router = express.Router();

// router.get('/get-question', getAllQuestions);

router.post('/add', addUser);
router.post('/login', addUser);

// router.patch('/update-question', updateQuestion);

// router.delete('/delete-question/:id', deleteQuestion);

module.exports = router;
