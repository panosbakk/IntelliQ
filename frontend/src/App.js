import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Homepage } from "./components/Homepage";
import { SurveyPage } from "./components/SurveyPage";
import { SurveyListPage } from "./components/SurveyListPage";
import { StatisticsListPage } from "./components/StatisticsListPage";
import { NotFound } from "./components/NotFound";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";


const App = () => {
  let history = useNavigate();

  const handleRegisterClick = () => {
    history.push("/register");
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-end">
        <Link to="/register">
        <button className="btn btn-primary mr-3" onClick={handleRegisterClick}>
          Register
        </button>
        </Link>
        <Link to="/login">
        <button className="btn btn-secondary" onClick={handleLoginClick}>
          Login
        </button>
        </Link>
      </div>
      <main className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/survey/:id" element={<SurveyPage />} />
          <Route path="/survey-list" element={<SurveyListPage />} />
          <Route
            path="/survey/statistics/:id"
            element={<StatisticsListPage />}
          />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;

