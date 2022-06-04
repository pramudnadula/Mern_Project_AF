import { message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GET, POST, PUT } from '../../Helper/httpHelper'

function EditSubmission(props) {
    const [submissionStartDate, setSubmissionStartDate] = useState("")
    const [submissionEndDate, setSubmissionEndDate] = useState("")
    const [submissionType, setSubmissionType] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [documents, setDocuments] = useState([])
    const staffID = localStorage.getItem("admin")//get staff ID in localStorage
    const [submissions, setSubmissions] = useState([]);
    useEffect(() => {
        GetAllSubmissionType();
        getDocumentSubmission();
    }, [])
    //get document in each submission type
    const getDocumentSubmission = () => {
     GET(`api/evoluate/submission/all`).then((res) => {
      //console.log(res);
      setSubmissions(res);
     }).catch((err) => {
      console.log(err);
     })
    }
    const [fileDate, setFileDate] = useState()

    const fileChangeHandler = (e) => {
        setFileDate(e.target.files);
    }

    //!Implement post method using Update One Submission 
    const onSubmitHandler = (e) => {
        e.preventDefault()

        //Handle File Data from the state Before Sending
        const data = new FormData();
        data.append('ssid', props.match.params.id)
        data.append('staffID', staffID)
        data.append('submissionStartDate', submissionStartDate)
        data.append('submissionEndDate', submissionEndDate)
        data.append('submissionType', submissionType)
        data.append('subject', subject)
        data.append('description', description)

        for (let i = 0; i < fileDate?.length; i++) {
            data.append('images', fileDate[i])
        }


        console.log(fileDate)
        POST("api/submissiontype/multiple", data).then(() => {
            GetAllSubmissionType()
            message.success('Submission Edit Successfull');
            console.log("File Sent Successfull")
        }).catch((err) => {
            alert(err);
        })
    }

    //! Implement Get All Submission Function 
    const GetAllSubmissionType = () => {
        GET(`api/submissiontype/one/${props.match.params.id}`).then((data) => {
            //console.log(data)
            //set data 
            setSubmissionStartDate(data.submissionStartDate)
            setSubmissionEndDate(data.submissionEndDate)
            setSubmissionType(data.submissionType)
            setSubject(data.subject)
            setDescription(data.description)
            setDocuments(data.documentName)
        }).catch((err) => {

        })
    }


    //! disable past dates input type date 
    const disableDates = () => {

        const today = new Date();//get the date 
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }
    if ((localStorage.getItem("admin-token") || localStorage.getItem("staff-token")) === null) {
        localStorage.clear()
        window.location = "/";
        return <></>
    }
    return (
        <div className='container'>
            <div className='mt-2'>
                <div className="row d-flex justify-content-center ">
                    <div className="col-6 card">
                        {localStorage.getItem("admin-token") ? (
                            <form onSubmit={onSubmitHandler} >
                                {/* <input type="date" className="input" onChange={(e) => { setdate(e.target.value) }} required /> */}
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Submission Start date
                                    <input type="date" min={disableDates()} value={submissionStartDate} onChange={(e) => { setSubmissionStartDate(e.target.value) }} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Submission End date
                                    <input type="date" min={disableDates()} value={submissionEndDate} onChange={(e) => { setSubmissionEndDate(e.target.value) }} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Submission Type
                                    <input type="text" value={submissionType} onChange={(e) => { setSubmissionType(e.target.value) }} className="form-control" required />


                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Subject
                                    <input type="text" value={subject} onChange={(e) => { setSubject(e.target.value) }} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Description
                                    <textarea type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Description
                                    <input className="form-control" type="file" name="images" onChange={fileChangeHandler} accept="application/pdf,.csv,.doc,.docx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple />
                                </div>
                                <div className="">
                                    <button className="btn btn-danger" type="submit" value="create" >Update</button>
                                </div>
                            </form>
                        ) : (
                            <></>
                        )}

                        {localStorage.getItem("staff-token") ? (
                            <form  >

                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Submission Start date
                                    <input type="date" value={submissionStartDate} className="form-control" readOnly />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Submission End date
                                    <input type="date" value={submissionEndDate} className="form-control" readOnly />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Submission Type
                                    <input type="text" value={submissionType} className="form-control" readOnly />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Subject
                                    <input type="text" value={subject} className="form-control" readOnly />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Description
                                    <textarea type="text" value={description} className="form-control" readOnly />
                                </div>
                            </form>
                        ) : (
                            <></>
                        )}
                        <br/>
                        <div className="form-group">
                            <i className="fa fa-file"></i>
                            Uploaded Template Document
                            {documents ? (
                                <>
                                    {documents.map((doc, f) => (
                                        < >
                                            <p key={f}>{doc.split("--")[1]}  : <a href={"http://localhost:8070/" + doc} download="abc" className='btn btn-danger'>Download </a></p>
                                        </>
                                    ))}
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className='col-6 card'>
                        <div className=' m-1'>
                            Student Submissions in {subject}
                            <div className='card'>
                                {submissions.map((document, i)=>(
                                    <>
                                    {/* {console.log(document.submissionId?._id)} */}
                                    {(document.submissionId?._id == props.match.params.id)?(
                                    <>
                                    {/* {console.log(props.match.params.id)} */}
                                        <p key={i}>{document?.documentName[0]?.split("--")[1]} : <a href={"http://localhost:8070/" + document?.documentName[0]} download="abc">Download </a></p>
                                    </>
                                    ):(
                                    <></>
                                    )}
                                    </>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSubmission