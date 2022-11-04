import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Homepage } from "./Homepage";
import { SurveyPage } from "./components/SurveyForm";
import { Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />

        <main className="container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/survey" element={<SurveyPage />} />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;
