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
    <div className="container">
      <br />
      <h1 class="text-center">
        Allocated Panels
      </h1>
      <br />
      <div className="row justify-content-center">
        <div className="col-8">
          <table className="table table-bordered table-secondary table-striped table-hover">
            <thead class="text-center">
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
                    <td class="text-center">
                      <Link to={`/panels/view/panel/${panel.panelId}`}>
                        <button type="button" className="btn btn-secondary btn-sm">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      </div>

      <br />
      <br />
      <br />
      <h1 class="text-center">
        Allocated Blind Reviwer Groups
      </h1>
      <br />
      <div className="row justify-content-center">
        <div className="col-4">
          <table className="table table-bordered table-secondary table-striped table-hover">
            <thead class="text-center">
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

      </div>


    </div>
  )
}
export default StaffAllocatedPanels;