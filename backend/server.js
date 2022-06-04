//! Declare the variables
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Createserver = require('./Createserver')
const app = Createserver()
require("dotenv").config();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;
app.use('/uploads', express.static('uploads'));
app.use('/Documents', express.static('Documents'));
const studentGroup = require('./Routes/StudentGroup');
const ResearchArea = require("./Routes/ResearchArea");
const Supervisor = require("./Routes/Supervisor");
const Student = require("./Routes/Student");
const cors = require("cors");
const bodyparser = require("body-parser");
const student = require("./Routes/Student");
const Conversation = require("./Routes/Conversations");
const Message = require("./Routes/Messages");
const Stage = require('./Routes/Groupstage');
const Trequest = require('./Routes/Topic_Request');
const MarkingScheme = require("./Routes/MarkingScheme");
const MarkingMarkingScheme = require("./Routes/MarkingMarkingScheme");
const GroupConversation = require('./Routes/GroupConversation');
const userRouter = require('./Routes/users.js');
const RequestRouter = require('./Routes/Request');
const DocumentUpload = require('./Routes/SubmissionManagement/DocumentUpload');
const SubmissionType = require('./Routes/SubmissionManagement/SubmissionType');
const adminRouter = require('./Routes/admins.js');
const admincontact = require('./Routes/AdminContact');
const Panel = require('./Routes/Panel');
const Question = require('./Routes/Question')






////connect to mongoDB
mongoose.connect(URL, (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});



app.use("/api/studentGroups", studentGroup);
app.use("/api", ResearchArea);
app.use("/api", Supervisor);
app.use("/api", student);
app.use("/api/conversation", Conversation);
app.use("/api/groupconversation", GroupConversation);
app.use("/api/message", Message);
app.use("/api/stages", Stage);
app.use("/api/trequest", Trequest);
app.use("/api/admincontact", admincontact);
app.use("/api/question", Question);

app.use("/api/markingscheme", MarkingScheme); //Marking Schemes Route
app.use("/api/evoluate", MarkingMarkingScheme); //Evoluate Route
app.use("/api/panel/", Panel); //Panel Route

app.use('/user', userRouter); //user login & Registration
app.use("/api/request", RequestRouter);



app.use('/admin', adminRouter);

app.use("/api/document", DocumentUpload);//Document Upload Route
app.use("/api/submissiontype", SubmissionType);//Document Upload Route


////create server with port numebr
app.listen(PORT, () => {
  console.log(`service is up and running on port ${PORT}`);
});

module.exports = app;
