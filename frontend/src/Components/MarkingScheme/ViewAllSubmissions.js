import React, { useEffect, useState } from 'react'
import { GET } from '../../Helper/httpHelper'
import { Link } from "react-router-dom";

function ViewAllSubmissions(props) {

  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    GET(`api/evoluate/submission/all`).then((res) => {
      console.log(res);
      setSubmissions(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <div className="container">
      <br />
      <h1 class="text-center">All Submissions</h1>
      <br />
      <table className="table table-bordered table-secondary table-striped table-hover">
        <thead class="text-center">
          <tr>
            <th>Submission Type</th>
            <th>Group Id</th>
            <th>Submission Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {submissions &&
            submissions.map((ob, index) => (
              <tr key={index}>
                <td>{ob.submissionId?.submissionType}</td>
                <td>{ob.groupId?.groupName}</td>
                <td>{ob?.submissionDate}</td>
                <td class="text-center">
                  <Link to="">
                    <button type="button" className="btn btn-secondary btn-sm">View</button>
                  </Link>
                </td>

              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewAllSubmissions;