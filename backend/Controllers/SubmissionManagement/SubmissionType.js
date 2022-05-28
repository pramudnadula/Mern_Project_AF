const SubmissionType = require('../../Models/SubmissionManagement/SubmissionType');
//! Create (adding) Submission
exports.CreateSubmissionType = (req, res) => {
    const submissionType = new SubmissionType(req.body)

    submissionType.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "show allready Exists"
            })
        }
        else {
            res.json({ data })
        }
    })
}
//! Get All Submission
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


//! Delete One
exports.DeleteSubmissionType = async (req, res) => {
    let delid = req.params.id;
    try {
        await SubmissionType.findByIdAndDelete(delid);
        res.status(200).json({ message: "Deleted success"});
        console.log("deleted")
    } catch (err) {
        res.status(500).send({ status: "error in deleting data", error: err.message });
    }
}

//! Get One Submission
exports.GetOneSubmissionType = (req, res) => {
    let sid = req.params.id;

    SubmissionType.findById(sid).then((mov) => {
        res.json(mov);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}


//!Update One 
exports.UpdateOneSubmissionType = async (req, res) => {
    let sid = req.params.id;
    const {submissionStartDate, submissionEndDate, submissionType, subject,  description } = req.body;
    try {
        await SubmissionType.findOneAndUpdate({ _id: sid }, { submissionStartDate, submissionEndDate, submissionType, subject,  description}).then(data => {
            res.send({ status: "Submission updated" })
        }).catch(err => {

        })
    } catch (error) {
        res.status(500).send({ status: "error in updating data", error: error.message });
    }
}