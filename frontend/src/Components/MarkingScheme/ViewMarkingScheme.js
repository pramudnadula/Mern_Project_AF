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
    <div className="container">

      <br />
      <h1 class="text-center">View Marking Scheme</h1>
      <br />
      <div className="row justify-content-center">
        <div className="col-6">
          <table className="table table-secondary table-bordered">
            <thead class="text-center">
              <tr>
                <th colSpan="2">
                  <h2 style={{ color: 'red' }}>{markingScheme?.name}</h2>
                </th>
              </tr>
              <tr>
                <th colSpan="2" >
                  <div>Submission Type : <span style={{ color: 'red' }}> {markingScheme?.submissionType}</span></div>


                </th>
              </tr>
              <tr>
                <th class="text-center">Feature</th>
                <th class="text-center">Allocated Mark</th>
              </tr>
            </thead>
            <tbody>
              {markingScheme &&
                markingScheme?.features.map((featuresElement, index) => (
                  <tr key={index}>
                    <td class="text-center">{featuresElement.criterion}</td>
                    <td class="text-center">{featuresElement.allocatedMark}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th class="text-center">Total Marks</th>
                <td class="text-center">{markingScheme?.fullAllocatedMarks}</td>
              </tr>
              <tr>
                <th colSpan="2" class="text-center">
                  <div>Created By :<span style={{ color: 'red' }}> {markingScheme?.creator}</span></div>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewMarkingScheme;