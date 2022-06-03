import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GET } from '../../Helper/httpHelper'

function StaffAllocatedPanels(props) {

  const [panels, setPanels] = useState([]);
  const [addPanels, setAddPanels] = useState([]);

  useEffect(() => {
    GET(`api/panel/panels/user/${props.match.params.id}`).then((res) => {
      console.log(res);
      setPanels(res);
    }).catch((err) => {
      console.log(err);
    })

    GET(`api/panel/addpanel/user/${props.match.params.id}`).then((res) => {
      console.log(res);
      setAddPanels(res);
    }).catch((err) => {
      console.log(err);
    })


  }, [])

  return (
    <div>
      <h1>Allocated Panels</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {panels &&
            panels.map((panel, index) => (
              <tr key={index}>
                <td>{panel.panelName}</td>
                <td>{panel.position}</td>
                <td>
                  <Link to={`/panels/view/panel/${panel.panelId}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <h1>Blind Reviwer Groups</h1>
      <table>
        <thead>
          <tr>
            <th>
              Groups
            </th>
          </tr>
        </thead>
        <tbody>
          {addPanels &&
            addPanels.map((addpanel, index) => (
              <tr key={index}>
                <td>{addpanel.groupId.groupName}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
export default StaffAllocatedPanels;