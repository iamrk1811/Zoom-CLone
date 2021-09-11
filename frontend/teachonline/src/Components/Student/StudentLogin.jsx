import { FormControl, Button, Input, InputLabel } from "@material-ui/core";
import { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";



const StudentLogin = () => {
  
  const [cred, setCred] = useState('');
  const [password, setPassword] = useState('');
  const [studentLoginInfo, setStudentLoginInfo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = () => {
    fetch('/studentLoginBackend', {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        cred, password
      })
    }).then(async (result) => {
      const data = await result.json();
      if(result.status === 200) {

      } else {
        
      }
    })
  }

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
                  setCred(e.target.value);
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

export default StudentLogin;
