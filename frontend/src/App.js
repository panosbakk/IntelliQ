import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Homepage } from "./components/Homepage";
import { SurveyPage } from "./components/SurveyPage";
import { SurveyListPage } from "./components/SurveyListPage";
import { StatisticsListPage } from "./components/StatisticsListPage";
import { NotFound } from "./components/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";

const App = () => {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/survey/:id" element={<SurveyPage />} />
          <Route path="/survey-list" element={<SurveyListPage />} />
          <Route
            path="/survey/statistics/:id"
            element={<StatisticsListPage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
