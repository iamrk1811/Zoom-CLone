import { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const SendNotificationClg = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [notificationAddedInfo, setNotificationAddedInfo] = useState("");
  const [notification, setNotification] = useState("");
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleButtonClick = () => {
    fetch("/collegeAddNotificationBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-12 col-md-8 col-lg-7"
            style={{ margin: "auto", display: "block" }}
          >
            <h3 className="text-center mb-4">Adding Notification</h3>
            <form className="form-group notificationOptionComponentContainer text-center p-4">
              {notificationAddedInfo === "error" && (
                <Alert severity="error">{errorMsg}</Alert>
              )}
              {notificationAddedInfo === "success" && (
                <Alert severity="success">{successMsg}</Alert>
              )}
              <FormControl
                fullWidth={true}
                className="notificationOptionComponentInput"
              >
                <InputLabel htmlFor="notification">Notification</InputLabel>
                <Input
                  value={notification}
                  name="Notification"
                  onChange={(e) => {
                    setNotificationAddedInfo("");
                    setNotification(e.target.value);
                  }}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name="checkBoxTeacher"
                    color="primary"
                  />
                }
                label="Teacher"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name="checkBoxTeacher"
                    color="primary"
                  />
                }
                label="Student"
              />
              <Button
                onClick={handleButtonClick}
                fullWidth={true}
                className="mt-3 cbtn"
              >
                Add
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendNotificationClg;
