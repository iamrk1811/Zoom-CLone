import "./App.css";
import "./style.scss"
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import CollegeLogin from "./Components/College/CollegeLogin"
import CollegeRegistration from "./Components/College/CollegeRegistration"
import CollegeDashboard from "./Components/College/CollegeDashboard";
import TeacherLogin from "./Components/Teacher/TeacherLogin";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/collegeRegister" exact>
          <CollegeRegistration />
        </Route>
        <Route path="/collegeLogin" exact>
          <CollegeLogin />
        </Route>
        <Route path="/collegeDashboard" exact>
          <CollegeDashboard />
        </Route>

        <Route path="/teacherLogin">
          <TeacherLogin />
        </Route>
      </Switch>
    </>
  );
};

export default App;
