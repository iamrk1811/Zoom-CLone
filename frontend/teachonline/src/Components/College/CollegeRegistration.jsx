import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";

const CollegeRegistration = () => {
  const history = useHistory();
  const states = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  //   college state
  const [college, setCollege] = useState({
    collegeName: "",
    website: "",
    state: "",
    address: "",
    email: "",
    password: "",
    cpassword: "",
  });

  //   college state change input handler to update to the state
  const collegeRegisterInputHandler = (e) => {
    // if error msg box visible then hide it
    let errorMsg = document.getElementById("errorMsg");
    let errorMsgClassName = errorMsg.className;
    if (!errorMsgClassName.includes("d-none")) {
      errorMsg.classList.add("d-none");
    }

    const name = e.target.name;
    const value = e.target.value;

    setCollege((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //   form handler
  const collegeRegisterFormHandler = (e) => {
    e.preventDefault();
    fetch("/collegeRegisterBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collegeName: college.collegeName,
        website: college.website,
        state: college.state,
        address: college.address,
        email: college.email,
        password: college.password,
        cpassword: college.cpassword,
      }),
    })
      .then(async (res) => {
        const errorMsg = document.getElementById("errorMsg");
        const data = await res.json();

        if (res.status === 409) {
          // user already register
          errorMsg.classList.remove("d-none");
          errorMsg.innerHTML = data.err;

          setCollege({
            collegeName: "",
            website: "",
            state: "",
            address: "",
            email: "",
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
          history.replace("/collegeLogin");
        }
      })
      .catch((err) => {
        // Somehting went wrong
        // TODO
      });
  };

  return (
    <div className="container collegeRegisterContainer">
      <div className="row">
        <div
          className="col-sm-12 col-md-8 col-lg-6"
          style={{ display: "block", margin: "auto" }}
        >
          <h3 className="text-center my-4">
            College / School / Organization Register Page
          </h3>
          <form
            method="POST"
            className="form-group collegeRegisterForm text-center"
          >
            <div className="errorMsg d-none" id="errorMsg"></div>
            <input
              className="form-control"
              type="text"
              placeholder="College/School/Organization Name"
              name="collegeName"
              value={college.collegeName}
              onChange={collegeRegisterInputHandler}
            />
            <input
              className="form-control"
              type="text"
              placeholder="Website URL"
              name="website"
              value={college.website}
              onChange={collegeRegisterInputHandler}
            />
            <select
              className="form-control"
              name="state"
              onChange={collegeRegisterInputHandler}
            >
              {states.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <input
              className="form-control"
              type="text"
              placeholder="Address"
              name="address"
              value={college.address}
              onChange={collegeRegisterInputHandler}
            />
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              value={college.email}
              onChange={collegeRegisterInputHandler}
            />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={college.password}
              onChange={collegeRegisterInputHandler}
            />
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              value={college.cpassword}
              onChange={collegeRegisterInputHandler}
            />
            <Button className="btn" onClick={collegeRegisterFormHandler}>
              Register
            </Button>
            <NavLink to="/collegeLogin" style={{ textDecoration: "none" }}>
              Already have an account ?
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollegeRegistration;
