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
          <div className="card text-center" key={index}>
            <div className="card-header">
              {element?.markingSchemeId.submissionType}
            </div>
            <div className="card-body">
              <h5 className="card-title">Total Marks: {element?.totalMarks}</h5>
              <p className="card-text">Remark: {element?.remark}</p>
              <a
                href={`http://localhost:1234/evaluate/view/${element._id}`}
                className="btn btn-primary"
              >
                View
              </a>
            </div>
            <div className="card-footer text-muted">
              <p>Marked By: {element?.marker}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default EvaluateView;
