import { FormControl, Button, Input, InputLabel } from "@material-ui/core";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacherLoginInfo, setTeacherLoginInfo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const history = useHistory();

  const handleLogin = () => {
    fetch("/teacherLoginBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((result) => {
        if (result.status === 200) {
          history.replace("/teacherDashboard");
        } else {
          setErrorMsg("error");
        }
      })
      .catch((err) => {
        setErrorMsg("error");
      });
  };

  return (
    <div className="teacher-login-container container my-4">
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-6" style={{ margin: "auto" }}>
          <h3 className="text-center">Teacher Login</h3>
          <div className="teacherLoginForm">
            {teacherLoginInfo === "error" && (
              <Alert severity="error">{errorMsg}</Alert>
            )}
            {teacherLoginInfo === "success" && (
              <Alert severity="success">{successMsg}</Alert>
            )}

            <FormControl fullWidth={true} className="mb-2">
              <InputLabel htmlFor="Email">Email</InputLabel>
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
              />
            </FormControl>

            <FormControl fullWidth={true} className="mb-2">
              <InputLabel htmlFor="Password">Password</InputLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Button className="loginbtn" fullWidth={true} onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
