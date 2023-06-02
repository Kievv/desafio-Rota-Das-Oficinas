import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="container">
        <ul>
          <li>
            <NavLink to="/conversor">Conversor</NavLink>
          </li>
          <li>
            <NavLink to="/jogo">Jogo da Vida</NavLink>
          </li>
          <li>
            <NavLink to="/restaurante">Restaurante</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
