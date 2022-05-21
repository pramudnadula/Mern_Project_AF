import '../src/Assets/Styles/App.css';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Layout1 from './Layouts/Layout1';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';

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
      <Route path='/home' exact component={Home2} />

      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/userprofile" exact component={UserProfile} />
      <Route path="/update/:id" exact component={Update} />



    </BrowserRouter>


  );
}

export default App;
