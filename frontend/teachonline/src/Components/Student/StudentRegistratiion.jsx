import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";

const StudentRegistration = () => {
  const [student, setStudent] = useState({
    fullname: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const history = useHistory();
  // updating all value using state
  const studentInputHandler = (e) => {
    // if error msg box visible then hide it
    let errorMsg = document.getElementById("errorMsg");
    let errorMsgClassName = errorMsg.className;
    if (!errorMsgClassName.includes("d-none")) {
      errorMsg.classList.add("d-none");
    }

    const name = e.target.name;
    const value = e.target.value;

    setStudent((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  // handling form submit
  const studentRegisterHandler = (e) => {
    e.preventDefault();

    fetch("/studentRegisterBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullname: student.fullname,
        mobile: student.mobile,
        password: student.password,
        cpassword: student.cpassword
      })
    })
      .then(async (res) => {
        const data = await res.json();
        let errorMsg = document.getElementById("errorMsg");

        if (res.status === 409) {
          // user already register
          errorMsg.classList.remove("d-none");
          errorMsg.innerHTML = data.err;

          setStudent({
            fullname: "",
            mobile: "",
            password: "",
            cpassword: "",
          });
        } else if (res.status === 400) {
          // invalid input
          errorMsg.classList.remove("d-none");
          errorMsg.innerHTML = data.err;
        } else if (res.status === 500) {
          // server error
          errorMsg.classList.remove("d-none");
          errorMsg.innerHTML = data.err;
        } else if (res.status === 200) {
          // all okay teacher registration successful
          history.replace("/studentLogin");
        }
      })
      .catch((err) => {});
  };
  return (
    <div className="teacher-register-container container">
      <form method="POST" className="text-center">
        <div className="errorMsg d-none" id="errorMsg"></div>
        <Input
          className="teacheRgInput"
          type="text"
          placeholder="Full Name"
          value={student.fullname}
          onChange={studentInputHandler}
          name="fullname"
        />
        <br />
        <Input
          className="teacheRgInput"
          type="number"
          placeholder="Mobile"
          value={student.mobile}
          onChange={studentInputHandler}
          name="mobile"
        />
        <br />
        <Input
          className="teacheRgInput"
          type="password"
          placeholder="Password"
          value={student.password}
          onChange={studentInputHandler}
          name="password"
        />
        <br />
        <Input
          className="teacheRgInput"
          type="password"
          placeholder="Confirm Password"
          value={student.cpassword}
          onChange={studentInputHandler}
          name="cpassword"
        />
        <br />
        <Button
          type="submit"
          onClick={studentRegisterHandler}
          className="bg-primary px-3 py-2 color-white my-2"
        >
          Register
        </Button>
        <br />
        <NavLink to="/studentLogin" style={{ textDecoration: "none" }}>
          Already have an accoount ?
        </NavLink>
      </form>
    </div>
  );
};

export default StudentRegistration;
