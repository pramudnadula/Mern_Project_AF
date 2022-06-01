import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GET, POST } from '../../Helper/httpHelper'

function AddSubmission(props) {
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
        GET(`api/submissiontype/all/one/${props.match.params.id}`).then((data) => {
            console.log(data)
            // set data 
            setSubmissionStartDate(data.submissionStartDate)
            setSubmissionEndDate(data.submissionEndDate)
            setSubmissionType(data.submissionType)
            setSubject(data.subject)
            setDescription(data.description)
            setSid(data._id)
        }).catch((err) => {

        })

        const ob = {sid:props.match.params.id, gid:GroupId}
        POST(`api/document/documentOne`, ob).then((data) => {
            if(data.msg){
                setCheckDoc(true);
                setCheckOneDoc(data.oneDocument)
                console.log("true")
                console.log(data.oneDocument)
                GetAllSubmission();
            }
            else{
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
                                    {checkDoc?<>
                                    <p>{checkOneDoc?.documentName[0].split("--")[1]} : <a href={"http://localhost:8070/" + checkOneDoc?.documentName[0]} download="Documents\2022-05-30T16-49-52.057Z--wallpaperflare.com_wallpaper (8).jpg" >View </a></p><br/>

                                    <Link to={"/EditStudentSubmission/"+ checkOneDoc._id}><button className="form-control btn btn-warning mt-3" type="button" value="create" >Edit</button></Link>
                                    </>:<>
                                    <input className="form-control" type="file" name="image" onChange={fileChangeHandler} id="inputGroupFile04" required />
                                    <button className="form-control btn btn-success mt-3" type="submit" value="create" >Upload</button>
                                    </>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSubmission