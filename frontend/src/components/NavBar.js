import React from "react";
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
} from "reactstrap";
import { Link } from "react-router-dom";

const NavBar = () => (
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
      </Nav>
    </div>
  </Navbar>
);

export default NavBar;
