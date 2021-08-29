import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const TeacherLogin = () => {
  return (
    <div className="teacher-login-container container">
      <form method="POST" className="text-center">
        <Input className="teacheLgInput" type="text" placeholder="Email ID" /> <br/>
        <Input className="teacheLgInput" type="password" placeholder="Password" /> <br/>
        <Button className="bg-success px-3 py-2 color-white my-2">Login</Button> <br/>
      </form>
    </div>
  );
};

export default TeacherLogin;
