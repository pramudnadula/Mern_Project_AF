////Declare the variables
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

// const cors = require('cors');
// const bodyparser = require('body-parser');


// app.use(cors());
// app.use(bodyparser.json());


////connect to mongoDB
mongoose.connect(URL, (err) => {
  if (err) throw err;
  console.log('connected to MongoDB');
});

// mongoose.connect(URL, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopologyL: true,
//   useFindAndModify: false,
// });

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('mongodb connection is success!!!');
// });

// const studentRouter = require('./routes/students.js');
// app.use('/student', studentRouter);



////create server with port numebr 
app.listen(PORT, () => {
  console.log(`service is up and running on port ${PORT}`);
});
