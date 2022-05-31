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
                      <Link to={'/AddSubmission/' + n._id}><button className="ml-3 btn btn-success">Add Submission</button></Link>                   
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllSubmission