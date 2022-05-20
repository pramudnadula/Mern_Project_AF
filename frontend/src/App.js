import '../src/Assets/Styles/App.css';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Layout1 from './Layouts/Layout1';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import RequestSupervisor from './Components/GroupManagement/RequestSupervisor';
import Layout1 from './Layouts/Layout1';
import StudentGroup from './Pages/StudentGroup';
import Chat from './Pages/Chat';


function App(props) {

  return (


    <BrowserRouter BrowserRouter >

      <Layout1>
        <Route path='/home' exact component={Home2} />
        <Route path='/group' exact component={StudentGroup} />
        <Route path='/req' exact component={() => (<RequestSupervisor isSupervisor={true} stype="Supervisors" />)} />
        <Route path='/creq' exact component={() => (<RequestSupervisor isSupervisor={false} stype="Co-Supervisors" />)} />
        <Route path='/msg' exact component={Chat} />
      </Layout1>

      <Route path='/' exact component={Home} />
    </BrowserRouter>


  );
}

export default App;
