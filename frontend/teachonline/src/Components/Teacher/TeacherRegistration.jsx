import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";


const TeacherRegistration = () => {
  // teacher state
  const [teacher, setTeacher] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const history = useHistory();

  // Handling teacher register input field
  const teacherRegisterInputHandler = (e) => {
    // if error msg box visible then hide it
    let errorMsg = document.getElementById("errorMsg");
    let errorMsgClassName = errorMsg.className;
    if (!errorMsgClassName.includes("d-none")) {
      errorMsg.classList.add("d-none");
    }

    let name = e.target.name;
    let value = e.target.value;

    // Setting the value of state and if 'name' matched with prev name then update that value with current value
    setTeacher((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const teacherRegisterHandler = (e) => {
    e.preventDefault();
    // trying to register teacher
    fetch("/teacherRegisterBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: teacher.fullname,
        email: teacher.email,
        mobile: teacher.mobile,
        password: teacher.password,
        cpassword: teacher.cpassword,
      }),
    })
      .then(async (res) => {
        let errorMsg = document.getElementById("errorMsg");
        const data = await res.json();

        if (res.status === 409) {
          // user already register
          errorMsg.classList.remove("d-none");
          errorMsg.innerHTML = data.err;

          setTeacher({
            fullname: "",
            email: "",
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
          history.replace("/teacherLogin");
        }
      })
      .catch((err) => {
        // Somehting went wrong
        // TODO
      });
  };

  return (
    <div className="teacher-register-container container">
      <form method="POST" className="text-center">
        <div className="errorMsg d-none" id="errorMsg"></div>
        <Input required
          className="teacheRgInput"
          type="text"
          placeholder="Full Name"
          value={teacher.fullname}
          name="fullname"
          onChange={teacherRegisterInputHandler}
        />
        <br />
        <Input required
          className="teacheRgInput"
          type="text"
          placeholder="Email ID"
          value={teacher.email}
          name="email"
          onChange={teacherRegisterInputHandler}
        />
        <br />
        <Input required
          className="teacheRgInput"
          type="number"
          placeholder="Mobile"
          value={teacher.mobile}
          name="mobile"
          onChange={teacherRegisterInputHandler}
        />
        <br />
        <Input required
          className="teacheRgInput"
          type="password"
          placeholder="Password"
          value={teacher.password}
          name="password"
          onChange={teacherRegisterInputHandler}
        />
        <br />
        <Input required
          className="teacheRgInput"
          type="password"
          placeholder="Confirm Password"
          value={teacher.cpassword}
          name="cpassword"
          onChange={teacherRegisterInputHandler}
        />
        <br />
        <Button
          className="bg-success px-3 py-2 color-white my-2"
          type="submit"
          onClick={teacherRegisterHandler}
        >
          Register
        </Button>
        <br />
        <NavLink to="teacherLogin" style={{ textDecoration: "none" }}>
          Already have an accoount ?
        </NavLink>
      </form>
    </div>
  );
};

export default TeacherRegistration;
