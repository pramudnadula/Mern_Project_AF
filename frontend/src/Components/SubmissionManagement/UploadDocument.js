import axios from 'axios';
import React, { useState } from 'react'

function UploadDocument() {

  const [fileDate, setFileDate] = useState()

  const fileChangeHandler = (e) => {
    setFileDate(e.target.files[0]);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()

    //Handle File Data from the state Before Sending
    const data = new FormData();

    data.append('image', fileDate)

    // axios.post("http://localhost:8070/single", data).then(() => {
    //   alert("movie added");
    // }).catch((err) => {
    //   alert(err);
    // })
    fetch("http://localhost:8070/api/document/single", {
      method: "POST",
      mode: 'no-cors',
      body: data,

    })
      .then(() => {
        console.log("File Sent Successfull")
      })
      .catch((err) => {
        console.log(err.message)
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