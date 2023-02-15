import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import SurveyListComponent from "./SurveyListComponent";

export function SurveyListPage() {
  const [count, setCount] = useState(0);
  const [questionnaireIds, setQuestionnaireIds] = useState(0);

  useEffect(() => {
    fetch("http://localhost:9103/intelliq_api/questionnaireCount")
      .then((response) => response.json())
      .then((data) => {
        setCount(data.count);
        setQuestionnaireIds(data.questionnaireIds.sort());
      })
      .catch((error) => console.error(error));
  }, []);

  return count !== 0 ? (
    <>
      <h1>Survey List Page</h1>
      <Container>
        {[...Array(count)].map((_, i) => (
          <Row key={i} className="my-3">
            <Col>
              <SurveyListComponent questionnaireID={questionnaireIds[i]} />
            </Col>
          </Row>
        ))}
      </Container>
    </>
  ) : (
    <>
      <h1>Survey List Page</h1>
      <h2>No questionnaires found!</h2>
    </>
  );
}
