const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Unprotected for now, will add auth middleware later
router.get('/', studentController.getStudentList);
router.get('/add', studentController.getAddStudentForm);
router.post('/add', studentController.addStudent);
router.get('/edit/:id', studentController.getEditStudentForm);
router.post('/edit/:id', studentController.editStudent);
router.post('/delete/:id', studentController.deleteStudent);

module.exports = router;