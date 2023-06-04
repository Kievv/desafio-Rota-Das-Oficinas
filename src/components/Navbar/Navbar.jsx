import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <div className="container">
        <ul className="lista">
          <li className="item-lista">
            <NavLink to="/conversor">CONVERSOR</NavLink>
          </li>
          <li className="item-lista">
            <NavLink to="/jogo">JOGO DA VIDA</NavLink>
          </li>
          <li className="item-lista">
            <NavLink to="/restaurante">RESTAURANTE</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
