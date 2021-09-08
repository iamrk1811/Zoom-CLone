import { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const AddStudent = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [studentAddedInfo, setStudentAddedInfo] = useState("");
  const [student, setStuden] = useState({
    name: "",
    mobile: "",
    password: "",
    stream: "",
  });

  const handleInputChange = () => {};

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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  type="password"
                />
              </FormControl>
              <FormControl
                fullWidth={true}
                className="studentOptionComponentInput"
              >
                <InputLabel htmlFor="Student Name">Stream</InputLabel>
                <Input
                  value={student.stream}
                  name="stream"
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button
                onClick={handleInputChange}
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
