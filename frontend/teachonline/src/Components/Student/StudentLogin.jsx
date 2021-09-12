import { FormControl, Button, Input, InputLabel } from "@material-ui/core";
import { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";
import Cookies from 'js-cookie';

const StudentLogin = () => {
  const [cred, setCred] = useState("");
  const [password, setPassword] = useState("");
  const [studentLoginInfo, setStudentLoginInfo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    fetch("/studentLoginBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cred,
        password,
      }),
    }).then(async (result) => {
      const data = await result.json();
      if (result.status === 200) {
        setStudentLoginInfo("success");
        setSuccessMsg("Login Successful");
        history.replace("/studentDashboard");
      } else {
        setStudentLoginInfo("error");
        setErrorMsg(data.err);
      }
    });
  };

  // check if token stored or not 
  // if yes try to login
  useEffect(() => {
    const token = Cookies.get('authToken');
    const authType = Cookies.get('authType');
    if(token && authType) {
      fetch("/studentVerifyUser", {
        method:"POST",
        headers:{
          'Content-Type' :'application/json',
          Accept:'application/json'
        }
      }).then((result) => {
        if(result.status ===  200) {
          history.replace('/studentDashboard');
        }
      })
    }
  }, [])


  
  return (
    <div className="student-login-container container my-4">
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-6" style={{ margin: "auto" }}>
          <h3 className="text-center">Student Login</h3>
          <div className="studentLoginForm">
            {studentLoginInfo === "error" && (
              <Alert severity="error">{errorMsg}</Alert>
            )}
            {studentLoginInfo === "success" && (
              <Alert severity="success">{successMsg}</Alert>
            )}

            <FormControl fullWidth={true} className="mb-2">
              <InputLabel htmlFor="Email">Email / Mobile</InputLabel>
              <Input
                value={cred}
                onChange={(e) => {
                  setStudentLoginInfo("");
                  setErrorMsg("");
                  setCred(e.target.value);
                }}
                type="email"
              />
            </FormControl>

            <FormControl fullWidth={true} className="mb-2">
              <InputLabel htmlFor="Password">Password</InputLabel>
              <Input
                value={password}
                onChange={(e) => {
                  setStudentLoginInfo("");
                  setErrorMsg("");
                  setPassword(e.target.value);
                }}
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

export default StudentLogin;
