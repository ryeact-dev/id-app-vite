const express = require('express');
const { addUser, loginUser } = require('../controllers/user.controller');

const router = express.Router();

// router.get('/get-question', getAllQuestions);

router.post('/add', addUser);
router.post('/login', loginUser);

// router.patch('/update-question', updateQuestion);

// router.delete('/delete-question/:id', deleteQuestion);

module.exports = router;
