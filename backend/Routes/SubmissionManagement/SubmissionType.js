const { CreateSubmissionType, GetAllSubmissionType, DeleteSubmissionType, GetOneSubmissionType, UpdateOneSubmissionType } = require('../../Controllers/SubmissionManagement/SubmissionType');//get create submission in SubmissionType controller
const isAuth = require("../../middleware/auth");//pass the middleware

const router = require('express').Router();

//! routes
router.post('/', isAuth, CreateSubmissionType)// add submission type  
router.get('/', isAuth, GetAllSubmissionType)// add submission type  
router.delete('/:id', isAuth, DeleteSubmissionType)// delete one submission type  
router.get('/:id', isAuth, GetOneSubmissionType)// get one submission type  
router.put('/:id', isAuth, UpdateOneSubmissionType)// update one submission type  

module.exports = router;