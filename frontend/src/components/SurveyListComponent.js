import React, { Component } from "react";
import { Card, Button } from "reactstrap";
import { Link } from "react-router-dom";

class SurveyListComponent extends Component {
  constructor() {
    super();
    this.state = { questionnaire: {} };
  }
  componentDidMount() {
    const questionnaireID = this.props.questionnaireID;

    const myRequest = new Request(
      `http://localhost:9103/intelliq_api/questionnaire/${questionnaireID}`
    );

    fetch(myRequest)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ questionnaire: data });
      })
      .catch((error) => {
        this.setState({ questionnaire: null });
        console.error(error);
      });
  }

  isUserAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  render() {
    const questionnaireID = this.props.questionnaireID;
    return this.state.questionnaire &&
      this.state.questionnaire.questionnaireID ? (
      <Card>
        <h3 className="card-header">
          Questionnaire{" "}
          {this.state.questionnaire && this.state.questionnaire.questionnaireID}{" "}
          {" - "}"
          {this.state.questionnaire &&
            this.state.questionnaire.questionnaireTitle}
          "
          <div className="text-right">
            <Link to={`/survey/${questionnaireID}`}>
              <Button color="primary" style={{ marginRight: "10px" }}>
                View Questionnaire
              </Button>
            </Link>
            {this.isUserAuthenticated() && (
              <Link to={`/survey/statistics/${questionnaireID}`}>
                <Button color="primary">View Statistics</Button>
              </Link>
            )}
          </div>
        </h3>
      </Card>
    ) : (
      <Card>
        {" "}
        <h3 className="card-header">
          Questionnaire {questionnaireID} not found!
        </h3>
      </Card>
    );
  }
}

export default SurveyListComponent;
