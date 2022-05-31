import axios from 'axios';
import React, { useState } from 'react'
import { POST } from '../../Helper/httpHelper'

function UploadDocument() {

  const [fileDate, setFileDate] = useState()
  const GroupId = localStorage?.getItem('gid')
  const SubmissionId = "629108695e986293cff3e0c0"

  const fileChangeHandler = (e) => {
    setFileDate(e.target.files[0]);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()

    //Handle File Data from the state Before Sending
    const data = new FormData();

    data.append("gid", GroupId)
    data.append("sid", SubmissionId)
    data.append('image', fileDate)

    console.log(data)
    POST("api/document/single", data).then(() => {
      alert("movie added");
      console.log("File Sent Successfull")
    }).catch((err) => {
      alert(err);
    })
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="field has-addons m-3 pt-3">
        <div className="control is-expanded">
          <div className="is-fullwidth">
            <input className="input" type="file" name="image" onChange={fileChangeHandler} id="inputGroupFile04" required />
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
    </form>
  )
}

export default UploadDocument