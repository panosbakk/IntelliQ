import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Navbar color="dark" dark expand="md">
      <div className="container">
        <NavbarBrand tag={Link} to="/">
          IntelliQ
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/survey-list">
              Survey List
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Developers
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="https://github.com/ntua-el18046">
                Vicky Batsari
              </DropdownItem>
              <DropdownItem href="https://github.com/ntua-el18845">
                Lefteris Tournaris
              </DropdownItem>
              <DropdownItem href="https://github.com/ntua-el19600">
                Panagiotis Bakaloudis
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {isLoggedIn ? (
            <NavItem className="ml-auto">
              <Button tag={Link} to="/logout" color="secondary">
                Logout
              </Button>
            </NavItem>
          ) : (
            <NavItem className="ml-auto">
              <Button tag={Link} to="/login" color="primary" className="mr-3">
                Login
              </Button>
            </NavItem>
          )}
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
