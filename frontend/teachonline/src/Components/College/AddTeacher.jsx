import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { useState } from "react";

function AddTeacher(props) {
  const [teacher, setTeacher] = useState({
    fullname: "",
    email: "",
    password: "",
    stream: "",
  });

  const [teacherAddedInfo, setTeacherAddedInfo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const collegeAddTeacherInputHandler = (e) => {
    setTeacherAddedInfo("");
    const name = e.target.name;
    const value = e.target.value;

    // updating state
    setTeacher((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const collegeAddTeacher = () => {
    fetch("/collegeAddTeacherBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        fullname: teacher.fullname,
        email: teacher.email,
        password: teacher.password,
        collegeName: props.collegeName,
        stream: teacher.stream,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          setSuccessMsg("Teacher added successfully");
          setTeacherAddedInfo("success");
          setTeacher({
            fullname: "",
            email: "",
            password: "",
            stream: ""
          });
        } else {
          setErrorMsg(data.err);
          setTeacherAddedInfo("error");
        }
      })
      .catch((err) => {
        //   TODO
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-sm-12 col-md-8 col-lg-7"
          style={{ margin: "auto", display: "block" }}
        >
          <h3 className="text-center mb-4">Adding Teacher</h3>
          <form className="form-group collegeOptionComponentContainer text-center p-4">
            {teacherAddedInfo === "error" && (
              <Alert severity="error">{errorMsg}</Alert>
            )}
            {teacherAddedInfo === "success" && (
              <Alert severity="success">{successMsg}</Alert>
            )}
            <FormControl
              fullWidth={true}
              className="collegeOptionComponentInput"
            >
              <InputLabel htmlFor="Teacher Name">Name</InputLabel>
              <Input
                value={teacher.fullname}
                name="fullname"
                onChange={collegeAddTeacherInputHandler} />
            </FormControl>
            <FormControl
              fullWidth={true}
              className="collegeOptionComponentInput"
            >
              <InputLabel htmlFor="Teacher Name">Email</InputLabel>
              <Input
                value={teacher.email}
                name="email"
                onChange={collegeAddTeacherInputHandler} />
            </FormControl>
            <FormControl
              fullWidth={true}
              className="collegeOptionComponentInput"
            >
              <InputLabel htmlFor="Teacher Name">Password</InputLabel>
              <Input
                value={teacher.password}
                name="password"
                onChange={collegeAddTeacherInputHandler}
                type="password" />
            </FormControl>
            <FormControl
              fullWidth={true}
              className="collegeOptionComponentInput"
            >
              <InputLabel htmlFor="Teacher Name">Stream</InputLabel>
              <Input
                value={teacher.stream}
                name="stream"
                onChange={collegeAddTeacherInputHandler} />
            </FormControl>
            <Button
              onClick={collegeAddTeacher}
              fullWidth={true}
              className="mt-3 cbtn"
            >
              Add
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;
