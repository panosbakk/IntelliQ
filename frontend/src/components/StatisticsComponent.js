import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const StatisticsComponent = ({ questionnaireID, qID }) => {
  const [questionData, setQuestionData] = useState(null);
  const [answerData, setAnswerData] = useState(null);
  const [chartCreated, setChartCreated] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:9103/intelliq_api/question/${questionnaireID}/${qID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
      })
      .catch((error) => console.error(error));
  }, [questionnaireID, qID]);

  useEffect(() => {
    fetch(
      `http://localhost:9103/intelliq_api/getquestionanswers/${questionnaireID}/${qID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAnswerData(data);
      })
      .catch((error) => console.error(error));
  }, [questionnaireID, qID]);

  useEffect(() => {
    if (questionData && answerData && !chartCreated) {
      const ctx = document.getElementById(`chart-${qID}`).getContext("2d");
      setChartCreated(true);
      const answerCount = {};
      answerData.answers.forEach((answer) => {
        if (answerCount[answer.ans]) {
          answerCount[answer.ans]++;
        } else {
          answerCount[answer.ans] = 1;
        }
      });
      const chartData = questionData.options.map((option) => {
        return {
          label: option.opttxt,
          data: answerCount[option.optID],
        };
      });
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartData.map((data) => data.label),
          datasets: [
            {
              label: questionData.qtext,
              data: chartData.map((data) => data.data),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              labels: {
                boxWidth: 0,
              },
            },
          },
        },
      });
    }
  }, [questionData, qID, answerData, chartCreated]);

  return questionData ? (
    <div>
      <canvas id={`chart-${qID}`} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default StatisticsComponent;
