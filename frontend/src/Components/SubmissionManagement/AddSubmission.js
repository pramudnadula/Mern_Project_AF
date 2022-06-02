import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DELETE, GET, POST } from '../../Helper/httpHelper'

function AddSubmission(props) {
    const [submissionStartDate, setSubmissionStartDate] = useState("")
    const [submissionEndDate, setSubmissionEndDate] = useState("")
    const [submissionType, setSubmissionType] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [sid, setSid] = useState("")
    const [checkDoc, setCheckDoc] = useState(false)
    const [checkOneDoc, setCheckOneDoc] = useState("")
    const [document, setDocument] = useState([])

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
        GET(`api/submissiontype/all/one/${props.match.params.id}`).then((data) => {
            console.log(data)
            // set data 
            setSubmissionStartDate(data.submissionStartDate)
            setSubmissionEndDate(data.submissionEndDate)
            setSubmissionType(data.submissionType)
            setSubject(data.subject)
            setDescription(data.description)
            setDocument(data.documentName)
            setSid(data._id)
        }).catch((err) => {

        })

        const ob = { sid: props.match.params.id, gid: GroupId }
        POST(`api/document/documentOne`, ob).then((data) => {
            if (data.msg) {
                setCheckDoc(true);
                setCheckOneDoc(data.oneDocument)
                console.log("true")
                console.log(data.oneDocument)
                console.log(data.oneDocument._id)
                GetAllSubmission();
            }
            else {
                setCheckDoc(false)
                console.log("false")

            }
        }).catch((err) => {
            alert(err);
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

        data.append("sDate", SubmissionDate)
        data.append("gid", GroupId)
        data.append("sid", SubmissionId)
        data.append('image', fileDate)


        POST("api/document/single", data).then(() => {
            GetAllSubmission();
            alert("Submission added");
            console.log("File Sent Successfull")
        }).catch((err) => {
            alert(err);
        })
    }

    //! Delete One Submition
    const DeleteSubmissionType = (id) => {
        DELETE(`api/document/documentOne/delete/${id}`).then((dat) => {
            GetAllSubmission();//call fuction again
            alert("submission Deleted");
        }).catch((err) => {
            console.log(err)
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
                                    {checkDoc ?
                                        <>
                                        </> : <>
                                            <input className="form-control" type="file" name="image" onChange={fileChangeHandler} accept = "application/pdf,.csv,.doc,.docx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  required />
                                            <button className="form-control btn btn-success mt-3" type="submit" value="create" >Upload</button>
                                        </>}
                                </div>
                            </form>
                            {checkDoc ? <>
                                <p>{checkOneDoc?.documentName[0].split("--")[1]} : <a href={"http://localhost:8070/" + checkOneDoc?.documentName[0]} download="abc" >View </a></p>
                                <Link to={"/EditStudentSubmission/" + checkOneDoc._id}><button style={{ marginRight: '.5rem' }} className=" btn btn-warning mr-3" type="button" value="create" >Edit</button></Link>
                                <button className="btn btn-danger" style={{ marginRight: '.5rem' }} onClick={() => { if (window.confirm('Are you sure you wish to delete this Submission?')) DeleteSubmissionType(checkOneDoc._id) }} disabled={GroupId !== checkOneDoc.groupId} > Remove</button>
                            </> : <>
                            </>}

                        </div>
                        <div className="col">
                            <h3 > Presentation Templates </h3>

                            <div >{document.map((doc, key) => (
                                <p>{doc?.split("--")[1]} :  <a href={"http://localhost:8070/" + doc} download="abc" >Download </a></p>

                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSubmission