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
    const staffID = localStorage.getItem("staff")//get staff ID in localStorage
    useEffect(() => {
        GetAllSubmissionType();
    }, [])

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
        
        for(let i = 0; i<fileDate?.length; i++)
        {            
            data.append('images', fileDate[i])
        }


        console.log(fileDate)
        POST("api/submissiontype/multiple", data).then(() => {
            GetAllSubmissionType()
            alert("Files added");
            console.log("File Sent Successfull")
        }).catch((err) => {
            alert(err);
        })
    }

    //! Implement Get All Submission Function 
    const GetAllSubmissionType = () => {
        GET(`api/submissiontype/one/${props.match.params.id}`).then((data) => {
            console.log(data)
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

    // 
    // const UpdateOneSubmission = (e) => {
    //     e.preventDefault()

    //     const submission = {//set object , get all passing data in to one object
    //         submissionStartDate,
    //         submissionEndDate,
    //         submissionType,
    //         subject,
    //         description
    //     }

    //     PUT(`api/submissiontype/one/${props.match.params.id}`, submission).then((da) => {
    //         alert("Movie Updated")
    //         window.location.href = "/CreateSubmission"

    //     }).catch((err) => {
    //         console.log(err)
    //     })

    // }

    //! disable past dates input type date 
    const disableDates = () => {

        const today = new Date();//get the date 
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }
    return (
        <div className='container'>
            <div className='card mt-2'>
                <div className="row d-flex justify-content-center ">
                    <div className="col-6">
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
                                <select value={submissionType} onChange={(e) => { setSubmissionType(e.target.value) }} className="form-control" name="cars" id="cars">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>

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
                                <input className="form-control" type="file" name="images" onChange={fileChangeHandler} id="inputGroupFile04"  multiple />
                            </div>
                            <div className="">
                                <button className="btn btn-danger" type="submit" value="create" >Update</button>
                            </div>
                        </form>
                            <div className="form-group">
                                <i className="fa fa-file"></i>
                                Uploaded Document
                                {documents?(
                                    <>
                                    {documents.map((doc, key) => (
                                        < >
                                        <p key={key}>{doc.split("--")[1]}  : <a  href={"http://localhost:8070/" + doc} download="abc" >Download </a></p><br/>
                                        </>
                                    ))}
                                    </>
                                ):(
                                    <></>
                                )}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSubmission