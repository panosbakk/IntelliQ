import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import StatisticsComponent from "./StatisticsComponent";

export function StatisticsListPage() {
  const { id } = useParams();
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:9103/intelliq_api/questionnaire/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const questionCount = data.Questionnaire.questions.length;
        setQuestionCount(questionCount);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      <h1>Statistics List Page for {id}</h1>
      {[...Array(questionCount)].map((_, i) => (
        <StatisticsComponent num={i} />
      ))}
    </>
  );
}
