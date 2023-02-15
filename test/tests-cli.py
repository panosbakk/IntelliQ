import subprocess

class bcolors:
  OKGREEN = '\033[92m'
  WARNING = '\033[93m'
  FAIL = '\033[91m'
  ENDC = '\033[0m'

failed_healthcheck_cli_call = ['node', '../cli/cli.js', 'healthcheck']
failed_healthcheck_cli_call_expected = "Error: Access denied. You should log in in order to access this page."

login_cli_call = ['node', '../cli/cli.js', 'login', '--username', 'admin', '--password', 'softeng28_adminPassword']
login_cli_call_expected = "User successfully logged in."

healthcheck_cli_call = ['node', '../cli/cli.js', 'healthcheck']
healthcheck_cli_call_expected = "{  status: 'OK',  dbconnection: 'mongodb+srv://el19600:c2mot3n5@intelliq.25mg5s4.mongodb.net/?retryWrites=true&w=majority'}"

resetall_cli_call = ['node', '../cli/cli.js', 'resetall']
resetall_cli_call_expected = "{ message: 'Answers collection has been successfully cleared.' }"

questionnaire_upd_cli_call = ['node', '../cli/cli.js', 'questionnaire_upd', '--source', '../data/QQ000.json']
questionnaire_upd_cli_call_2 = ['node', '../cli/cli.js', 'questionnaire_upd', '--source', '../data/QQ001.json']
questionnaire_upd_cli_call_expected = "{ message: 'Questionnaire uploaded successfully.' }"

#http://localhost:9103/intelliq_api/questionnaire/QQ000
questionnaire_cli_call = ['node', '../cli/cli.js', 'questionnaire', '--questionnaire_ID', 'QQ000']
questionnaire_cli_call_expected = "{  questionnaireID: 'QQ000',  questionnaireTitle: 'My first research questionnaire',  keywords: [ 'sports', 'islands', 'timezone' ],  questions: [    {      qID: 'P00',      qtext: 'Ποιο είναι το mail σας;',      required: 'FALSE',      type: 'profile',      options: [Array]    },    {      qID: 'P01',      qtext: 'Ποια είναι η ηλικία σας;',      required: 'TRUE',      type: 'profile',      options: [Array]    },    {      qID: 'Q01',      qtext: 'Ποιο είναι το αγαπημένο σας χρώμα;',      required: 'TRUE',      type: 'question',      options: [Array]    },    {      qID: 'Q02',      qtext: 'Ασχολείστε με το ποδόσφαιρο;',      required: 'TRUE',      type: 'question',      options: [Array]    },    {      qID: 'Q03',      qtext: 'Τι ομάδα είστε;',      required: 'TRUE',      type: 'question',      options: [Array]    },    {      qID: 'Q04',      qtext: 'Έχετε ζήσει σε νησί;',      required: 'TRUE',      type: 'question',      options: [Array]    },    {      qID: 'Q05',      qtext: 'Με δεδομένο ότι απαντήσατε [*Q04A1] στην ερώτηση [*Q04]: Ποια η σχέση σας με το θαλάσσιο σκι;',      required: 'TRUE',      type: 'question',      options: [Array]    },    {      qID: 'Q06',      qtext: 'Είστε χειμερινός κολυμβητής',      required: 'TRUE',      type: 'question',      options: [Array]    },    {      qID: 'Q07',      qtext: 'Κάνετε χειμερινό σκι;',      required: 'TRUE',      type: 'question',      options: [Array]    },    {      qID: 'Q08',      qtext: 'Συμφωνείτε να αλλάζει η ώρα κάθε χρόνο;',      required: 'TRUE',      type: 'question',      options: [Array]    },    {      qID: 'Q09',      qtext: 'Με δεδομένο ότι απαντήσατε [*Q08A2] στην ερώτηση [*Q08]: Προτιμάτε τη θερινή ή την χειμερινή ώρα;',      required: 'TRUE',      type: 'question',      options: [Array]    }  ]}"

#http://localhost:9103/intelliq_api/questionnaire/QQ000?format=csv
csv_questionnaire_cli_call = ['node', '../cli/cli.js', 'questionnaire', '--questionnaire_ID', 'QQ000', '--format', 'csv']
csv_questionnaire_cli_call_expected = '"questionnaireID","questionnaireTitle","keywords","questions""QQ000","My first research questionnaire","[""sports"",""islands"",""timezone""]","[{""qID"":""P00"",""qtext"":""Ποιο είναι το mail σας;"",""required"":""FALSE"",""type"":""profile"",""options"":[{""optID"":""P00TXT"",""opttxt"":""<open string>"",""nextqID"":""P01""}]},{""qID"":""P01"",""qtext"":""Ποια είναι η ηλικία σας;"",""required"":""TRUE"",""type"":""profile"",""options"":[{""optID"":""P01A1"",""opttxt"":""<30"",""nextqID"":""Q01""},{""optID"":""P01A2"",""opttxt"":""30-50"",""nextqID"":""Q01""},{""optID"":""P01A3"",""opttxt"":""50-70"",""nextqID"":""Q01""},{""optID"":""P01A4"",""opttxt"":"">70"",""nextqID"":""Q01""}]},{""qID"":""Q01"",""qtext"":""Ποιο είναι το αγαπημένο σας χρώμα;"",""required"":""TRUE"",""type"":""question"",""options"":[{""optID"":""Q01A1"",""opttxt"":""Πράσινο"",""nextqID"":""Q02""},{""optID"":""Q01A2"",""opttxt"":""Κόκκινο"",""nextqID"":""Q02""},{""optID"":""Q01A3"",""opttxt"":""Κίτρινο"",""nextqID"":""Q02""}]},{""qID"":""Q02"",""qtext"":""Ασχολείστε με το ποδόσφαιρο;"",""required"":""TRUE"",""type"":""question"",""options"":[{""optID"":""Q02A1"",""opttxt"":""Ναι"",""nextqID"":""Q03""},{""optID"":""Q02A2"",""opttxt"":""Οχι"",""nextqID"":""Q04""}]},{""qID"":""Q03"",""qtext"":""Τι ομάδα είστε;"",""required"":""TRUE"",""type"":""question"",""options"":[{""optID"":""Q03A1"",""opttxt"":""Παναθηναϊκός"",""nextqID"":""Q04""},{""optID"":""Q03A2"",""opttxt"":""Ολυμπιακός"",""nextqID"":""Q04""},{""optID"":""Q03A3"",""opttxt"":""ΑΕΚ"",""nextqID"":""Q04""}]},{""qID"":""Q04"",""qtext"":""Έχετε ζήσει σε νησί;"",""required"":""TRUE"",""type"":""question"",""options"":[{""optID"":""Q04A1"",""opttxt"":""Ναι"",""nextqID"":""Q05""},{""optID"":""Q04A2"",""opttxt"":""Οχι"",""nextqID"":""Q06""}]},{""qID"":""Q05"",""qtext"":""Με δεδομένο ότι απαντήσατε [*Q04A1] στην ερώτηση [*Q04]: Ποια η σχέση σας με το θαλάσσιο σκι;"",""required"":""TRUE"",""type"":""question"",""options"":[{""optID"":""Q05A1"",""opttxt"":""Καμία"",""nextqID"":""Q07""},{""optID"":""Q05A2"",""opttxt"":""Μικρή"",""nextqID"":""Q07""},{""optID"":""Q05A3"",""opttxt"":""Μεγάλη"",""nextqID"":""Q07""}]},{""qID"":""Q06"",""qtext"":""Είστε χειμερινός κολυμβητής"",""required"":""TRUE"",""type"":""question"",""options"":[{""optID"":""Q06A1"",""opttxt"":""Ναι"",""nextqID"":""Q07""},{""optID"":""Q06A2"",""opttxt"":""Οχι"",""nextqID"":""Q07""}]},{""qID"":""Q07"",""qtext"":""Κάνετε χειμερινό σκι;"",""required"":""TRUE"",""type"":""question"",""options"":[{""optID"":""Q07A1"",""opttxt"":""Σπάνια - καθόλου"",""nextqID"":""Q08""},{""optID"":""Q07A2"",""opttxt"":""Περιστασιακά"",""nextqID"":""Q08""},{""optID"":""Q07A3"",""opttxt"":""Τακτικά"",""nextqID"":""Q08""}]},{""qID"":""Q08"",""qtext"":""Συμφωνείτε να αλλάζει η ώρα κάθε χρόνο;"",""required"":""TRUE"",""type"":""question"",""options"":[{""optID"":""Q08A1"",""opttxt"":""Ναι"",""nextqID"":""-""},{""optID"":""Q08A2"",""opttxt"":""Οχι"",""nextqID"":""Q09""}]},{""qID"":""Q09"",""qtext"":""Με δεδομένο ότι απαντήσατε [*Q08A2] στην ερώτηση [*Q08]: Προτιμάτε τη θερινή ή την χειμερινή ώρα;"",""required"":""TRUE"",""type"":""question"",""options"":[{""optID"":""Q09A1"",""opttxt"":""Θερινή"",""nextqID"":""-""},{""optID"":""Q09A2"",""opttxt"":""Χειμερινή"",""nextqID"":""-""}]}]"'

#http://localhost:9103/intelliq_api/question/QQ000/Q04
question_cli_call = ['node', '../cli/cli.js', 'question', '--questionnaire_ID', 'QQ000', '--question_ID', 'Q04']
question_cli_call_expected = "{  questionnaireID: 'QQ000',  qID: 'Q04',  qtext: 'Έχετε ζήσει σε νησί;',  required: 'TRUE',  type: 'question',  options: [    { optID: 'Q04A1', opttxt: 'Ναι', nextqID: 'Q05' },    { optID: 'Q04A2', opttxt: 'Οχι', nextqID: 'Q06' }  ]}"

#http://localhost:9103/intelliq_api/question/QQ000/Q04?format=csv
csv_question_cli_call = ['node', '../cli/cli.js', 'question', '--questionnaire_ID', 'QQ000', '--question_ID', 'Q04', '--format', 'csv']
csv_question_cli_call_expected = '"questionnaireID","qID","qtext","required","type","options""QQ000","Q04","Έχετε ζήσει σε νησί;","TRUE","question","[{""optID"":""Q04A1"",""opttxt"":""Ναι"",""nextqID"":""Q05""},{""optID"":""Q04A2"",""opttxt"":""Οχι"",""nextqID"":""Q06""}]"'

doanswer_cli_call = ['node', '../cli/cli.js', 'doanswer', '--questionnaire_ID', 'QQ000', '--question_ID', 'Q05', '--session_ID', '6666', '--option_ID', 'Q05A1']
doanswer_cli_call_expected = ""

#http://localhost:9103/intelliq_api/getsessionanswers/QQ000/6666
getsessionanswers_cli_call = ['node', '../cli/cli.js', 'getsessionanswers', '--questionnaire_ID', 'QQ000', '--session_ID', '6666']
getsessionanswers_cli_call_expected = "{  questionnaireID: 'QQ000',  session: '6666',  answers: [ { qID: 'Q05', ans: 'Q05A1' } ]}"

#http://localhost:9103/intelliq_api/getsessionanswers/QQ000/6666?format=csv
csv_getsessionanswers_cli_call = ['node', '../cli/cli.js', 'getsessionanswers', '--questionnaire_ID', 'QQ000', '--session_ID', '6666', '--format', 'csv']
csv_getsessionanswers_cli_call_expected = '"questionnaireID","session","answers""QQ000","6666","[{""qID"":""Q05"",""ans"":""Q05A1""}]"'

#http://localhost:9103/intelliq_api/getquestionanswers/QQ000/Q05
getquestionanswers_cli_call = ['node', '../cli/cli.js', 'getquestionanswers', '--questionnaire_ID', 'QQ000', '--question_ID', 'Q05']
getquestionanswers_cli_call_expected = "{  questionnaireID: 'QQ000',  questionID: 'Q05',  answers: [ { session: '6666', ans: 'Q05A1' } ]}"

#http://localhost:9103/intelliq_api/getquestionanswers/QQ000/Q05?format=csv
csv_getquestionanswers_cli_call = ['node', '../cli/cli.js', 'getquestionanswers', '--questionnaire_ID', 'QQ000', '--question_ID', 'Q05', '--format', 'csv']
csv_getquestionanswers_cli_call_expected = '"questionnaireID","questionID","answers""QQ000","Q05","[{""session"":""6666"",""ans"":""Q05A1""}]"'

resetq_cli_call = ['node', '../cli/cli.js', 'resetq', '--questionnaire_ID', 'QQ000']
resetq_cli_call_expected = "{ status: 'OK' }"

logout_cli_call = ['node', '../cli/cli.js', 'logout']
logout_cli_call_expected = "User successfully logged out."

def failed_healthcheck_cli_test():
    process = subprocess.run(failed_healthcheck_cli_call, capture_output=True)
    response = process.stdout.decode('ascii').replace('\n', '')
    if response == failed_healthcheck_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 0 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 0 failed ' + bcolors.ENDC + 'X')

def login_cli_test():
    process = subprocess.run(login_cli_call, capture_output=True)
    response = process.stdout.decode('ascii').replace('\n', '')
    if response == login_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 1 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 1 failed ' + bcolors.ENDC + 'X')

def healthcheck_cli_test():
    process = subprocess.run(healthcheck_cli_call, capture_output=True)
    response = process.stdout.decode('ascii').replace('\n', '')
    if response == healthcheck_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 2 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 2 failed ' + bcolors.ENDC + 'X')

def resetall_cli_test():
    process = subprocess.run(resetall_cli_call, capture_output=True)
    response = process.stdout.decode('ascii').replace('\n', '')
    if response == resetall_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 3 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 3 failed ' + bcolors.ENDC + 'X')

def questionnaire_upd_cli_test():
    process = subprocess.run(questionnaire_upd_cli_call, capture_output=True)
    response = process.stdout.decode('ascii').replace('\n', '')
    if response == questionnaire_upd_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 4 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 4 failed ' + bcolors.ENDC + 'X')

def questionnaire_upd_cli_test_2():
    process = subprocess.run(questionnaire_upd_cli_call_2, capture_output=True)
    response = process.stdout.decode('ascii').replace('\n', '')
    if response == questionnaire_upd_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 5 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 5 failed ' + bcolors.ENDC + 'X')

def questionnaire_cli_test():
    process = subprocess.run(questionnaire_cli_call, capture_output=True)
    response = process.stdout.decode('utf-8').replace('\n', '')
    if response == questionnaire_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 6 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 6 failed ' + bcolors.ENDC + 'X')

def csv_questionnaire_cli_test():
    process = subprocess.run(csv_questionnaire_cli_call, capture_output=True)
    response = process.stdout.decode('utf-8').replace('\n', '')
    if response == csv_questionnaire_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 7 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 7 failed ' + bcolors.ENDC + 'X')

def question_cli_test():
    process = subprocess.run(question_cli_call, capture_output=True)
    response = process.stdout.decode('utf-8').replace('\n', '')
    if response == question_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 8 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 8 failed ' + bcolors.ENDC + 'X')

def csv_question_cli_test():
    process = subprocess.run(csv_question_cli_call, capture_output=True)
    response = process.stdout.decode('utf-8').replace('\n', '')
    if response == csv_question_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 9 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 9 failed ' + bcolors.ENDC + 'X')

def doanswer_cli_test():
    process = subprocess.run(doanswer_cli_call, capture_output=True)
    response = process.stdout.decode('ascii').replace('\n', '')
    if response == doanswer_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 10 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 10 failed ' + bcolors.ENDC + 'X')   

def getsessionanswers_cli_test():
    process = subprocess.run(getsessionanswers_cli_call, capture_output=True)
    response = process.stdout.decode('utf-8').replace('\n', '')
    if response == getsessionanswers_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 11 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 11 failed ' + bcolors.ENDC + 'X')

def csv_getsessionanswers_cli_test():
    process = subprocess.run(csv_getsessionanswers_cli_call, capture_output=True)
    response = process.stdout.decode('utf-8').replace('\n', '')
    if response == csv_getsessionanswers_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 12 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 12 failed ' + bcolors.ENDC + 'X')        

def getquestionanswers_cli_test():
    process = subprocess.run(getquestionanswers_cli_call, capture_output=True)
    response = process.stdout.decode('utf-8').replace('\n', '')
    if response == getquestionanswers_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 13 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 13 failed ' + bcolors.ENDC + 'X')

def csv_getquestionanswers_cli_test():
    process = subprocess.run(csv_getquestionanswers_cli_call, capture_output=True)
    response = process.stdout.decode('utf-8').replace('\n', '')
    if response == csv_getquestionanswers_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 14 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 14 failed ' + bcolors.ENDC + 'X')

def resetq_cli_test():
    process = subprocess.run(resetq_cli_call, capture_output=True)
    response = process.stdout.decode('ascii').replace('\n', '')
    if response == resetq_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 15 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 15 failed ' + bcolors.ENDC + 'X')


def logout_cli_test():
    process = subprocess.run(logout_cli_call, capture_output=True)
    response = process.stdout.decode('ascii').replace('\n', '')
    if response == logout_cli_call_expected:
        print(bcolors.OKGREEN + '.Testcase 16 passed ' + bcolors.ENDC + u'\N{check mark}')
    else:
        print(bcolors.FAIL + '.Testcase 16 failed ' + bcolors.ENDC + 'X')


if __name__ == '__main__':
  failed_healthcheck_cli_test()           #0  
  login_cli_test()                        #1
  healthcheck_cli_test()                  #2   
  resetall_cli_test()                     #3           
  questionnaire_upd_cli_test()            #4
  questionnaire_upd_cli_test_2()          #5
  questionnaire_cli_test()                #6
  csv_questionnaire_cli_test()            #7
  question_cli_test()                     #8
  csv_question_cli_test()                 #9
  doanswer_cli_test()                     #10
  getsessionanswers_cli_test()            #11
  csv_getsessionanswers_cli_test()        #12
  getquestionanswers_cli_test()           #13
  csv_getquestionanswers_cli_test()       #14
  resetq_cli_test()                       #15
  logout_cli_test()                       #16