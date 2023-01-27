import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import StatisticsComponent from "./StatisticsComponent";

export function StatisticsListPage() {
  const { id } = useParams();
  const [questionnaireData, setquestionnaireData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9103/intelliq_api/questionnaire/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setquestionnaireData(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return questionnaireData.Questionnaire ? (
    <>
      <h1>Statistics List Page for {id}</h1>
      {questionnaireData.Questionnaire.questions.map((question) => {
        if (question.qID.startsWith("Q")) {
          return (
            <StatisticsComponent
              key={question.qID}
              questionnaireID={questionnaireData.Questionnaire.questionnaireID}
              qID={question.qID}
            />
          );
        }
        return null;
      })}
    </>
  ) : (
    <h2>Loading...</h2>
  );
}
