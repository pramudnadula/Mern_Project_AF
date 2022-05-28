import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewAllMarkingSchemes(props) {
  const [markingSchemes, setMarkingSchemes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/markingscheme/")
      .then((res) => {
        setMarkingSchemes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (

    <div>
      <h1>All Marking Schemes</h1>
      <table class="table table-bordered table-secondary table-striped table-hover">
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
                <td></td>
                <td>{markingscheme.fullAllocatedMarks}</td>
                <td>{markingscheme.creator}</td>
                <td>
                  <Link to={`/markingscheme/view/${markingscheme._id}`}>
                    <button type="button" class="btn btn-outline-dark btn-sm">View</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>

      </table>
      <br />
      <Link to={`/markingscheme/add`}>
        <button type="button" class="btn btn-secondary btn-sm">Add Marking Scheme</button>
      </Link>
    </div >
  );
}

export default ViewAllMarkingSchemes;
