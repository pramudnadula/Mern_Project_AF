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
    <div class="container">
      <br />
      <div className="row justify-content-center">
        <h1 class="text-center">Add Panel to Group</h1>
      </div>

      <br />
      <br />
      <div className="row justify-content-center">
        <div className="col-6">
          <table className="table table-striped table-bordered table-primary table-hover">
            <thead class="text-center">
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
                    <td class="text-center">
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
      </div>
    </div>
  )
}

export default AddPanel;