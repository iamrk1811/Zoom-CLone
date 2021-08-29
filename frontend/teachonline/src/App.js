import "./App.css";
import "./style.scss"
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import CollegeLogin from "./Components/College/CollegeLogin"
import CollegeRegistration from "./Components/College/CollegeRegistration"
// import NavBar from "./Components/NavBar";
import CollegeDashboard from "./Components/College/CollegeDashboard";


const App = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/collegeRegister">
          <CollegeRegistration />
        </Route>
        <Route path="/collegeLogin">
          <CollegeLogin />
        </Route>
        <Route path="/collegeDashboard" exact>
          <CollegeDashboard />
        </Route>
      </Switch>
    </>
  );
};

export default App;
