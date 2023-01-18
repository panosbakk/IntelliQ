import SurveyListComponent from "./SurveyListComponent";

export function SurveyListPage() {
  return (
    <>
      <h1>Survey list page</h1>
      {[...Array(4)].map((_, i) => (
        <SurveyListComponent key={i} num={i} />
      ))}
    </>
  );
}
