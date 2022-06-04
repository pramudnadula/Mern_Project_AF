import React, { useEffect, useState } from 'react'
import { GET } from '../../Helper/httpHelper';
import '../../Assets/Styles/PanelForm.css';

function ViewPanel(props) {
  const [groups, setGroups] = useState([]);
  const [panel, setPanel] = useState("");

  useEffect(() => {
    GET(`api/panel/addpanel/addpanel/${props.match.params.id}`).then((res) => {
      console.log(res);
      setGroups(res);
    }).catch((err) => {
      console.log(err);
    })
    GET(`api/panel/addpanel/panel/${props.match.params.id}`).then((res) => {
      console.log(res);
      setPanel(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <div className="container">
      <br />
      <h1 class="text-center">
        Panel Details
      </h1>
      <br />
      <div className="row justify-content-center">
        <div className="border col-6 ">
          <br />

          <div className="col-8">
            <div>Panel Name : <span style={{ color: 'red' }}> {panel?.panelName}</span></div>
            <div>Panel Head :<span style={{ color: 'red' }}> {panel?.panelHead?.email}</span></div>
            <div>Panel First Member :<span style={{ color: 'red' }}> {panel?.firstPanelMember?.email}</span></div>
            <div>Panel Second Member :<span style={{ color: 'red' }}> {panel?.secondPanelMember?.email}</span></div>
            <div>Panel Third Member :<span style={{ color: 'red' }}> {panel?.thirdPanelMember?.email}</span></div>
          </div>
          <br />
        </div>
      </div>
      <br />
      <br />

      <h1 class="text-center">Groups Allocated To {panel.panelName}</h1>
      <br />
      <div className="row justify-content-center">
        <div className="col-4">
          <table className="table table-bordered table-secondary table-striped table-hover">
            <thead class="text-center">
              <tr>
                <th>Group Names</th>
              </tr>
            </thead>
            <tbody>
              {groups &&
                groups.map((group, index) => (
                  <tr key={index}>
                    <td>{group.groupId.groupName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default ViewPanel;