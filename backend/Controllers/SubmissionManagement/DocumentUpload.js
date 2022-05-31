const router = require('express').Router();
const DocumentUpload = require('../../Models/SubmissionManagement/DocumentUpload');

//!Single File Uploading
exports.UploadFileSingle = async (req, res) => {//pass route in middlware  //! upload.single mean pass the single file and 'image' is a key value
    console.log(req.file);
    console.log(req.body.gid);
    console.log(req.body.sid);
    console.log(req.body.sDate);
    try {
        if(req.body.did){

            const findDoc = await DocumentUpload.findById({_id:req.body.did})
            
            // findDoc.submissionId = req.body.sid,
            // findDoc.groupId = req.body.gid,
            findDoc.documentName = req.file.path
            findDoc.submissionDate = req.body.sDate
              
            
            await findDoc.save();
            res.send("Single File Updated Success")
        }else{
            const doc = new DocumentUpload({
                submissionId: req.body.sid,
                groupId: req.body.gid,
                documentName: req.file.path,
                submissionDate: req.body.sDate,
            })
            await doc.save();
            res.send("Single File Upload Success")

        }
    } catch (error) {
        res.send("Single File Upload Fail")
    }
}
//!Multiple File Uploading
exports.UploadFileMultiple = (req, res) => {//pass route in middlware  //! upload.array mean pass the multiple file and 'images' is a key value and ,5 mean  maximum file count
    console.log(req.files);
    res.send("Multiple File Upload Success")
}


//! Get One Submission for Student Doc post method
exports.GetOneDocument = async (req, res) => {
    const {sid, gid} = req.body;

    try {
        const oneDocument = await DocumentUpload.findOne({submissionId:sid,  groupId:gid})
        if(oneDocument){
            res.send({msg:true, oneDocument})
        }else{
            res.send({msg:false})
        }
            
    }catch (error) {
            res.send("Single File Upload Fail")
    
    }

}

//! Get One Submission for Student Doc Get method
exports.GetOneDocumentID = (req, res) => {
    const did = req.params.id;

    DocumentUpload.findById(did).populate("submissionId").then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}