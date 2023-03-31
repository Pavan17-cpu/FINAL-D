import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, path } from 'react-router-dom'
import Homescreen from "./screens/Homescreen";
import Navbar from "./components/Navbar";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import 'antd/dist/antd.css';
import Bookingscreen from "./screens/Bookingscreen";
import Profilescreen from "./screens/Profilescreen";
import Landingscreen from "./screens/Landingscreen";
import Adminscreen from "./screens/Adminscreen";
import About from "./images/About";
import MoreInfo from "./MoreInfo";
import Quiz from "./quiz/Quiz";
import Contact from "./screens/Contact";
import LoginPage from "./screens/AdminLogin";


function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>

        <Route path="/" exact component={Landingscreen} />
        <Route path="/home" exact component={Homescreen} />
        <Route path="/login" component={Loginscreen} />
        <Route path="/register" component={Registerscreen} />
        <Route path="/book/:roomid/:fromdate/:todate" component={Bookingscreen} />
        <Route path="/profile" component={Profilescreen} />
        <Route path="/admin" component={LoginPage} />
        <Route path="/admin1" component={Adminscreen} />
        <Route path="/about" component={About} />
        <Route path="/moreinfo" component={MoreInfo} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/contact" component={Contact} />
        



      </BrowserRouter>
    </div>
  );
}

export default App;