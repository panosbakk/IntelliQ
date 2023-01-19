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
    const json = {
      questions: [
        {
          type: "checkbox",
          name: "car",
          title: "What car are you driving?",
          isRequired: true,
          hasSelectAll: true,
          hasNone: true,
          noneText: "None of the above",
          colCount: 2,
          choicesOrder: "asc",
          choices: [
            "Ford",
            "Tesla",
            "Bugatti",
            "Volkswagen",
            "Nissan",
            "Audi",
            "Mercedes-Benz",
            "BMW",
            "Peugeot",
            "Toyota",
            "Citroen",
          ],
        },
        {
          type: "radiogroup",
          name: "animals",
          title: "Do you have a favorite animal?",
          isRequired: true,
          colCount: 1,
          choices: ["Yes", "No"],
        },

        {
          type: "rating",
          name: "survey_rating",
          title:
            "On a scale of one to five, how likely are you to recommend our survey to a friend or colleague?",
          isRequired: true,
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "(Most unlikely)",
          maxRateDescription: "(Most likely)",
        },
        {
          type: "comment",
          name: "experience",
          visibleIf: "{survey_rating} >= 3  and {survey_rating} <= 5",
          title: "What can we do to make your experience more satisfying?",
        },
        {
          type: "comment",
          name: "disappointing_experience",
          visibleIf: "{survey_rating} < 3",
          title:
            "Please let us know why you had such a disappointing experience with our survey",
        },
      ],
    };
    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        json={json}
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
      />
    ) : null;
    var onCompleteComponent = this.state.isCompleted ? (
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
