import React, { useEffect, useState } from 'react'
import { GET } from '../../Helper/httpHelper'
import { Link } from "react-router-dom";


function ViewAllocatedSubmissions(props) {

  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    GET(`api/evoluate/submission/user/${props.match.params.id}`).then((res) => {
      console.log(res);
      setSubmissions(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <div className="container">
      <br />
      <h1 class="text-center">All Allocated Submissions</h1>
      <br />
      <table className="table table-bordered table-secondary table-striped table-hover">
        <thead class="text-center">
          <tr>
            <th>Submission Type</th>
            <th>Group Name</th>
            <th>Submission Date</th>
            <th>Document Name</th>
            <th colSpan="2">Action</th>

          </tr>
        </thead>
        <tbody>
          {console.log(submissions)}
          {submissions &&
            submissions.map((ob, index) => (
              <tr key={index}>

                <td>{ob.submissionId?.submissionType}</td>
                <td>{ob.groupId?.groupName}</td>
                <td>{ob?.submissionDate}</td>
                <td>{ob?.documentName[0]?.split("--")[1]}</td>
                <td class="text-center">
                <a className='btn btn-secondary btn-sm' href={"http://localhost:8070/" + ob?.documentName[0]} download="abc" >Download </a>    
                </td>
                <td class="text-center">
                  <Link to={`/evaluate/submission/${ob._id}`}>
                    <button type="button" className="btn btn-secondary btn-sm">Evaluate</button>
                  </Link>
                </td>

              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewAllocatedSubmissions;