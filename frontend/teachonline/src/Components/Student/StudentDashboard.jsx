import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import { useEffect } from "react";

const StudentDashboard = () => {
  const history = useHistory();
  //   sidebar toggler
  const sidebarToggler = (e) => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };
  //   logout
  const studentLogout = () => {
    Cookies.remove("authType");
    Cookies.remove("authToken");
    history.replace("/studentLogin");
  };
  return (
    <>
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>Student Name / Pic to be added</h3>
          </div>

          <ul className="list-unstyled components">
            <p>Options</p>

            <List component="nav">
              <Divider />
              <Divider />
              <ListItem button>
                <ListItemText primary="Notification" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  //   setMainContent("Available Teachers");
                }}
              >
                <ListItemText primary="Notice Board" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  //   setMainContent("Add Stream");
                }}
              >
                <ListItemText primary="Chat with classmate" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  //   setMainContent("Add Stream");
                }}
              >
                <ListItemText primary="Chat with Teacher" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  //   setMainContent("Add Stream");
                }}
              >
                <ListItemText primary="Group" />
              </ListItem>

              <Divider />
              <Divider />
            </List>
          </ul>

          <ul className="list-unstyled CTAs">
            <li>
              <Button
                onClick={studentLogout}
                className="logout"
                style={{ margin: "auto", display: "block" }}
              >
                Log out
              </Button>
            </li>
          </ul>
        </nav>

        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                onClick={sidebarToggler}
                type="button"
                className="btn btn-info"
              >
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
              </button>
            </div>
          </nav>
          <div className="main-content" id="main-content">
            <h2>To Be added Student Basic Profile</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
