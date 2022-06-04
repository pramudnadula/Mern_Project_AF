import React, { useEffect, useState } from "react";
import { GET } from "../../Helper/httpHelper";

function EvaluateResult(props) {
  const [markingScheme, setMarkingScheme] = useState();
  const [studentGroup, setStudentGroup] = useState();
  const [markingMarkingScheme, setMarkingMarkingScheme] = useState();

  useEffect(() => {
    GET(`api/evoluate/view/${props.match.params.id}`)
      .then((res) => {
        setMarkingMarkingScheme(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (markingMarkingScheme) {
    GET(`api/markingscheme/view/${markingMarkingScheme?.markingSchemeId}`)
      .then((res) => {
        setMarkingScheme(res);
      })
      .catch((err) => {
        console.log(err);
      });

    GET(`api/studentGroups/${markingMarkingScheme?.groupId}`)
      .then((res) => {
        setStudentGroup(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <br />
      <h1 class="text-center">View Result</h1>
      <br />
      <div className="row justify-content-center">
        <div className="col-6">
          <table className="table table-secondary table-bordered">
            <thead class="text-center">
              <tr>
                <th colSpan="3">
                  <h2 style={{ color: 'red' }}>{studentGroup?.groupName}</h2>
                </th>
              </tr>
              <tr>
                <th>MarkingScheme Name</th>
                <td colSpan="2" style={{ color: 'red' }}>{markingScheme?.name}</td>
              </tr>
              <tr>
                <th>Full Allocated Marks</th>
                <td colSpan="2" style={{ color: 'red' }}>{markingScheme?.fullAllocatedMarks}</td>
              </tr>
              <tr>
                <th>Feature</th>
                <th>Allocated Mark</th>
                <th>Given Mark</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {markingMarkingScheme?.criteriaMarks.map((element, index) => (
                <tr key={index}>
                  <td>{element.criterion}</td>
                  <td>{element.allocatedMark}</td>
                  <td>{element.givenMark}</td>
                </tr>
              ))}
            </tbody>
            <tfoot >
              <tr>
                <th colSpan="2">Total Given Marks:</th>
                <td class="text-center">{markingMarkingScheme?.totalMarks}</td>
              </tr>
              <tr>
                <th>Remark: </th>
                <td colSpan="2" class="text-center">{markingMarkingScheme?.remark}</td>
              </tr>
              <tr>
                <th>Marked By: </th>
                <td colSpan="2" class="text-center" style={{ color: 'red' }}>{markingMarkingScheme?.marker}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EvaluateResult;