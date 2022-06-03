import React, { useEffect, useState } from 'react'
import { GET } from '../../Helper/httpHelper';

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
  <div>
   <h1>
    Panel Details
   </h1>
   Panel Name: {panel?.panelName}
   <br />
   Panel Head: {panel?.panelHead?.email}
   <br />

   Panel First Member: {panel?.firstPanelMember?.email}
   <br />

   Panel Second Member: {panel?.secondPanelMember?.email}
   <br />

   Panel Third Member: {panel?.thirdPanelMember?.email}
   <br />
   <br />

   <br />
   <br />
   <br />

   <h1>Groups Allocated To {panel.panelName}</h1>
   <table class="table table-striped">
    <thead>
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
 )
}
export default ViewPanel;