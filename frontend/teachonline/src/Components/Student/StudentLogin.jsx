import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

const StudentLogin = () => {
  return (
    <div className="teacher-login-container container">
      <form method="POST" className="text-center">
        <Input className="teacheLgInput" type="number" placeholder="Mobile" /> <br/>
        <Input className="teacheLgInput" type="password" placeholder="Password" /> <br/>
        <Button className="bg-primary px-3 py-2 color-white my-2">Login</Button> <br/>
        <NavLink to="/studentRegister" style={{textDecoration:"none"}}>Don't have an account ?</NavLink>
      </form>
    </div>
  );
};

export default StudentLogin;
