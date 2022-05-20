////Declare the variables
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;
const studentGroup = require('./Routes/StudentGroup');
const ResearchArea = require("./Routes/ResearchArea");
const Supervisor = require('./Routes/Supervisor');
const Student = require('./Routes/Student');
const cors = require('cors');
const bodyparser = require('body-parser');
const student = require('./Routes/Student');
const Conversation = require("./Routes/Conversations")
const Message = require("./Routes/Messages");
const GroupConversation = require('./Routes/GroupConversation');
app.use(cors());
app.use(bodyparser.json());


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


app.use("/api/studentGroups", studentGroup);
app.use("/api", ResearchArea);
app.use("/api", Supervisor);
app.use("/api", student);
app.use("/api/conversation", Conversation);
app.use("/api/groupconversation", GroupConversation);
app.use("/api/message", Message);



////create server with port numebr 
app.listen(PORT, () => {
  console.log(`service is up and running on port ${PORT}`);
});
