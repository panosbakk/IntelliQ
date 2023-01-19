import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        aria-label="Eighth navbar example"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            IntelliQ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample07"
            aria-controls="navbarsExample07"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample07">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/survey">
                  Survey
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/survey-list">
                  Survey List
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Developers
                </a>
                <ul className="dropdown-menu" id="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://github.com/ntua-el18046"
                    >
                      Vicky Batsari
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://github.com/ntua-el18845"
                    >
                      Lefteris Tournaris
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://github.com/ntua-el19600"
                    >
                      Panagiotis Bakaloudis
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form role="search">
              <input
                className="form-control"
                type="search"
                placeholder=" Useless Searchbar for now"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
