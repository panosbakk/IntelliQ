import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";

class SurveyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }
  onCompleteComponent() {
    this.setState({ isCompleted: true });
  }
  render() {
    const json = this.props.json;
    let surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        json={json}
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
      />
    ) : null;
    let onCompleteComponent = this.state.isCompleted ? (
      <h2>Thank you for completing the survey! :D</h2>
    ) : null;
    return (
      <div>
        {surveyRender}
        {onCompleteComponent}
      </div>
    );
  }
}

export default SurveyComponent;
