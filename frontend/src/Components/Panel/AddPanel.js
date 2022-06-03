import React, { useEffect, useState } from 'react';
import { GET } from '../../Helper/httpHelper';
import { Link } from "react-router-dom";

function AddPanel(props) {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    GET('api/panel/notadded').then((res) => {
      console.log(res);
      setGroups(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Add Panel</th>
          </tr>
        </thead>
        <tbody>
          {groups &&
            groups.map((group, index) => (
              <tr key={index}>
                <td>{group.groupName}</td>
                <td>
                  <Link to={`/panels/add/group/${group.groupId}`}>
                    <button type="button" className="btn btn-secondary btn-sm">
                      Add
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default AddPanel;