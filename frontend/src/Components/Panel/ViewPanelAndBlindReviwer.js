import React, { useEffect, useState } from 'react';
import { GET } from '../../Helper/httpHelper';

function ViewPanelAndBlindReviewer(props) {

  const [addPanel, setAddPanel] = useState([]);

  useEffect(() => {
    GET("api/panel/addpanel/all").then((res) => {
      console.log(res);
      setAddPanel(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="container-fluid">
      <br />
      <h1 class="text-center">
        Group Allocated Panel and Blind Reviwer
      </h1>
      <br />
      <div className="row justify-content-center">
        <div className="col-8">
          <table className="table table-bordered table-secondary table-striped table-hover">
            <thead class="text-center">
              <tr>
                <th>
                  Group Name
                </th>
                <th>
                  Panel Name
                </th>
                <th>
                  Blind Reviwer
                </th>
              </tr>
            </thead>
            <tbody>
              {addPanel &&
                addPanel.map((panel, index) => (
                  <tr key={index}>
                    <td>{panel.groupId.groupName}</td>
                    <td>{panel.panelId.panelName}</td>
                    <td>{panel.blindReviwer.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default ViewPanelAndBlindReviewer;