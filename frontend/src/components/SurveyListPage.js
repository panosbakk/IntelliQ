import SurveyListComponent from "./SurveyListComponent";

export function SurveyListPage() {
  const json1 = {
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

  return (
    <>
      <h1>Survey list page</h1>
      {[...Array(4)].map((_, i) => (
        <SurveyListComponent json={json1} key={i} num={i} />
      ))}
    </>
  );
}
