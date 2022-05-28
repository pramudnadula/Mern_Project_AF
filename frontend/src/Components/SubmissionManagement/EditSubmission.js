import axios from 'axios'
import React, { useEffect, useState } from 'react'

function EditSubmission(props) {
    const [submissionStartDate, setSubmissionStartDate] = useState("")
    const [submissionEndDate, setSubmissionEndDate] = useState("")
    const [submissionType, setSubmissionType] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [allSubmission, setAllSubmission] = useState([])

    useEffect(() => {
        GetAllSubmissionType();
    }, [])

    //! Implement Get All Submission Function 
    const GetAllSubmissionType = () => {
        axios.get(`http://localhost:8070/api/submissiontype/${props.match.params.id}`).then((data) => {
            console.log(data.data)
            //set data 
            setSubmissionStartDate(data.data.submissionStartDate)
            setSubmissionEndDate(data.data.submissionEndDate)
            setSubmissionType(data.data.submissionType)
            setSubject(data.data.subject)
            setDescription(data.data.description)
        }).catch((err) => {

        })
    }

    //!Implement Update One Submission 
    const UpdateOneSubmission = (e) => {
        e.preventDefault()

        const submission = {//set object , get all passing data in to one object
            submissionStartDate,
            submissionEndDate,
            submissionType,
            subject,
            description
        }

        axios.put(`http://localhost:8070/api/submissiontype/${props.match.params.id}`, submission).then((da) => {
            alert("Movie Updated")
            window.location.href = "/CreateSubmission"

        }).catch((err) => {
            console.log(err)
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
    return (
        <div className='container'>
            <div className='card mt-2'>
                <div className="row d-flex justify-content-center ">
                    <div className="col-6">
                        <form onSubmit={UpdateOneSubmission} >
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

                            <div className="">
                                <button className="btn btn-danger" type="submit" value="create" >Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSubmission