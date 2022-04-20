import '../src/Assets/Styles/App.css';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Layout1 from './Layouts/Layout1';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';

function App() {
  return (

    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/home' exact component={Home2} />
    </BrowserRouter>


  );
}

export default App;
