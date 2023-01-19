import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Homepage } from "./Homepage";
import { SurveyPage } from "./components/SurveyPage";
import { SurveyListPage } from "./components/SurveyListPage";
import { Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />

        <main className="container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/survey/:id" element={<SurveyPage />} />
            <Route path="/survey-list" element={<SurveyListPage />} />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;
