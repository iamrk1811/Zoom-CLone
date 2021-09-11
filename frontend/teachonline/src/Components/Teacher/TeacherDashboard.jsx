import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router";
import Cookies from 'js-cookie';
import { useEffect } from 'react';



const TeacherDashboard = () => {
  const history = useHistory();

  const instantClass = () => {
    fetch('/generateMeetingId', {
      method:"POST",
      header: {
        'Content-Type' : 'application/json',
        Accept : 'application/json'
      },
      body: JSON.stringify({
        teacher:'rakibteacher'
      })
    }).then((result) => {
      if (result.status === 200) {
        result.json().then((data) => {
          console.log(data.meetingId);
          history.push(`/meet/${data.meetingId}`);
        })
      }
    })
  }

  //   sidebar toggler
  const sidebarToggler = (e) => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };
  //   logout
  const teacherLogout = () => {
    Cookies.remove("authType");
    Cookies.remove("authToken");
    history.replace("/teacherLogin");
  };


  useEffect(() => {
    const authType = Cookies.get("authType");
    // check if this token is valid or not
    if (authType !== "teacher") {
      history.replace("/teacherLogin");
    } else {
      fetch("/teacherVerifyUser", {
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
            history.replace("/collegeLogin");
          }
        })
        .catch((err) => {});
    }
  }, [])
  return (
    <>
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>Rakib</h3>
          </div>

          <ul className="list-unstyled components">
            <p>Options</p>

            <List component="nav">
              <Divider />
              <Divider />
              <ListItem
                button
                onClick={() => {
                  instantClass();
                }}
              >
                <ListItemText primary="Instant Class" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  //   setMainContent("Available Teachers");
                }}
              >
                <ListItemText primary="Schedule Class" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  //   setMainContent("Add Stream");
                }}
              >
                <ListItemText primary="Attendance" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  //   setMainContent("Add Stream");
                }}
              >
                <ListItemText primary="Allow Student Policy" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  //   setMainContent("Add Stream");
                }}
              >
                <ListItemText primary="Change Password" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  //   setMainContent("Add Stream");
                }}
              >
                <ListItemText primary="Send Student Notification" />
              </ListItem>
              <Divider />
              <Divider />
            </List>
          </ul>

          <ul className="list-unstyled CTAs">
            <li>
              <Button
                onClick={teacherLogout}
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
            <h2>Hello Teacher Dashboard</h2>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
