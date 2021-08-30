import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import AddTeacher from "./AddTeacher";
import AddStream from "./AddStream";
import AvailableTeachers from "./AvailableTeacher";

const CollegeDashboard = () => {
  const history = useHistory();
  const [mainContent, setMainContent] = useState("");
  const [collegeName, setCollegeName] = useState("");

  useEffect(() => {
    // check if College logged in or not
    const authType = Cookies.get("authType");

    // check if this token is valid or not
    if (authType !== "college") {
      history.replace("/");
    } else {
      fetch("/collegeVerifyUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then(async (res) => {
          // if status code is not 200 that means user is not verified
          if (res.status !== 200) {
            history.replace("/");
          } else {
            const data = await res.json();
            setCollegeName(data.collegeName);
          }
        })
        .catch((err) => {});
    }
  }, []); // empty array tells react to run this code only when refresh the page

  //   sidebar toggler
  const sidebarToggler = (e) => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };

  //   logout
  const collegeLogout = (e) => {
    Cookies.remove("authType");
    Cookies.remove("authToken");
    history.replace("/collegeLogin");
  };

  return (
    <>
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>{collegeName}</h3>
          </div>

          <ul className="list-unstyled components">
            <p>Options</p>

            <List component="nav">
              <ListItem
                button
                onClick={() => {
                  setMainContent("Add Teacher");
                }}
              >
                <ListItemText primary="Add Teacher" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  setMainContent("Available Teachers");
                }}
              >
                <ListItemText primary="Available Teacher" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  setMainContent("Add Stream");
                }}
              >
                <ListItemText primary="Add Stream" />
              </ListItem>
              <Divider />
            </List>
          </ul>

          <ul className="list-unstyled CTAs">
            <li>
              <Button
                onClick={collegeLogout}
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
            {mainContent === "Add Teacher" && <AddTeacher collegeName={collegeName} />}
            {mainContent === "Available Teachers" && <AvailableTeachers />}
            {mainContent === "Add Stream" && <AddStream />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeDashboard;