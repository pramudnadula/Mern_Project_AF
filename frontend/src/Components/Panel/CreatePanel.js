import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../Helper/httpHelper'
import { Select } from "antd";
const { Option } = Select;
import '../../Assets/Styles/PanelForm.css';


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

  <div className="container">
   <br />
   <div className="row justify-content-center">
    <div className="col-3">
     <h1>Create Panel</h1>
    </div>
   </div>
   <br />
   <div className="row justify-content-center">
    <div className='border col-6'>
     <br />
     <div className="row justify-content-center">
      <div className="col-3">
       <label for="name">Panel Name :</label>
      </div>
      <div className="col-4">
       <input type="text" placeholder="Enter Name" id='name' onChange={(e) => setPanelName(e.target.value)} />
      </div>
     </div>
     <br />
     <div className="row justify-content-center">
      <div className="col-3">
       <label for="head">Panel Head :</label>
      </div>
      <div className="col-4">
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
      </div>
     </div>

     <br />
     <div className="row justify-content-center">
      <div className="col-3">
       <label for="first">First Panel Member :</label>
      </div>
      <div className="col-4">
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
      </div>
     </div>

     <br />
     <div className="row justify-content-center">
      <div className="col-3">
       <label for="second">Second Panel Member :</label>
      </div>
      <div className="col-4">
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
      </div>
     </div>

     <br />
     <div className="row justify-content-center">
      <div className="col-3">
       <label for="third">Third Panel Member :</label>
      </div>
      <div className="col-4">
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
      </div>
     </div>

     <br />
     <div className="row justify-content-center">
      <div className="col-2">
       <input type="button" onClick={submit} value="Create" />
      </div>
     </div>
     <br />
    </div>
   </div>
  </div>
 );
}
export default CreatePanel;