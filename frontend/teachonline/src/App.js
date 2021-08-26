import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import "bootstrap/dist/js/jquery.min.js";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import TeacherRegistration from "./Components/Teacher/TeacherRegistration";
import StudentRegistration from "./Components/Student/StudentRegistratiion.jsx";
import TeacherLogin from "./Components/Teacher/TeacherLogin";
import StudentLogin from "./Components/Student/StudentLogin";
import NavBar from "./Components/NavBar";


const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/teacherRegister" exact>
          <TeacherRegistration />
        </Route>
        <Route path="/teacherLogin" exact>
          <TeacherLogin />
        </Route>        
        <Route path="/studentRegister" exact>
          <StudentRegistration />
        </Route>        
        <Route path="/studentLogin" exact>
        <StudentLogin />
        </Route>
      </Switch>
    </>
  );
};

export default App;
