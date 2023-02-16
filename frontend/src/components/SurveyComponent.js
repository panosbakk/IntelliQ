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

  onCompleteComponent = (result) => {
    this.setState({ isCompleted: true });
    const data = result.data;
    const questionnaireID = this.state.surveyName;
    const session = generateRandomString();
    console.log(session);
    Object.keys(data).forEach(async (key) => {
      let questionID = key;
      let optionID = data[key];
      console.log(questionID, optionID);
      try {
        await fetch(
          `http://localhost:9103/intelliq_api/doanswer/${questionnaireID}/${questionID}/${session}/${optionID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: key, answer: data[key] }),
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
  };

  jsonModifier(json) {
    const surveyJson = {
      name: json.questionnaireID,
      title: json.questionnaireTitle,
      pages: [{
        name: "page1",
        elements: []
      }]
    };
  
    json.questions.forEach((question) => {
      let hasOpenString = question.options.some((option) => option.opttxt === "<open string>");
  
      // Process questions with open strings
      if (hasOpenString) {
        json.questions.forEach((q) => {
          question.qtext = question.qtext.replace(`[*${q.qID}]`, `[${q.qtext}]`);
          question.options.forEach((opt) => {
            question.qtext = question.qtext.replace(`[*${opt.optID}]`, `[${opt.opttxt}]`);
          });
        });
  
        let openStringElement = {
          type: "text",
          name: question.qID,
          title: question.qtext,
          isRequired: question.required === "TRUE",
          visibleIf: question.required === "TRUE" ? `{${question.qID}} != ""` : null
        };
  
        surveyJson.pages[0].elements.push(openStringElement);
  
        json.questions.filter(q => q.qID !== question.qID).forEach((nextQuestion) => {
          let nextQuestionOption = question.options.find(opt => opt.nextqID === nextQuestion.qID);
          if (nextQuestionOption) {
            nextQuestion.visibleIf = nextQuestion.visibleIf
              ? `${nextQuestion.visibleIf} || {${question.qID}} = "${nextQuestionOption.optID}"`
              : `{${question.qID}} = "${nextQuestionOption.optID}"`;
          }
        });
      }
  
      // Process questions with multiple choice options
      else {
        let choices = question.options.map(option => ({
          value: option.optID,
          text: option.opttxt
        }));
  
        json.questions.forEach((q) => {
          question.qtext = question.qtext.replace(`[*${q.qID}]`, `[${q.qtext}]`);
          q.options.forEach((opt) => {
            question.qtext = question.qtext.replace(`[*${opt.optID}]`, `[${opt.opttxt}]`);
          });
        });
  
        let multipleChoiceElement = {
          type: "radiogroup",
          name: question.qID,
          title: question.qtext,
          isRequired: question.required === "TRUE",
          choices: choices,
          visibleIf: null
        };
  
        surveyJson.pages[0].elements.push(multipleChoiceElement);
  
        json.questions.filter(q => q.qID !== question.qID).forEach((nextQuestion) => {
          question.options.forEach((option) => {
            if (option.nextqID === nextQuestion.qID) {
              nextQuestion.visibleIf = nextQuestion.visibleIf
                ? `${nextQuestion.visibleIf} || {${question.qID}} = "${option.optID}"`
                : `{${question.qID}} = "${option.optID}"`;
            }
          });
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
