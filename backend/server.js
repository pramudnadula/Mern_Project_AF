////Declare the variables
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;
app.use('/uploads', express.static('uploads'));
const studentGroup = require('./Routes/StudentGroup');
const ResearchArea = require("./Routes/ResearchArea");
const Supervisor = require("./Routes/Supervisor");
const Student = require("./Routes/Student");
const cors = require("cors");
const bodyparser = require("body-parser");
const student = require("./Routes/Student");
const Conversation = require("./Routes/Conversations");
const Message = require("./Routes/Messages");
const Stage = require('./Routes/Groupstage')


const MarkingScheme = require("./Routes/MarkingScheme");
const MarkingMarkingScheme = require("./Routes/MarkingMarkingScheme");
const GroupConversation = require('./Routes/GroupConversation');
const userRouter = require('./Routes/users.js');
const RequestRouter = require('./Routes/Request')
const adminRouter = require('./Routes/admins.js');

//!File Upload 
const multer = require('multer')//import npm package multer

const fileStorageEngine = multer.diskStorage({ //function about file destination and file type and date of save
  destination: (req, file, cb) => {
    cb(null, './Documents')//file destination
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)//file save date + file original extention name(.pdf/.png /.jpeg)
  },
})

const upload = multer({ storage: fileStorageEngine })//pass the fileStorageEngine variable to storage

//!Single File Uploading
app.post("/single", upload.single('image'), (req, res) => {//pass route in middlware  //! upload.single mean pass the single file and 'image' is a key value
  console.log(req.file);
  res.send("Single File Upload Success")
})
//!Multiple File Uploading
app.post("/multiple", upload.array('images', 5), (req, res) => {//pass route in middlware  //! upload.array mean pass the multiple file and 'images' is a key value and ,5 mean  maximum file count
  console.log(req.files);
  res.send("Multiple File Upload Success")
})


app.use(cors());
app.use(bodyparser.json());

////connect to mongoDB
mongoose.connect(URL, (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
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
app.use("/api/stages", Stage);

app.use("/api/markingscheme", MarkingScheme);
app.use("/api/evoluate", MarkingMarkingScheme);

app.use('/user', userRouter); //user login & Registration
app.use("/api/request", RequestRouter);

app.use('/admin', adminRouter);




////create server with port numebr
app.listen(PORT, () => {
  console.log(`service is up and running on port ${PORT}`);
});
