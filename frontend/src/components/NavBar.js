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
          <Link class="navbar-brand" to="/">
            IntelliQ
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample07"
            aria-controls="navbarsExample07"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample07">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" to="/survey">
                  Survey
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/survey-list">
                  Survey List
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Developers
                </a>
                <ul class="dropdown-menu" id="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      href="https://github.com/ntua-el18845"
                    >
                      1st dev link
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="https://github.com/ntua-el18845"
                    >
                      2nd dev link
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="https://github.com/ntua-el18845"
                    >
                      3rd dev link
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form role="search">
              <input
                class="form-control"
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
