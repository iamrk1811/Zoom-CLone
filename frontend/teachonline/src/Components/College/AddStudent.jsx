import { useState, useRef } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useEffect } from "react";

const AddStudent = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [studentAddedInfo, setStudentAddedInfo] = useState("");
  const [student, setStudent] = useState({
    name: "",
    cred: "",
    password: "",
    session: "",
    stream: "",
  });

  const [streams, setStreams] = useState([]);

  useEffect(() => {
    fetch("/collegeGetAvailableStreamBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (result) => {
      const data = await result.json();
      if (result.status === 200) {
        setStreams(data.streams);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    setStudentAddedInfo("");
    const name = e.target.name;
    const value = e.target.value;
    setStudent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddButton = () => {
    const {name, cred, password, session, stream} = student;
    fetch("/collegeAddStudentBackend", {
      method:"POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name, cred, password, session, stream
      })
    }).then( async (result) => {
      const data = await result.json();

      if(result.status === 200) {
        setStudent({
          name:"",
          cred:"",
          password:"",
          session:"",
          stream:""
        });
        setStudentAddedInfo('success');
        setSuccessMsg(data.msg);
        document.getElementById('stream').value = "";
      } else {
        setStudentAddedInfo('error');
        setErrorMsg(data.err);
      }
    })
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-12 col-md-8 col-lg-7"
            style={{ margin: "auto", display: "block" }}
          >
            <h3 className="text-center mb-4">Adding Student</h3>
            <form className="form-group studentOptionComponentContainer text-center p-4">
              {studentAddedInfo === "error" && (
                <Alert severity="error">{errorMsg}</Alert>
              )}
              {studentAddedInfo === "success" && (
                <Alert severity="success">{successMsg}</Alert>
              )}
              <FormControl
                fullWidth={true}
                className="studentOptionComponentInput"
              >
                <InputLabel htmlFor="Student Name">Name</InputLabel>
                <Input
                  value={student.name}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </FormControl>
              <FormControl
                fullWidth={true}
                className="studentOptionComponentInput"
              >
                <InputLabel htmlFor="Student Mobile">Email / Mobile</InputLabel>
                <Input
                  value={student.cred}
                  name="cred"
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                />
              </FormControl>
              <FormControl
                fullWidth={true}
                className="studentOptionComponentInput"
              >
                <InputLabel htmlFor="Student Name">Password</InputLabel>
                <Input
                  value={student.password}
                  name="password"
                  onChange={(e) => handleInputChange(e)}
                  type="password"
                />
              </FormControl>
              <FormControl
                fullWidth={true}
                className="studentOptionComponentInput"
              >
                <InputLabel htmlFor="Student Session">Session</InputLabel>
                <Input
                  value={student.session}
                  name="session"
                  type="number"
                  onChange={(e) => handleInputChange(e)}
                />
              </FormControl>
              <FormControl
                fullWidth={true}
                className="studentOptionComponentInput"
              >
              <select id="stream" className="selectBox form-select" name="stream" onChange={handleInputChange}>
                <option value="">Select Stream</option>
                {streams.map((value) => {
                  return (<option key={value} value={value}>{value}</option>)
                })}
              </select>
                
              </FormControl>
              <Button
                onClick={handleAddButton}
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

export default AddStudent;
