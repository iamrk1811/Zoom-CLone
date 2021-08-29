import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
const Homepage = () => {
  return (
    <>
      <div className="container homepage-container text-center">
        <div className="homepage p-5">
          <h3>Hi, to use our service kindly register with us</h3>
          <div className="btn-container">
            <NavLink to="/collegeLogin" style={{textDecoration:"none"}}><Button className="bg-warning m-2 teacherRgBtn">College Login</Button></NavLink>
            <NavLink to="/teacherLogin" style={{textDecoration:"none"}}><Button className="bg-primary m-2 studentRgBtn">Teacher Login</Button></NavLink>
            <NavLink to="/studentLogin" style={{textDecoration:"none"}}><Button className="bg-info m-2 studentRgBtn">Student Login</Button></NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
