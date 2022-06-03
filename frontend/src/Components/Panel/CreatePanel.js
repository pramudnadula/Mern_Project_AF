import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../Helper/httpHelper'
import { Select } from "antd";
const { Option } = Select;


function CreatePanel(props) {
 const [supervisors, setSupervisors] = useState([]);
 const [panelHead, setPanelHead] = useState("");
 const [firstPanelMember, setFirstPanelMember] = useState("");
 const [secondPanelMember, setSecondPanelMember] = useState("");
 const [thirdPanelMember, setThirdPanelMember] = useState("");
 const [panelName, setPanelName] = useState("");

 useEffect(() => {
  GET(`api/supervisor/all`).then((res) => {
   setSupervisors(res);
   console.log(res);
  }).catch((err) => {
   console.log(err)
  });
 }, [])

 submit = () => {
  const panelObject = {
   panelHead,
   firstPanelMember,
   secondPanelMember,
   thirdPanelMember,
   panelName,
  }
  POST('api/panel/add', panelObject).then((data) => {
   alert("success");
  }).catch((err) => {
   console.log(err);
  })

  window.location.href = "http://localhost:1234/panels/";
 }

 return (
  <div>
   <h1>Create Panel</h1>
   <label for="name">Panel Name :</label>
   <input type="text" placeholder="Enter Name" id='name' onChange={(e) => setPanelName(e.target.value)} />
   <br />
   <label for="head">Panel Head :</label>
   <Select
    id='head'
    style={{
     width: 200,
    }}
    onChange={(key) => setPanelHead(key)}
   >
    {supervisors && supervisors?.map((featuresElement, index) => (
     <Option key={index} value={featuresElement._id}>
      {featuresElement.email}
     </Option>
    ))}
   </Select>
   <br />
   <label for="first">First Panel Member :</label>
   <Select
    id='first'
    style={{
     width: 200,
    }}
    onChange={(key) => {
     setFirstPanelMember(key)
    }}
   >
    {supervisors && supervisors?.map((featuresElement, index) => (
     <Option key={index} value={featuresElement._id}>
      {featuresElement.email}
     </Option>
    ))}
   </Select>
   <br />
   <label for="second">Second Panel Member :</label>
   <Select
    id='second'
    style={{
     width: 200,
    }}
    onChange={(key) => setSecondPanelMember(key)}
   >
    {supervisors && supervisors?.map((featuresElement, index) => (
     <Option key={index} value={featuresElement._id}>
      {featuresElement.email}
     </Option>
    ))}
   </Select>
   <br />
   <label for="third">Third Panel Member :</label>
   <Select
    id='third'
    style={{
     width: 200,
    }}
    onChange={(key) => setThirdPanelMember(key)}
   >
    {supervisors && supervisors?.map((featuresElement, index) => (
     <Option key={index} value={featuresElement._id}>
      {featuresElement.email}
     </Option>
    ))}
   </Select>
   <br />
   <input type="button" onClick={submit} value="Create" />

  </div>
 );
}
export default CreatePanel;