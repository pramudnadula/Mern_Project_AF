const { UploadFileSingle, UploadFileMultiple } = require('../../Controllers/SubmissionManagement/DocumentUpload');
const isAuth = require("../../middleware/auth");//pass the middleware

const router = require('express').Router();
// //!File Upload 
 const multer = require('multer')//import npm package multer

 const fileStorageEngine = multer.diskStorage({ //function about file destination and file type and date of save
     destination: (req, file, cb) => {
       cb(null, './Documents')//file destination
     },
     filename:(req, file, cb)=>{
       cb(null, new Date().toISOString().replace(/:/g, '-') + '--' +file.originalname)//file save date + file original extention name(.pdf/.png /.jpeg)
     },
 })

 const upload = multer({ storage: fileStorageEngine })//pass the fileStorageEngine variable to storage

//! Routes
router.post("/single", upload.single('image'), isAuth, UploadFileSingle) //single file uploading 
router.post("/multiple",upload.array('images', 5), isAuth, UploadFileMultiple) //multiple file uploading


module.exports = router;