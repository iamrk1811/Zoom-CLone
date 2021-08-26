import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
const Homepage = () => {
  return (
    <>
      <div className="container homepage-container text-center">
        <div className="homepage p-5">
          <h3>Hi, to use our service kindly register with us</h3>
          <div className="btn-container">
            <NavLink to="/teacherRegister" style={{textDecoration:"none"}}><Button className="bg-success m-2 teacherRgBtn">Register as Teacher</Button></NavLink>
            <NavLink to="/studentRegister" style={{textDecoration:"none"}}><Button className="bg-primary m-2 studentRgBtn">Register as Student</Button></NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
