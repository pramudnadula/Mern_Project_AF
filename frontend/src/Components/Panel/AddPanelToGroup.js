import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../Helper/httpHelper';
import { Select } from "antd";
const { Option } = Select;
import '../../Assets/Styles/PanelForm.css';

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
  <div className="container">
   <br />
   <h1 class="text-center">
    Add Panel and Blind Reviwer
   </h1>
   <br />
   <h2 class="text-center" style={{ color: 'red' }}>{group.groupName}</h2>

   <div className="row justify-content-center">
    <div className='border col-8'>
     <div class=" col-6">
      <br />
      <div>
       <label htmlFor="panel">Choose Panel : </label>
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
      </div>
      <br />
      <div>
       <label htmlFor="blindreviewer">Choose Blind Reviwer : </label>
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
      </div>

      <br />
      <div class="text-center">
       <input type="button" onClick={submit} value="Add" />
      </div>

      <br />

     </div>
    </div>
   </div>


  </div>
 )
}

export default AddPanelToGroup;