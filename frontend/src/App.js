import "../src/Assets/Styles/App.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Home2 from "./Pages/Home2";
import RequestSupervisor from "./Components/GroupManagement/RequestSupervisor";
import Layout1 from "./Layouts/Layout1";
import StudentGroup from "./Pages/StudentGroup";
import Chat from "./Pages/Chat";
import AddMarkingScheme from "./Components/MarkingScheme/AddMarkingScheme";
import ViewAllMarkingSchemes from "./Components/MarkingScheme/VeiwAllMarkingSchemes";
import ViewMarkingScheme from "./Components/MarkingScheme/ViewMarkingScheme";
import Evaluate from "./Components/MarkingScheme/Evaluate";

function App(props) {
  return (
    <BrowserRouter BrowserRouter>
      <Layout1>
        <Route path="/home" exact component={Home2} />
        <Route path="/group" exact component={StudentGroup} />
        <Route
          path="/req"
          exact
          component={() => (
            <RequestSupervisor isSupervisor={true} stype="Supervisors" />
          )}
        />
        <Route
          path="/creq"
          exact
          component={() => (
            <RequestSupervisor isSupervisor={false} stype="Co-Supervisors" />
          )}
        />
        <Route path="/msg" exact component={Chat} />
        <Route path="/markingscheme/add" exact component={AddMarkingScheme} />
        <Route path="/markingscheme/" exact component={ViewAllMarkingSchemes} />
        <Route
          path="/markingscheme/view/:id"
          exact
          component={ViewMarkingScheme}
        />
        <Route path="/evaluate/" exact component={Evaluate} />
      </Layout1>

      <Route path="/" exact component={Home} />
    </BrowserRouter>
  );
}

export default App;
