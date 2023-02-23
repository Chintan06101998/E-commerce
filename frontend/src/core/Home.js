import React from "react";
import { Link, useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

// function MyComponent() {
//   const navigate = useNavigate();

//   function handleClick() {
//     navigate("/users");
//   }

//   return (
//     <div>
//       <button onClick={handleClick}>Go to Users</button>
//     </div>
//   );
// }

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            A. Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Signout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
