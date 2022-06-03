import React, { useEffect, useState } from "react";
import { GET } from '../../Helper/httpHelper'
import { Link } from "react-router-dom";


function ViewAllPanels(props) {

 const [panels, setPanels] = useState([]);

 useEffect(() => {

  GET("api/panel/").then((res) => {
   console.log(res);
   setPanels(res);
  }).catch((err) => {
   console.log(err);
  })


 }, [])

 return (
  <div>
   <h1>All Panels</h1>
   <table class="table table-striped">
    <thead>
     <tr>
      <th>Panel Name</th>
      <th>Panel Head</th>
      <th colSpan="3">Panel Members</th>
     </tr>
    </thead>
    <tbody>
     {panels &&
      panels.map((panel, index) => (
       <tr key={index}>
        <td>{panel.panelName}</td>
        <td>{panel.panelHead.email}</td>
        <td>{panel.firstPanelMember.email}</td>
        <td>{panel.secondPanelMember.email}</td>
        <td>{panel.thirdPanelMember.email}</td>
       </tr>
      ))}
    </tbody>
   </table>

   <Link to={`/panel/add`}>
    <button type="button" class="btn btn-secondary btn-sm">
     Create Panels
    </button>
   </Link>
  </div>
 )
}

export default ViewAllPanels;