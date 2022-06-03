import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET } from "../../Helper/httpHelper";

function ViewAllMarkingSchemes(props) {
  const [markingSchemes, setMarkingSchemes] = useState([]);

  useEffect(() => {
    GET("api/markingscheme/")
      .then((res) => {
        console.log(res);
        setMarkingSchemes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>All Marking Schemes</h1>
      <table className="table table-bordered table-secondary table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Submission Type</th>
            <th>Allocated Marks</th>
            <th>Creator</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {markingSchemes &&
            markingSchemes.map((markingscheme, index) => (
              <tr key={index}>
                <td>{markingscheme.name}</td>
                <td>{markingscheme.submissionType}</td>
                <td>{markingscheme.fullAllocatedMarks}</td>
                <td>{markingscheme.creator}</td>
                <td>
                  <Link to={`/markingscheme/view/${markingscheme._id}`}>
                    <button type="button" className="btn btn-outline-dark btn-sm">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      {localStorage.getItem("admin-token") ? (
        <>
          <Link to={`/markingscheme/add`}>
            <button type="button" className="btn btn-secondary btn-sm">
              Add Marking Scheme
            </button>
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ViewAllMarkingSchemes;
