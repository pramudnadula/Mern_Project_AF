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
    <div>
      <table class="table table-secondary table-bordered">
        <thead>
          <tr>
            <th colSpan="3">
              <h2>{markingScheme?.name}</h2>
            </th>
          </tr>
          <tr>
            <th>Group Name: </th>
            <td colSpan="2">{studentGroup?.groupName}</td>
          </tr>
          <tr>
            <th>Full Allocated Marks:</th>
            <td colSpan="2">{markingScheme?.fullAllocatedMarks}</td>
          </tr>
          <tr>
            <th>Feature</th>
            <th>Allocated Mark</th>
            <th>Given Mark</th>
          </tr>
        </thead>
        <tbody>
          {markingMarkingScheme?.criteriaMarks.map((element, index) => (
            <tr key={index}>
              <td>{element.criterion}</td>
              <td>{element.allocatedMark}</td>
              <td>{element.givenMark}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total Given Marks:</th>
            <td colSpan="2">{markingMarkingScheme?.totalMarks}</td>
          </tr>
          <tr>
            <th>Remark: </th>
            <td colSpan="2">{markingMarkingScheme?.remark}</td>
          </tr>
          <tr>
            <th>Marked By: </th>
            <td colSpan="2">{markingMarkingScheme?.marker}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default EvaluateResult;
