import axios from 'axios';
import React, { useEffect, useState } from 'react';


function EvaluateResult(props) {
  const [markingScheme, setMarkingScheme] = useState();
  const [studentGroup, setStudentGroup] = useState();
  const [markingMarkingScheme, setMarkingMarkingScheme] = useState();


  useEffect(() => {

    axios
      .get(`http://localhost:8070/api/evoluate/view/${props.match.params.id}`)
      .then((res) => {
        setMarkingMarkingScheme(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (markingMarkingScheme) {
    axios
      .get(
        `http://localhost:8070/api/markingscheme/view/${markingMarkingScheme?.markingSchemeId}`
      )
      .then((res) => {
        setMarkingScheme(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:8070/api/studentGroups/${markingMarkingScheme?.groupId}`)
      .then((res) => {
        setStudentGroup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th><h2>{markingScheme?.name}</h2></th></tr>
          <tr>
            <th>Feature</th>
            <th>Allocated Mark</th>
          </tr>
        </thead>
        <tbody>

          {markingScheme?.features.map((markingSchemeElement, index) => (
            <tr>
              <td >{markingSchemeElement.feature}</td>
              <td >{markingSchemeElement.marks}</td>
            </tr>
          ))}




        </tbody>
        <tfoot>
          <tr>
            <th>Total Marks</th>
            <td>{markingScheme?.total}</td>
          </tr>
          <tr>
            <th>Remark</th>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
          <tr>
            <th>Given Marks</th>
          </tr>
        </thead>
        <tbody>
          {markingMarkingScheme?.individualMark.map((markingMarkingSchemeElement, index) => (
            <tr key={index}>
              <td>{markingMarkingSchemeElement}</td>
            </tr>
          ))}



        </tbody>
        <tfoot>
          <tr>
            <td>{markingMarkingScheme?.totalMarks}</td>
          </tr>
          <tr>
            {markingMarkingScheme?.remark}
          </tr>
        </tfoot>
      </table>
      <h2>Group Details</h2>
      Group Name: {studentGroup?.groupName} <br />
      Topic: {studentGroup?.topic} <br />
    </div >
  );
}

export default EvaluateResult;
