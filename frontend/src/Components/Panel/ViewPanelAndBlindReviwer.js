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
  <div>
   <table class="table table-striped">
    <thead>
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
 )
}
export default ViewPanelAndBlindReviewer;