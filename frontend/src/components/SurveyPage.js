import SurveyComponent from "./SurveyComponent";
import { useParams, useLocation } from "react-router-dom";
import React from "react";

export function SurveyPage() {
  const location = useLocation();
  const { id } = useParams();
  const { json } = location.state && location.state.json;
  if (!json) return <h1>No state</h1>;
  return (
    <>
      <h1>Survey page {id}</h1>
      <SurveyComponent json={json} />
    </>
  );
}
