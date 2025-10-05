const studentService = require('../services/studentService');

async function getStudentList(req, res) {
    try {
        const { branch, name, page, sortBy } = req.query;
        const filters = { branch, name };
        const pageNum = parseInt(page, 10) || 1;
        const sort = sortBy || 'name';

        const { students, total, limit } = await studentService.getAllStudents(filters, pageNum, 6, sort);

        res.render('students/index', {
            students,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limit),
            filters,
            sortBy: sort,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

function getAddStudentForm(req, res) {
    res.render('students/form', { student: {} });
}

async function addStudent(req, res) {
    try {
        const studentData = req.body;
        studentData.isHosteller = !!studentData.isHosteller;
        await studentService.createStudent(studentData);
        res.redirect('/students');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getEditStudentForm(req, res) {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('students/form', { student });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function editStudent(req, res) {
    try {
        const studentData = req.body;
        studentData.isHosteller = !!studentData.isHosteller;
        await studentService.updateStudent(req.params.id, studentData);
        res.redirect('/students');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function deleteStudent(req, res) {
    try {
        await studentService.deleteStudent(req.params.id);
        res.redirect('/students');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getStudentList,
    getAddStudentForm,
    addStudent,
    getEditStudentForm,
    editStudent,
    deleteStudent,
};