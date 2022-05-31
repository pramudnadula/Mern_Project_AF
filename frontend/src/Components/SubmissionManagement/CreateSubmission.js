import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DELETE, GET, POST } from '../../Helper/httpHelper'
function CreateSubmission() {
    const [submissionStartDate, setSubmissionStartDate] = useState("")
    const [submissionEndDate, setSubmissionEndDate] = useState("")
    const [submissionType, setSubmissionType] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [allSubmission, setAllSubmission] = useState([])
    const staffID = localStorage.getItem("staff")//get staff ID in localStorage

    useEffect(() => {
        GetAllSubmissionType();
    }, [])

    const [fileDate, setFileDate] = useState()

    const fileChangeHandler = (e) => {
        setFileDate(e.target.files);
    }

    //! Implement adding Submission Function 
    const onSubmitHandler = (e) => {
        e.preventDefault()
        //Handle File Data from the state Before Sending
        const data = new FormData();
         
        data.append('staffID', staffID)
        data.append('submissionStartDate', submissionStartDate)
        data.append('submissionEndDate', submissionEndDate)
        data.append('submissionType', submissionType)
        data.append('subject', subject)
        data.append('description', description)
        
        for(let i = 0; i<fileDate.length; i++)
        {            
            data.append('images', fileDate[i])
        }

        console.log(fileDate)
        POST("api/submissiontype/multiple", data).then(() => {
            alert("Files added");
            GetAllSubmissionType();
            console.log("File Sent Successfull")
        }).catch((err) => {
            alert(err);
        })
    }

    //! Implement Get All Submission Function 
    const GetAllSubmissionType = () => {
        GET('api/submissiontype/').then((data) => {
            setAllSubmission(data)
            console.log(data)
        }).catch((err) => {

        })
    }

    //! Delete One Submition
    const DeleteSubmissionType = (id) => {
        DELETE(`api/submissiontype/one/${id}`).then((dat) => {
            GetAllSubmissionType();//call fuction again
            alert("submission Deleted");
        }).catch((err) => {
            console.log(err)
        })


    }

    //! disable past dates input type date 
    const disableDates = () => {

        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    return (
        <>
            {/* <form onSubmit={onSubmitHandler}>
                <div className="field has-addons m-3 pt-3">
                    <div className="control is-expanded">
                        <div className="is-fullwidth">
                            <input className="input" type="file" name="images" onChange={fileChangeHandler} id="inputGroupFile04" required multiple />
                        </div>
                    </div>
                    <div className="button control is-static">
                        <span className="icon is-left">
                            <i className="fas fa-upload"></i>
                        </span>
                        <div type="submit" className=" is-primary is-static mr-3 pr-1">Choose a file…</div>
                    </div>
                </div>
                <div className=" ">
                    <div className="">
                        <button className="button is-danger  " type="submit" value="create" >Upload</button>
                    </div>
                </div>
            </form> */}
            <div className='container'>
                <div className='card mt-2'>
                    <div className="row d-flex justify-content-center ">
                        <div className="col-6">
                            <form onSubmit={onSubmitHandler}>
                                {/* <input type="date" className="input" onChange={(e) => { setdate(e.target.value) }} required /> */}
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Submission Start date
                                    <input type="date" min={disableDates()} onChange={(e) => { setSubmissionStartDate(e.target.value) }} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Submission End date
                                    <input type="date" min={disableDates()} onChange={(e) => { setSubmissionEndDate(e.target.value) }} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Submission Type
                                    <select onChange={(e) => { setSubmissionType(e.target.value) }} className="form-control" name="cars" id="cars">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>

                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Subject
                                    <input type="text" onChange={(e) => { setSubject(e.target.value) }} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Description
                                    <textarea type="text" onChange={(e) => { setDescription(e.target.value) }} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-calendar"></i>
                                    Description
                                    <input className="form-control" type="file" name="images" onChange={fileChangeHandler} id="inputGroupFile04" required multiple />
                                </div>
                                <div className="">
                                    <button className="btn btn-danger" type="submit" value="create" >Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='card mt-2'>
                    <div className="row d-flex justify-content-center ">
                        <div className="col">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Start date</th>
                                        <th>End date</th>
                                        <th>Type</th>
                                        <th>Subject</th>
                                        <th>Description</th>
                                        <th style={{ width: '173px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allSubmission.map((n, i) => (
                                        <tr key={i}>
                                            <td>{n.submissionStartDate}</td>
                                            <td>{n.submissionEndDate}</td>
                                            <td>{n.submissionType}</td>
                                            <td>{n.subject}</td>
                                            <td>{n.description}</td>
                                            <td>
                                                {(staffID == n.staffID?._id) ? (<>
                                                    <button className="btn btn-danger" style={{ marginRight: '.5rem' }} onClick={() => { if (window.confirm('Are you sure you wish to delete this Submission?')) DeleteSubmissionType(n._id) }} disabled={staffID !== n.staffID._id} > Remove</button>
                                                    <Link to={'/editSubmission/' + n._id}><button className="ml-3 btn btn-info" disabled={staffID !== n.staffID?._id} > edit</button></Link>
                                                </>) : (<>
                                                    <button className="ml-3 btn btn-success" disabled  > Other Supervisor </button>
                                                </>)
                                                }
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateSubmission