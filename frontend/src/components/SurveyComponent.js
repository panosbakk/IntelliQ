import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";

// randon 4-character session id generator
function generateRandomString() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class SurveyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false,
      surveyName: this.props.json.questionnaireID,
    };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  onCompleteComponent = async (result) => {
    const data = result.data;
    console.log(data);
    const questionnaireID = this.state.surveyName;
    const session = generateRandomString();
    console.log(session);
    try {
      await fetch(
        `http://localhost:9103/intelliq_api/submitanswers/${questionnaireID}/${session}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers: data }),
        }
      );
      this.setState({ isCompleted: true });
    } catch (error) {
      console.log(error);
    }
  };

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
      let hasOpenString = question.options.some(
        (option) => option.opttxt === "<open string>"
      );
      if (hasOpenString) {
        question.options.forEach((option) => {
          let nextQuestion = json.questions.find(
            (q) => q.qID === option.nextqID
          );
          if (nextQuestion && question.required === "TRUE") {
            nextQuestion.visibleIf = `{${question.qID}} != ""`;
          }
        });

        json.questions.forEach((q) => {
          question.qtext = question.qtext.replace(
            `[*${q.qID}]`,
            `[${q.qtext}]`
          );
          question.options.forEach((opt) => {
            question.qtext = question.qtext.replace(
              `[*${opt.optID}]`,
              `[${opt.opttxt}]`
            );
          });
        });

        surveyJson.pages[0].elements.push({
          type: "text",
          name: question.qID,
          title: question.qtext,
          isRequired: question.required === "TRUE",
          visibleIf: question.visibleIf ? question.visibleIf : null,
        });
      } else {
        let choices = [];
        question.options.forEach((option) => {
          choices.push({
            value: option.optID,
            text: option.opttxt,
          });
          let nextQuestion = json.questions.find(
            (q) => q.qID === option.nextqID
          );
          if (nextQuestion) {
            nextQuestion.visibleIf = nextQuestion.visibleIf
              ? `${nextQuestion.visibleIf} || {${question.qID}} = "${option.optID}"`
              : `{${question.qID}} = "${option.optID}"`;
          }
        });

        json.questions.forEach((q) => {
          question.qtext = question.qtext.replace(
            `[*${q.qID}]`,
            `[${q.qtext}]`
          );
          q.options.forEach((opt) => {
            question.qtext = question.qtext.replace(
              `[*${opt.optID}]`,
              `[${opt.opttxt}]`
            );
          });
        });

        surveyJson.pages[0].elements.push({
          type: "radiogroup",
          name: question.qID,
          title: question.qtext,
          isRequired: question.required === "TRUE",
          choices: choices,
          visibleIf: question.visibleIf ? question.visibleIf : null,
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
        showCompletedPage={true}
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
