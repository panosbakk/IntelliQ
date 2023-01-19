import SurveyComponent from "./SurveyComponent";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

export function SurveyPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9103/intelliq_api/questionnaire/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [id]);

  return data ? (
    <>
      <h1>Survey page {id}</h1>
      <SurveyComponent json={data.Questionnaire} />
    </>
  ) : (
    <h2>Loading...</h2>
  );
}
