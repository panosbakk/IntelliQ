import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import SurveyListComponent from "./SurveyListComponent";

export function SurveyListPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:9103/intelliq_api/questionnaireCount")
      .then((response) => response.json())
      .then((data) => setCount(data.count))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>Survey List Page</h1>
      <Container>
        {[...Array(count)].map((_, i) => (
          <Row key={i} className="my-3">
            <Col>
              <SurveyListComponent num={i} />
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}
