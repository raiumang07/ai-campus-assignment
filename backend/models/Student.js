const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      enum: ['CSE', 'IT', 'ECE', 'ME', 'CE'],
    },
    isHosteller: {
      type: Boolean,
      default: false,
    },
    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    attendance: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    cgpaPercentage: {
        type: Number,
    },
    overallPercentage: {
        type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to calculate derived fields before saving
studentSchema.pre('save', function (next) {
  this.cgpaPercentage = (this.cgpa / 10) * 100;
  this.overallPercentage = 0.7 * this.cgpaPercentage + 0.3 * this.attendance;
  next();
});

// Middleware to calculate derived fields before updating
studentSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.cgpa || update.attendance) {
        // Need to get the document to access existing values if not all are being updated
        this.model.findOne(this.getQuery()).then(doc => {
            const cgpa = update.cgpa || doc.cgpa;
            const attendance = update.attendance || doc.attendance;
            
            const cgpaPercentage = (cgpa / 10) * 100;
            update.cgpaPercentage = cgpaPercentage;
            update.overallPercentage = 0.7 * cgpaPercentage + 0.3 * attendance;
            next();
        }).catch(err => next(err));
    } else {
        next();
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
