const { CreateSubmissionType, GetAllSubmissionType, DeleteSubmissionType, GetOneSubmissionType, UpdateOneSubmissionType } = require('../../Controllers/SubmissionManagement/SubmissionType');//get create submission in SubmissionType controller

const router = require('express').Router();

//! routes
router.post('/', CreateSubmissionType)// add submission type  
router.get('/', GetAllSubmissionType)// add submission type  
router.delete('/:id', DeleteSubmissionType)// delete one submission type  
router.get('/:id', GetOneSubmissionType)// get one submission type  
router.put('/:id', UpdateOneSubmissionType)// update one submission type  

module.exports = router;