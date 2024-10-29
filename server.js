const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');
const bookRoutes = require('./routes/bookRoutes');
const allotmentRoutes = require('./routes/allotmentRoutes');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://user:user@bankcluster.meoqa.mongodb.net/library';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  
app.use('/uploads',express.static("uploads"));
app.use('/students', studentRoutes);
app.use('/books', bookRoutes);
app.use('/allotments', allotmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
