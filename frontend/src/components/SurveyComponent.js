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

  jsonModifier(json) {
    let surveyJson = {
      name: json.questionnaireID,
      title: json.questionnaireTitle,
      pages: [
        {
          name: "page1",
          elements: [],
        },
      ],
    };
    json.questions.forEach((question) => {
      if (question.type === "question") {
        let choices = [];
        question.options.forEach((option) => {
          choices.push({
            value: option.optID,
            text: option.opttxt,
          });
        });

        surveyJson.pages[0].elements.push({
          type: "radiogroup",
          name: question.qID,
          title: question.qtext,
          isRequired: question.required,
          choices: choices,
        });
      } else if (question.type === "profile") {
        surveyJson.pages[0].elements.push({
          type: "text",
          name: question.qID,
          title: question.qtext,
          isRequired: question.required,
        });
      }
    });
    return surveyJson;
  }

  render() {
    const json = this.jsonModifier(this.props.json);
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
