const { GetAllSubmissionType, DeleteSubmissionType, GetOneSubmissionType, GetAllSubmission, GetOneSubmission, UploadFileMultiple } = require('../../Controllers/SubmissionManagement/SubmissionType');//get create submission in SubmissionType controller
const isAuth = require("../../middleware/auth");//pass the middleware
const router = require('express').Router();

// //!File Upload Supervisor Multiple Documents
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

 //! Routes supervisor side document submission and submission details 
router.post("/multiple",upload.array('images', 5), isAuth, UploadFileMultiple) //multiple file uploading
// router.post('/', isAuth, CreateSubmissionType)// add submission type  
router.get('/', isAuth, GetAllSubmissionType)// get all submission type  
router.delete('/one/:id', isAuth, DeleteSubmissionType)// delete one submission type  
router.get('/one/:id', isAuth, GetOneSubmissionType)// get one submission type  
// router.put('/one/:id', isAuth, UpdateOneSubmissionType)// update one submission type  

//! routes student
router.get('/all', isAuth, GetAllSubmission)// get all submission type  
router.get('/all/one/:id', isAuth, GetOneSubmission)// get one submission type  

module.exports = router;