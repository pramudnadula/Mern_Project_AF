import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DELETE, GET, POST } from '../../Helper/httpHelper'

function AllSubmission() {
  const [allSubmission, setAllSubmission] = useState([])

  useEffect(() => {
    GetAllSubmission();
  }, [])

  //! Implement Get All Submission Function 
  const GetAllSubmission = () => {
    GET('api/submissiontype/all').then((data) => {
      setAllSubmission(data)
      console.log(data)
    }).catch((err) => {

    })
  }


  return (
    <div className='container-fluid '>
      <div className='card m-2'>
        <div className="row d-flex justify-content-center ">
          <div className="col">

            <div className="container">
              <div className="row">
                {allSubmission.map((n, i) => (

                  <div key={i} className="col-sm-4">
                    
                      <div className="card bg-light " style={{ height:'100%'}}>
                        <div className="card-header" >
                          <div ><b>Start date :</b> {n.submissionStartDate}</div>
                          <div ><b>End date :</b> {n.submissionEndDate}</div>
                        </div>
                        <div className="card-body" >
                          <h5 className="card-title" ><b>Subject :</b> {n.subject}</h5>
                          <div className="card-text" >
                              <b>Type :</b> {n.submissionType}<br/>
                              <b>Description :</b> {n.description}
                          </div>
                        </div>
                        <Link to={'/AddSubmission/' + n._id}><button className="m-2 btn btn-success">Add Submission</button></Link>
                      </div>

                    
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllSubmission