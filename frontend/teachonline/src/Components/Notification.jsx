import InfoIcon from "@material-ui/icons/Info";
import { useEffect } from "react";
import { useState } from "react";

const Notification = (props) => {
  const [notifications, setNotifications] = useState([
    {
      title: "",
      time: "",
      by: "",
    },
  ]);
  useEffect(() => {
    fetch("/collegeGetAllNotificationsForTeachers", {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
    }).then((result) => {
      if (result.status === 200) {
        const data = await result.json();
        setNotifications(data.notifications);
      }
    });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-12 col-md-8 col-lg-7"
            style={{ margin: "auto", display: "block" }}
          >
            <div className="send-notification">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Title</th>
                    <th scope="col">Time</th>
                    <th scope="col">By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <InfoIcon />
                    </td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  {notifications.map((obj) => {
                    return (
                      <>
                        <td>
                          <InfoIcon />
                        </td>
                        <td>{obj.title}</td>
                        <td>{obj.time}</td>
                        <td>{obj.by}</td>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
