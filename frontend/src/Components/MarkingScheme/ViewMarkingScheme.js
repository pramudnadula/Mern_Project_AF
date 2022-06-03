import React, { useEffect, useState } from "react";
import { GET } from "../../Helper/httpHelper";

function ViewMarkingScheme(props) {
  const [markingScheme, setMarkingScheme] = useState();
  useEffect(() => {
    GET(`api/markingscheme/view/${props.match.params.id}`)
      .then((res) => {
        setMarkingScheme(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <table className="table table-secondary table-bordered">
        <thead>
          <tr>
            <th colSpan="2">
              <h2>{markingScheme?.name}</h2>
            </th>
          </tr>
          <tr>
            <th colSpan="2">
              Submission Type:{markingScheme?.submissionType}{" "}
            </th>
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
                <td>{featuresElement.criterion}</td>
                <td>{featuresElement.allocatedMark}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total Marks</th>
            <td>{markingScheme?.fullAllocatedMarks}</td>
          </tr>
          <tr>
            <th colSpan="2">Created By: {markingScheme?.creator}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ViewMarkingScheme;
