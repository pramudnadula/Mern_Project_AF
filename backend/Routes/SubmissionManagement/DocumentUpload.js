const { UploadFileSingle, UploadFileMultiple, GetOneDocument, GetOneDocumentID } = require('../../Controllers/SubmissionManagement/DocumentUpload');
const isAuth = require("../../middleware/auth");//pass the middleware

const router = require('express').Router();
// //!File Upload Student single file 
 const multer = require('multer')//import npm package multer

 const fileStorageEngine = multer.diskStorage({ //function about file destination and file type and date of save
     destination: (req, file, cb) => {
       cb(null, './Documents')//file destination
     },
     filename:(req, file, cb)=>{
       const documentName = new Date().toISOString().replace(/:/g, '-') + '--' +file.originalname;
       cb(null, documentName)//file save date + file original extention name(.pdf/.png /.jpeg)
     },
 })

 const upload = multer({ storage: fileStorageEngine })//pass the fileStorageEngine variable to storage

//! Routes document submission and submission details 
router.post("/single", upload.single('image'), isAuth, UploadFileSingle) //single file uploading 
router.post("/multiple",upload.array('images', 5), isAuth, UploadFileMultiple) //multiple file uploading
router.post("/documentOne", isAuth, GetOneDocument) //multiple file uploading
router.get("/documentOne/one/:id", isAuth, GetOneDocumentID) //multiple file uploading


module.exports = router;