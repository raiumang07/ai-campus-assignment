const Student = require('../models/Student');

async function getAllStudents(filters = {}, page = 1, limit = 10, sortBy = 'name') {
    const query = {};

    if (filters.branch) {
        query.branch = filters.branch;
    }

    if (filters.name) {
        query.name = { $regex: filters.name, $options: 'i' }; // Case-insensitive search
    }

    const students = await Student.find(query)
        .sort(sortBy)
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Student.countDocuments(query);

    return { students, total, page, limit };
}

async function getStudentById(id) {
    return await Student.findById(id);
}

async function createStudent(data) {
    const student = new Student(data);
    return await student.save();
}

async function updateStudent(id, data) {
    return await Student.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function deleteStudent(id) {
    return await Student.findByIdAndDelete(id);
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
};