// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   class: { type: String, required: true },
//   photo: { type: String },  // URL for image
//   video: { type: String }   // URL for video
// });

// module.exports = mongoose.model('Student', studentSchema);


const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  photo: { type: String }, 
  video: { type: String }, 
});

module.exports = mongoose.model('Student', StudentSchema);

