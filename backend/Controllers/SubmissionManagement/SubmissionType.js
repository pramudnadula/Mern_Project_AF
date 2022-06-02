const SubmissionType = require('../../Models/SubmissionManagement/SubmissionType');
//! Create (adding) Submission
//!Multiple File Uploading
exports.UploadFileMultiple = async (req, res) => {//pass route in middlware  //! upload.array mean pass the multiple file and 'images' is a key value and ,5 mean  maximum file count

    console.log(req.body.submissionStartDate)
    console.log(req.body.submissionEndDate)
    console.log(req.body.submissionType)
    console.log(req.body.subject)
    console.log(req.body.description)
    console.log(req.body.staffID)
    console.log(req.files);
    try {
        if (req.body.ssid) {
            const fileNameArray = req.files.map((file) => {
                return file.path;
            })
            console.log(fileNameArray)
            const findDoc = await SubmissionType.findById({ _id: req.body.ssid })

            findDoc.submissionStartDate = req.body.submissionStartDate
            if (req.files.length > 0) {
                findDoc.documentName = fileNameArray
            }
            findDoc.submissionEndDate = req.body.submissionEndDate
            findDoc.submissionType = req.body.submissionType
            findDoc.subject = req.body.subject
            findDoc.description = req.body.description
            findDoc.staffID = req.body.staffID


            await findDoc.save();
            res.send("Single File Upload Success")
        } else {
            const fileNameArray = req.files.map((file) => {
                return file.path;
            })
            console.log("fileNameAfghfghjghjhgfjhgjhgjhgjghjghjhgjhgjrray")

            console.log(fileNameArray)
            const doc = new SubmissionType({
                submissionStartDate : req.body.submissionStartDate,
                submissionEndDate : req.body.submissionEndDate,
                submissionType : req.body.submissionType,
                subject : req.body.subject,
                description : req.body.description,
                staffID : req.body.staffID,
                documentName : fileNameArray,  
            })

            await doc.save();
            res.send("Single File Upload Success")

        }
    } catch (error) {
        res.send("Single File Upload Fail")
    }

}

// exports.CreateSubmissionType = (req, res) => {

// }
//! Get All Submission in Supervisor
exports.GetAllSubmissionType = (req, res) => {
    SubmissionType.find().populate("staffID").exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
}

//! Get All Submission in Student
exports.GetAllSubmission = (req, res) => {
    SubmissionType.find({
    }, {
        staffID: 0,
        __v: 0,
    }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
}

//! Delete One submission in supervisor side (remove part)
exports.DeleteSubmissionType = async (req, res) => {
    let delid = req.params.id;
    try {
        await SubmissionType.findByIdAndDelete(delid);
        res.status(200).json({ message: "Deleted success" });
        console.log("deleted")
    } catch (err) {
        res.status(500).send({ status: "error in deleting data", error: err.message });
    }
}

//! Get One Submission for Supervior
exports.GetOneSubmissionType = (req, res) => {
    let sid = req.params.id;

    SubmissionType.findById(sid).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}

//! Get One Submission for Student
exports.GetOneSubmission = (req, res) => {
    let aid = req.params.id;

    SubmissionType.findById(aid, {
        staffID: 0,
        __v: 0,
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })
}

// //!Update One 
// exports.UpdateOneSubmissionType = async (req, res) => {
//     let sid = req.params.id;
//     const { submissionStartDate, submissionEndDate, submissionType, subject, description } = req.body;
//     try {
//         await SubmissionType.findOneAndUpdate({ _id: sid }, { submissionStartDate, submissionEndDate, submissionType, subject, description }).then(data => {
//             res.send({ status: "Submission updated" })
//         }).catch(err => {

//         })
//     } catch (error) {
//         res.status(500).send({ status: "error in updating data", error: error.message });
//     }
// }