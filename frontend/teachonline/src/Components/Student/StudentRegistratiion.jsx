import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
const StudentRegistration = () => {
  return (
    <div className="teacher-register-container container">
      <form method="POST" className="text-center">
        <Input className="teacheRgInput" type="text" placeholder="Full Name" /> <br/>
        <Input className="teacheRgInput" type="number" placeholder="Mobile" /> <br/>
        <Input className="teacheRgInput" type="password" placeholder="Password" /> <br/>
        <Input className="teacheRgInput" type="password" placeholder="Confirm Password" /> <br/>
        <Button className="bg-primary px-3 py-2 color-white my-2">Register</Button> <br/>
        <NavLink to="/studentLogin" style={{textDecoration:"none"}}>Already have an accoount ?</NavLink>
      </form>
    </div>
  );
};

export default StudentRegistration;
