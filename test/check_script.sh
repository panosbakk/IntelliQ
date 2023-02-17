#Script for oral examination

#login
se228 login --username admin --passw softeng28_adminPassword

#check helthcheck
se2228 healthcheck

#show questionnaire in DB
se2228 questionnaire --questionnaire_ID Q000

#answer questionnaire
se2228 doanswer --questionnaire_ID Q000 --question_ID P01 --session_ID abcd --option_ID P01A1
se2228 doanswer --questionnaire_ID Q000 --question_ID Q01 --session_ID abcd --option_ID Q01A3
se2228 doanswer --questionnaire_ID Q000 --question_ID Q02 --session_ID abcd --option_ID Q02A1
se2228 doanswer --questionnaire_ID Q000 --question_ID Q03 --session_ID abcd --option_ID Q03A2
se2228 doanswer --questionnaire_ID Q000 --question_ID Q04 --session_ID abcd --option_ID Q04A1
se2228 doanswer --questionnaire_ID Q000 --question_ID Q08 --session_ID abcd --option_ID Q08A2

#getquestionanswers
se2228 getquestionanswers --questionnaire_ID Q000 --question_ID Q01

#resetall
se2228 resetall	

#questionnaire_upd
se2228 questionnaire_upd --source ../data/Q000.json

#show questionnaire in DB
se2228 questionnaire --questionnaire_ID Q000




