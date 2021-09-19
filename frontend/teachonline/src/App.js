import "./media.scss";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Switch, Route } from "react-router-dom";
import Meeting from "./Components/Meetings/Meeting";
import HomePage from './Components/HomePage';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/:roomId" exact>
          <Meeting />
        </Route>
      </Switch>
    </>
  );
};

export default App;
