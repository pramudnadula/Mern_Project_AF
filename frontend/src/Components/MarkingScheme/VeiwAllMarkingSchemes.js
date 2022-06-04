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
      <div className="container">
        <div className="row justify-content-center">
          <br />
          <br />
          <h1 class="text-center">All Marking Schemes</h1>
          <br />
          <table className="table table-bordered table-secondary table-striped table-hover">
            <thead class="text-center">
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
                    <td class="text-center">{markingscheme.fullAllocatedMarks}</td>
                    <td>{markingscheme.creator}</td>
                    <td class="text-center">
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
          <div class="text-center">
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

        </div>
      </div>
    </div>
  );
}

export default ViewAllMarkingSchemes;