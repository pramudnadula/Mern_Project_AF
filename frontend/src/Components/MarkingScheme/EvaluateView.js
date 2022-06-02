import React, { useEffect, useState } from "react";
import { GET } from "../../Helper/httpHelper";

function EvaluateView(props) {
  const [markingMarkingSchemes, setMarkingMarkingSchemes] = useState([]);
  const [group, setGroup] = useState("");

  useEffect(() => {
    GET(`api/evoluate/view/group/${props.match.params.id}`)
      .then((res) => {
        console.log(res);
        setMarkingMarkingSchemes(res);
      })
      .catch((err) => {
        console.log(err);
      });

    GET(`api/evoluate/group/${props.match.params.id}`)
      .then((res) => {
        console.log(res);
        setGroup(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h2>Group: {group.groupName} </h2>
      {console.log(markingMarkingSchemes)}
      {markingMarkingSchemes &&
        markingMarkingSchemes?.map((element, index) => (
          <div class="card text-center" key={index}>
            <div class="card-header">
              {element?.markingSchemeId.submissionType}
            </div>
            <div class="card-body">
              <h5 class="card-title">Total Marks: {element?.totalMarks}</h5>
              <p class="card-text">Remark: {element?.remark}</p>
              <a
                href={`http://localhost:1234/evaluate/view/${element._id}`}
                class="btn btn-primary"
              >
                View
              </a>
            </div>
            <div class="card-footer text-muted">
              <p>Marked By: {element?.marker}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default EvaluateView;
