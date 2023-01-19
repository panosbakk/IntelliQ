import React, { Component } from "react";
import { Link } from "react-router-dom";

class SurveyListComponent extends Component {
  constructor() {
    super();
    this.state = { questionnaire: {} };
  }
  componentDidMount() {
    const key = this.props.num;
    const myRequest = new Request(
      `http://localhost:9103/intelliq_api/questionnaire/QQ00${key}`
    );

    fetch(myRequest)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ questionnaire: data });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const key = this.props.num + 1;
    console.log(
      this.state.questionnaire.Questionnaire &&
        this.state.questionnaire.Questionnaire.questionnaireID
    );

    return this.state.questionnaire.Questionnaire ? (
      <>
        <h2>
          <Link
            to={{
              pathname: "/survey/" + key,
              state: this.state.questionnaire.Questionnaire,
            }}
          >
            Questionnaire{" "}
            {this.state.questionnaire.Questionnaire &&
              this.state.questionnaire.Questionnaire.questionnaireID}
          </Link>
        </h2>
        <h3>
          Questionnaire Title: "
          {this.state.questionnaire.Questionnaire &&
            this.state.questionnaire.Questionnaire.questionnaireTitle}
          "
        </h3>
      </>
    ) : (
      <h2>Loading...</h2>
    );
  }
}

export default SurveyListComponent;
