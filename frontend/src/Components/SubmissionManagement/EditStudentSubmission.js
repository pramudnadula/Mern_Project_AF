import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GET, POST } from '../../Helper/httpHelper'

function EditStudentSubmission(props) {
    const [submissionStartDate, setSubmissionStartDate] = useState("")
    const [submissionEndDate, setSubmissionEndDate] = useState("")
    const [submissionType, setSubmissionType] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [sid, setSid] = useState("")
    const [checkDoc, setCheckDoc] = useState(false)
    const [checkOneDoc, setCheckOneDoc] = useState("")

    const [fileDate, setFileDate] = useState()
    const GroupId = localStorage?.getItem('gid')
    const SubmissionId = sid;
    const SubmissionDate = new Date();
    console.log(SubmissionDate)
    useEffect(() => {
        GetAllSubmission();
    }, [])

    //! Implement Get All Submission Function 
    const GetAllSubmission = () => {
        GET(`api/document/documentOne/one/${props.match.params.id}`).then((data) => {
            console.log(data)
            // set data 
            setSubmissionStartDate(data.submissionId.submissionEndDate)
            setSubmissionEndDate(data.submissionId.submissionEndDate)
            setSubmissionType(data.submissionId.submissionType)
            setSubject(data.submissionId.subject)
            setDescription(data.submissionId.description)
            setSid(data.submissionId)
            setCheckOneDoc(data.documentName)
        }).catch((err) => {

        })
    }



    const fileChangeHandler = (e) => {
        setFileDate(e.target.files[0]);
    }

    //! Upload Document and Passing Date
    const onSubmitHandler = (e) => {
        e.preventDefault()

        //Handle File Data from the state Before Sending
        const data = new FormData();
        data.append('did', props.match.params.id) 
        data.append("sDate", SubmissionDate)
        // data.append("gid", GroupId)
        // data.append("sid", SubmissionId)
        data.append('image', fileDate)


        POST("api/document/single", data).then(() => {
            GetAllSubmission();
            alert("Submission added");
            window.location.href = `/AddSubmission/${sid._id}`
            console.log("File Sent Successfull")
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <>
            <div className='container'>
                <div className='card mt-2'>
                    <div className="row d-flex justify-content-center ">
                        <div className="col-6">
                            <form >
                                <div className="form-control"><i className="fa fa-calendar"></i> Submission Start date : {submissionStartDate}  </div>
                                <div className="form-control"><i className="fa fa-calendar"></i> Submission End date : {submissionEndDate} </div>
                                <div className="form-control"><i className="fa fa-book"></i> Submission Type : {submissionType}</div>
                                <div className="form-control"><i className="fa fa-book"></i> Subject : {subject}</div>
                                <div className="form-control"><i className="fa fa-calendar"></i> Description : {description}</div>
                            </form>
                            <form onSubmit={onSubmitHandler}>
                                <div className="form-group pt-3">
                                   
                                    <p>{checkOneDoc[0]} : <a href={"http://localhost:8070/" + checkOneDoc[0]} download="d" > Download </a><br/></p>

                                    {/* <Link to={"/EditStudentSubmission/"+ checkOneDoc._id}><button className="form-control btn btn-warning mt-3" type="button" value="create" >Edit</button></Link>
                                     */}
                                    <input className="form-control" type="file" name="image" onChange={fileChangeHandler} id="inputGroupFile04" required />
                                    <button className="form-control btn btn-success mt-3" type="submit" value="create" >Upload</button>
                                   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditStudentSubmission