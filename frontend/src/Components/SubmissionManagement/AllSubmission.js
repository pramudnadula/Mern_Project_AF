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
    <div className='container'>
      <div className='card mt-2'>
        <div className="row d-flex justify-content-center ">
          <div className="col">

            <div className="container">
              <div className="row">
                {allSubmission.map((n, i) => (

                  <div key={i} className="col-sm-4">
                    
                      <div className="card bg-light mb-3" style={{textDecoration:'none !important'}}>
                        <div className="card-header" style={{textDecoration:'none !important'}}>
                          <div style={{textDecoration:'none !important'}}><b>Start date :</b> {n.submissionStartDate}</div>
                          <div style={{textDecoration:'none !important'}}><b>End date :</b> {n.submissionEndDate}</div>
                        </div>
                        <div className="card-body" style={{textDecoration:'none !important'}}>
                          <h5 className="card-title" style={{textDecoration:'none !important'}}><b>Subject :</b> {n.subject}</h5>
                          <div className="card-text" style={{textDecoration:'none !important'}}>
                              <b>Type :</b> {n.submissionType}<br/>
                              <b>Description :</b> {n.description}
                          </div>
                        <Link to={'/AddSubmission/' + n._id}><button className="ml-3 btn btn-success">Add Submission</button></Link>
                        </div>
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