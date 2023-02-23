import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg dark">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
