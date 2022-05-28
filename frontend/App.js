import "./src/Assets/Styles/App.css";
import "antd/dist/antd.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './src/Pages/Home';
import Home2 from './src/Pages/Home2';
import RequestSupervisor from './src/Components/GroupManagement/RequestSupervisor';
import Layout1 from './src/Layouts/Layout1';
import StudentGroup from './src/Pages/StudentGroup';
import Chat from './src/Pages/Chat';
import React, { useState } from 'react';
import Login from './src/Components/User/Login';
import Register from './src/Components/User/Register';
import UserProfile from './src/Components/User/UserProfile';
import Update from './src/Components/User/Update';
import CreateGroup from './src/Components/GroupManagement/CreateGroup';
import AdminLogin from './src/Components/Admin/AdminLogin';
import AdminDashboard from './src/Components/Admin/AdminDashboard';
import StaffRegister from './src/Components/User/StaffRegister';
import StaffProfile from './src/Components/User/StaffProfile';
import AddMarkingScheme from "./src/Components/MarkingScheme/AddMarkingScheme";
import ViewAllMarkingSchemes from "./src/Components/MarkingScheme/VeiwAllMarkingSchemes";
import ViewMarkingScheme from "./src/Components/MarkingScheme/ViewMarkingScheme";
import Evaluate from "./src/Components/MarkingScheme/Evaluate";
import AllocatedGroups from "./src/Components/Group_supervisor/AllocatedGroups";
import StaffUpdate from "./src/Components/User/StaffUpdate";

function App() {
  const user = (localStorage.getItem("user"))
  console.log(user)
  const [test, setTest] = useState("")
  console.log(test)


  return (

    <BrowserRouter>
      <Route path='/' exact component={Home} />

      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/userprofile" exact component={UserProfile} />
      <Route path="/update/:id" exact component={Update} />

      <Route path="/adminlogin" exact component={AdminLogin} />
      <Route path="/admindashboard" exact component={AdminDashboard} />
      <Route path="/staffregister" exact component={StaffRegister} />
      <Route path="/staffprofile" exact component={StaffProfile} />
      <Route path="/staffupdate" exact component={StaffUpdate} />

      <Layout1>
        <Route path='/home' exact component={Home2} />
        <Route path='/group' exact component={StudentGroup} />
        <Route path='/req' exact component={() => (<RequestSupervisor isSupervisor={true} stype="Supervisors" />)} />
        <Route path='/creq' exact component={() => (<RequestSupervisor isSupervisor={false} stype="Co-Supervisors" />)} />
        <Route path='/msg' exact component={Chat} />
        <Route path="/markingscheme/add" exact component={AddMarkingScheme} />
        <Route path="/markingscheme/" exact component={ViewAllMarkingSchemes} />
        <Route path="/markingscheme/view/:id" exact component={ViewMarkingScheme} />
        <Route path="/evaluate/" exact component={Evaluate} />

        <Route path="/allocatedgroups" exact component={AllocatedGroups} />

      </Layout1>

    </BrowserRouter>
  );
}

export default App;
