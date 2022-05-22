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
      <table>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Allocated Marks</th>
          <th></th>
        </tr>
        {markingSchemes &&
          markingSchemes.map((markingscheme, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{markingscheme.name}</td>
              <td>{markingscheme.total}</td>
              <td>
                <Link to={`/markingscheme/view/${markingscheme._id}`}>
                  <button>View</button>
                </Link>
              </td>
            </tr>
          ))}
      </table>
      <br />
      <Link to={`/markingscheme/add`}>
        <button>Add Marking Scheme</button>
      </Link>
    </div>
  );
}

export default ViewAllMarkingSchemes;
