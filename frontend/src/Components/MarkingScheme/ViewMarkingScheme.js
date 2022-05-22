import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewMarkingScheme(props) {
  const [markingScheme, setMarkingScheme] = useState();
  useEffect(() => {
    axios
      .get(
        `http://localhost:8070/api/markingscheme/view/${props.match.params.id}`
      )
      .then((res) => {
        setMarkingScheme(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <h2>{markingScheme?.name}</h2>
          </tr>
          <tr>
            <th>Feature</th>
            <th>Allocated Mark</th>
          </tr>
        </thead>
        <tbody>
          {markingScheme &&
            markingScheme?.features.map((featuresElement, index) => (
              <tr key={index}>
                <td>{featuresElement.feature}</td>
                <td>{featuresElement.marks}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total Marks</th>
            <td>{markingScheme?.total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ViewMarkingScheme;
