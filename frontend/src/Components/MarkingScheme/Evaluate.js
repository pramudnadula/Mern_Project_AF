import React, { useEffect, useState } from "react";
import { GET, POST } from "../../Helper/httpHelper";

function Evaluate(props) {
  const [studentGroup, setStudentGroup] = useState();
  const [remark, setRemark] = useState();
  const [marker, setMarker] = useState();
  const [markingScheme, setMarkingScheme] = useState();
  const [criteriaMarks, setCriteriaMarks] = useState([]);

  useEffect(() => {
    GET(`api/markingscheme/view/6298761f68cc6cbdd3eafdea`)
      .then((res) => {
        console.log(res);
        setMarkingScheme(res);
        var arr = [];
        for (let i = 0; i < res.features.length; i++) {
          let newArray = { criterion: "", allocatedMark: "", givenMark: "" };

          console.log(res.features[i].criterion);
          console.log(res.features[i].allocatedMark);

          newArray.criterion = res.features[i].criterion;
          newArray.allocatedMark = res.features[i].allocatedMark;
          newArray.givenMark = "";
          console.log(newArray);

          arr.push(newArray);
        }
        console.log(criteriaMarks);
        setCriteriaMarks(arr);
      })
      .catch((err) => {
        console.log(err);
      });

    GET(`api/studentGroups/6298450f5ab932858fbd7346`)
      .then((res) => {
        setStudentGroup(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submit = (e) => {
    let total = 0;
    for (let i = 0; i < criteriaMarks.length; i++) {
      total += Number(criteriaMarks[i].givenMark);
    }
    console.log(total);
    const ob = {
      markingSchemeId: "6298761f68cc6cbdd3eafdea",
      groupId: "6298450f5ab932858fbd7346",
      criteriaMarks,
      totalMarks: total,
      remark,
      marker,
    };
    console.log(ob);

    POST("api/evoluate/", ob)
      .then((data) => {
        alert("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <th colSpan="3">
              <h3>Student Group: {studentGroup?.groupName}</h3>
            </th>
          </tr>
          <tr>
            <th>Feature</th>
            <th>Allocated Mark</th>
            <th>Given Marks</th>
          </tr>
        </thead>
        <tbody>
          {criteriaMarks &&
            criteriaMarks?.map((featuresElement, index) => (
              <tr key={index}>
                <td>{featuresElement?.criterion}</td>
                <td>{featuresElement?.allocatedMark}</td>
                <td>
                  <input
                    required
                    type="number"
                    name="givenMark"
                    min={0}
                    max={featuresElement?.allocatedMark}
                    onChange={(e) => {
                      featuresElement.givenMark = e.target.value;
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Remark</th>

            <td colSpan="2">
              <input
                name="remark"
                placeholder="Remark"
                required
                onChange={(e) => {
                  setRemark(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <th>Marked By:</th>

            <td colSpan="2">
              <input
                name="marker"
                placeholder="Marked By"
                required
                onChange={(e) => {
                  setMarker(e.target.value);
                }}
              />
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        onClick={(e) => {
          submit();
        }}
      >
        Save
      </button>
    </div>
  );
}

export default Evaluate;
