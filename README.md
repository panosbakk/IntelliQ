# Software Engineering Project 2022-2023

### Group Name: Softeng2022-28

| Surname    | Name       | NTUA_ID  |
| ---------- | ---------- | -------- |
| Batsari    | Vasiliki   | 03118046 |
| Tournaris  | Lefteris   | 03118845 |
| Bakaloudis | Panagiotis | 03119600 |

### This project aims at the creation of 'smart' questionnaires, which are used for online surveys.

The term 'smart' highlights that the questionnaire is dynamic. The questions may vary from user to user, since the next question that appears in the questionnaire is based on the user's answers on the previous questions.

## Dependencies

1. Install [NodeJs](https://nodejs.org/en/)
2. Frontend:

   a. [React Router](https://reactrouter.com/en/main)
   `npm i react-router-dom@latest`

   b. [SurveyJS](https://surveyjs.io/)
   `npm i react-survey@latest`

   c. [React](https://reactjs.org/)
   `npm i react@latest`

   d. [React Dom](https://reactjs.org/docs/react-dom.html)
   `npm i react-dom@latest`

   e. [React bootstrap](https://reactstrap.github.io/)
   `npm i reactstrap@latest`

   f. [ChartJS](https://www.chartjs.org/)
   `npm i chart.js@latest`

3. Backend:

   a. [Express](https://expressjs.com/)
   `npm i express@latest`

   b. [Cors](https://www.npmjs.com/package/cors)
   `npm i cors@latest`

   c. [Mongoose](https://mongoosejs.com/)
   `npm i mongoose@latest`

   d. [Json2csv](https://www.npmjs.com/package/json2csv)
   `npm i json2csv@latest`

   e. [Body Parser](https://www.npmjs.com/package/body-parser)
   `npm i body-parser@latest`

   f. [Custom env](https://www.npmjs.com/package/custom-env)
   `npm i custom-env@latest`

   g. [JSON web token](https://www.npmjs.com/package/jsonwebtoken)
   `npm i jsonwebtoken@latest`

   h. [Bcrypt](https://www.npmjs.com/package/bcrypt)
   `npm i bcrypt@latest`

   i. [multer](https://www.npmjs.com/package/multer)
   `npm i multer@latest`

4. CLI:

   a. [Commander](https://www.npmjs.com/package//commander)
   `npm i commander@latest`

   b. [Axios](https://axios-http.com/docs/intro)
   `npm i axios@latest`

   c. [Query Selector](https://www.npmjs.com/package/query-selector)
   `npm i query-selector@latest`

   d. [Form Data](https://www.npmjs.com/package/form-data)
   `npm i form-data@latest`

## Available Scripts

In the project directory, you can run:

### `npm run install-all`

It installs all (frontend, api-backend and cli) dependencies needed to run the application.

### `npm start`

It runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
It starts the backend server.\
API is running on port 9103.

The page will reload every time you make changes.\
You may also see any lint errors in the console.

## Json Web Token

In order to log in as administrator you need to set the following environment variable:

1.  In Linux or macOS:

```shell
$ export kypellokaiprwta8lhmasthnfiladelfeia=mySecureKey
```

2. In Windows powershell run the following command:

```shell
$ setx kypellokaiprwta8lhmasthnfiladelfeia mySecureKey
```
