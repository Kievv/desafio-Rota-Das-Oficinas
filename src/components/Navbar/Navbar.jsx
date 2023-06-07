import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CCollapse,
  CNavbarToggler,
} from '@coreui/react';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CNavbar expand="lg" className="align-self-center" colorScheme="dark">
        <CContainer fluid>
          <CNavbarBrand href="/">Home</CNavbarBrand>
          <CNavbarToggler aria-label="Toggle navigation" aria-expanded={visible} onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="/conversor">Conversor</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/jogo">Jogo da Vida</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/restaurante">Restaurante</CNavLink>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  );
};

export default Navbar;
