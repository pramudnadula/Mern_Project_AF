import '../src/Assets/Styles/App.css';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import RequestSupervisor from './Components/GroupManagement/RequestSupervisor';
import Layout1 from './Layouts/Layout1';
import StudentGroup from './Pages/StudentGroup';
import Chat from './Pages/Chat';
import React, { useState } from 'react';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import UserProfile from './Components/User/UserProfile';
import Update from './Components/User/Update';

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

      <Layout1>
        <Route path='/home' exact component={Home2} />
        <Route path='/group' exact component={StudentGroup} />
        <Route path='/req' exact component={() => (<RequestSupervisor isSupervisor={true} stype="Supervisors" />)} />
        <Route path='/creq' exact component={() => (<RequestSupervisor isSupervisor={false} stype="Co-Supervisors" />)} />
        <Route path='/msg' exact component={Chat} />
      </Layout1>      
    </BrowserRouter>


  );
}

export default App;
