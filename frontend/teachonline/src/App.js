import "./media.scss";
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
import TeacherDashboard from "./Components/Teacher/TeacherDashboard";
import Meeting from "./Components/Meetings/Meeting";


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
        <Route path="/teacherLogin" exact>
          <TeacherLogin />
        </Route>
        <Route path="/teacherDashboard" exact>
          <TeacherDashboard/>
        </Route>
        <Route path="/meet/:roomId" exact>
          <Meeting />
        </Route>
      </Switch>
    </>
  );
};

export default App;
