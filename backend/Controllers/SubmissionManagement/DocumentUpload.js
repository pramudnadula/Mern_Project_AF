const router = require('express').Router();

//!Single File Uploading
exports.UploadFileSingle = (req, res)=>{//pass route in middlware  //! upload.single mean pass the single file and 'image' is a key value
    console.log(req.file);
    res.send("Single File Upload Success")
}
//!Multiple File Uploading
exports.UploadFileMultiple = (req, res)=>{//pass route in middlware  //! upload.array mean pass the multiple file and 'images' is a key value and ,5 mean  maximum file count
    console.log(req.files);
    res.send("Multiple File Upload Success")
}