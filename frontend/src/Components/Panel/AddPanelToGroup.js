import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../Helper/httpHelper';
import { Select } from "antd";
const { Option } = Select;

function AddPanelToGroup(props) {

 const [group, setGroup] = useState("");
 const [supervisors, setSupervisors] = useState([]);
 const [panels, setPanels] = useState([]);
 const [panel, setPanel] = useState("");
 const [blindReviwer, setBlindReviwer] = useState("");

 useEffect(() => {
  GET(`api/evoluate/group/${props.match.params.id}`)
   .then((res) => {
    console.log(res);
    setGroup(res);
   })
   .catch((err) => {
    console.log(err);
   });

  GET("api/panel/").then((res) => {
   console.log(res);
   setPanels(res);
  }).catch((err) => {
   console.log(err);
  })

  GET(`api/supervisor/all`).then((res) => {
   setSupervisors(res);
   console.log(res);
  }).catch((err) => {
   console.log(err)
  });
 }, []);

 submit = () => {

  console.log(group._id);
  console.log(panel);
  console.log(blindReviwer);
  console.log();

  let addPanelObject = {
   groupId: group._id,
   panelId: panel,
   blindReviwer,
  }
  console.log(addPanelObject);

  POST("api/panel/addpanel", addPanelObject).then((data) => {
   alert("success");
  }).catch((err) => {
   console.log(err);
  })

  window.location.href = "http://localhost:1234/panels/add";
 }
 return (
  <div>
   <h1>{group.groupName}</h1>

   <label for="panel">Choose Panel</label>
   <Select
    id='panel'
    style={{
     width: 200,
    }}
    onChange={(key) => setPanel(key)}
   >
    {panels && panels?.map((featuresElement, index) => (
     <Option key={index} value={featuresElement._id}>
      {featuresElement.panelName}
     </Option>
    ))}
   </Select>
   <br />

   <label for="blindreviewer">Choose Blind Reviwer</label>
   <Select
    id='blindreviewer'
    style={{
     width: 200,
    }}
    onChange={(key) => setBlindReviwer(key)}
   >
    {supervisors && supervisors?.map((featuresElement, index) => (
     <Option key={index} value={featuresElement._id}>
      {featuresElement.email}
     </Option>
    ))}
   </Select>
   <br />
   <input type="button" onClick={submit} value="Add" />
  </div>
 )
}

export default AddPanelToGroup;