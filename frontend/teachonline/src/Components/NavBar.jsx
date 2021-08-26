import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <NavLink className="navbar-brand" to="/">
            <h3>Online Class</h3>
          </NavLink>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="#">
                Link
              </NavLink>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
