import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const CollegeLogin = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    // if user is already logged in/ already stored token
    const token = Cookies.get('authToken');
    if (token) {
      fetch("/collegeVerifyUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((result) => {
        if (result.status === 200) {
          history.replace('/collegeDashboard');
        }
      })
    }
  }, []);

  const collegeLoginFormHandler = (e) => {
    e.preventDefault();

    fetch("/collegeLoginBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (result) => {
        const data = await result.json();

        if (result.status === 400 || !result) {
          let errorMsg = document.getElementById("errorMsg");
          errorMsg.classList.remove("d-none");
          errorMsg.innerHTML = data.err;
        } else if (result.status === 200) {
          // on successful login
          history.replace("/collegeDashboard");
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="container collegeLoginContainer">
      <div className="row">
        <div
          className="col-sm-12 col-md-8 col-lg-6"
          style={{ display: "block", margin: "auto" }}
        >
          <h3 className="text-center my-4">
            College / School / Organization Login Page
          </h3>
          <form className="form-group collegeLoginForm text-center">
            <div className="errorMsg d-none" id="errorMsg"></div>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button className="btn" onClick={collegeLoginFormHandler}>
              Login
            </Button>
            <NavLink to="/collegeRegister" style={{ textDecoration: "none" }}>
              Don't have an account ?
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollegeLogin;
