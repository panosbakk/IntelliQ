#!/usr/bin/node

const program = require('commander');
const axios = require('axios').default;
const spawn = require('child_process').spawn;
const qs = require('querystring');
var FormData = require('form-data');
var fs = require('fs');


program.version('1.0.0');

program
    .command('login')
    .option('--username <username>', 'username')
    .option('--password <password>', 'password')
    .action(function(options) {

        if (options.username == undefined || options.password == undefined){
            if (options.username == undefined){
                console.log("Must define username using '--username' option")
            }
            if (options.password == undefined){
            console.log("Must define password using '--password' option")
            }
            return
        }

        fs.access('softeng2228.token', fs.F_OK, (err1) => {
            //File does not exist - New user can log in
            if (err1) {
                if(err1.code === 'ENOENT'){
                    let config = {
                        method: 'post',
                        url: 'http://localhost:9103/intelliq_api/login',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: qs.stringify({
                            username: options.username,
                            password: options.password
                          })
                    }
            
                    axios(config)
                        .then(res => {
                            //Write token in appropriate file
                            fs.writeFile('softeng2228.token', res.data.token, err2 =>{
                                //Error while writing in file
                                if (err2)
                                    throw err2;   
                                console.log("User successfully logged in.")
                            })
                        })

                        .catch(err => {
                            console.log("Status code: " + err.response.status)
                            if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                                console.log(err.response.data)
                            if (err.response.status == 404)
                                console.log("Page Not Found")
                        })
                }
                else {
                    console.log("Something went wrong.")
                    throw err1
                }
            }
            //File already exists - New user cannot log in
            else{
                console.log("Error: User already logged in.")
            }
        })
    })

program
    .command('logout')
    .action(function(options) {

        fs.access('softeng2228.token', fs.F_OK, (err1) => {
            //File does not exist - User canNOT log out
            if (err1) {
                if (err1.code === 'ENOENT') { 
                    console.log("Error: No user is currently logged in.")
                    return
                }
                //Another error has occured
                else
                    throw err1;
            }
            else {
                fs.readFile('softeng2228.token', 'utf8', (err2, data) => {
                    if (err2)
                        throw err2
                        
                    let config = {
                        method: 'post',
                        url: 'http://localhost:9103/intelliq_api/logout',
                        headers: {
                            'X-OBSERVATORY-AUTH': data
                          }
                    }
                    axios(config)
                        .then(res => {
                           //Erase file
                            fs.unlink('softeng2228.token', (err3) => {
                                if (err3)
                                    throw err3;
                                console.log('User successfully logged out.');
                            })  
                        })
                        .catch(err => {
                            console.log("Status code: " + err.response.status)
                            if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                                console.log(err.response.data)
                            if (err.response.status == 404)
                                console.log("Page Not Found")
                        })
                })
            }  
        })
    })

program
    .command('healthcheck')
    .action(function() {

        fs.access('softeng2228.token', fs.F_OK, (err1) => {
            //File does not exist
            if (err1) {
                if (err1.code === 'ENOENT') { 
                    console.log("Error: Access denied. You should log in in order to access this page.")
                    return
                }
                //Another error has occured
                else
                    throw err1;
            }
            else {
                fs.readFile('softeng2228.token', 'utf8', (err2, data) => {
                    if (err2)
                        throw err2

                    let config = {
                        method: 'get',
                        url: 'http://localhost:9103/intelliq_api/admin/healthcheck',
                        headers: {
                            'X-OBSERVATORY-AUTH': data
                          }
                    }
                    axios(config)
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch(err => {
                            console.log("Status code: " + err.response.status)
                            if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                                console.log(err.response.data)
                            if (err.response.status == 404)
                                console.log("Page Not Found")
                        })
                })
            }  
        })
    })

program
    .command('resetall')
    .action(function() {

        fs.access('softeng2228.token', fs.F_OK, (err1) => {
            //File does not exist
            if (err1) {
                if (err1.code === 'ENOENT') { 
                    console.log("Error: Access denied. You should log in in order to access this page.")
                    return
                }
                //Another error has occured
                else
                    throw err1;
            }
            else {
                fs.readFile('softeng2228.token', 'utf8', (err2, data) => {
                    if (err2)
                        throw err2

                    let config = {
                        method: 'post',
                        url: 'http://localhost:9103/intelliq_api/admin/resetall',
                        headers: {
                            'X-OBSERVATORY-AUTH': data
                          }
                    }
                    axios(config)
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch(err => {
                            console.log("Status code: " + err.response.status)
                            if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                                console.log(err.response.data)
                            if (err.response.status == 404)
                                console.log("Page Not Found")
                        })
                })
            }  
        })
    })

program
    .command('questionnaire_upd')
    .option('--source <source>', 'source file')
    .action(function(options) {

        if (options.source == undefined) {
            console.log("Must define the source file using '--source' option")
            return
        }

        fs.access('softeng2228.token', fs.F_OK, (err1) => {
            //File does not exist
            if (err1) {
                if (err1.code === 'ENOENT') { 
                    console.log("Error: Access denied. You should log in in order to access this page.")
                    return
                }
                //Another error has occured
                else { 
                    console.log("Error! Something went wrong:" + err1.code + " - " + err1.message)
                    throw err1;
                }
            }
            else {
                fs.readFile('softeng2228.token', 'utf8', (err2, data) => {
                    if (err2)
                        throw err2
                    let form = new FormData() 
                    form.append("file", fs.createReadStream(options.source))
                    let all_headers =  form.getHeaders()
                    all_headers['X-OBSERVATORY-AUTH'] = data
                    all_headers['contentType'] = "multipart/form-data"
                    let config = {
                        method: 'post',
                        url: 'http://localhost:9103/intelliq_api/admin/questionnaire_upd', 
                        headers: all_headers,
                        data: form
                    }
                    axios(config)
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch(err => {
                            console.log("Status code: " + err.response.status + " - " + err.response.statusText)
                        })
                })
            }  
        })
    })

program
    .command('resetq')
    .option('--questionnaire_ID <questionnaire_ID>', 'questionnaire ID')
    .action(function(options) {

        if (options.questionnaire_ID == undefined) {
            console.log("Must define the questionnaire ID using '--questionnaire_ID' option")
            return
        }

        fs.access('softeng2228.token', fs.F_OK, (err1) => {
            //File does not exist
            if (err1) {
                if (err1.code === 'ENOENT') { 
                    console.log("Error: Access denied. You should log in in order to access this page.")
                    return
                }
                //Another error has occured
                else
                    throw err1;
            }
            else {
                fs.readFile('softeng2228.token', 'utf8', (err2, data) => {
                    if (err2)
                        throw err2

                    let config = {
                        method: 'post',
                        url: 'http://localhost:9103/intelliq_api/admin/resetq/' +
                        ((options.questionnaire_ID != undefined) ? options.questionnaire_ID : ''),
                        headers: {
                            'X-OBSERVATORY-AUTH': data
                          }
                    }
                    axios(config)
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch(err => {
                            console.log("Status code: " + err.response.status)
                            if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                                console.log(err.response.data)
                            if (err.response.status == 404)
                                console.log("Page Not Found")
                        })
                })
            }  
        })
    })

program
    .command('questionnaire')
    .option('--questionnaire_ID <questionnaire_ID>', 'questionnaire ID')
    .action(function(options) {

        if (options.questionnaire_ID == undefined){
            console.log("Must define questionnaire ID using '--questionnaire_ID' option")
            return
        }

        let config = {
            method: 'get',
            url: 'http://localhost:9103/intelliq_api/questionnaire/' +
            ((options.questionnaire_ID != undefined) ? options.questionnaire_ID : '')
        }
        axios(config)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log("Status code: " + err.response.status)
                if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                    console.log(err.response.data)
                if (err.response.status == 404)
                    console.log("Page Not Found")
            })
    })

program
    .command('question')
    .option('--questionnaire_ID <questionnaire_ID>', 'questionnaire ID')
    .option('--question_ID <question_ID>', 'question ID')
    .action(function(options) {
        if (options.questionnaire_ID == undefined || options.question_ID == undefined) {
            if (options.questionnaire_ID == undefined){
                console.log("Must define questionnaire ID using '--questionnaire_ID' option")
            }
            if (options.question_ID == undefined){
                console.log("Must define question ID using '--question_ID' option")
            }
            return
        }

        let config = {
            method: 'get',
            url: 'http://localhost:9103/intelliq_api/question/' +
            ((options.questionnaire_ID != undefined) ? options.questionnaire_ID : '') +
            ((options.question_ID != undefined) ? '/' + options.question_ID : '')
        }
        axios(config)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log("Status code: " + err.response.status)
                if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                    console.log(err.response.data)
                if (err.response.status == 404)
                    console.log("Page Not Found")
            })
    })

    program
    .command('doanswer')
    .option('--questionnaire_ID <questionnaire_ID>', 'questionnaire ID')
    .option('--question_ID <question_ID>', 'question ID')
    .option('--session_ID <session_ID>', 'session ID')
    .option('--option_ID <option_ID>', 'option ID')
    .action(function(options) {

        if (options.questionnaire_ID == undefined || options.question_ID == undefined || options.session_ID == undefined || options.option_ID == undefined) {
            if (options.questionnaire_ID == undefined){
                console.log("Must define questionnaire ID using '--questionnaire_ID' option")
            }
            if (options.question_ID == undefined){
                console.log("Must define question ID using '--question_ID' option")
            }
            if (options.session_ID == undefined){
                console.log("Must define session ID using '--session_ID' option")
            }
            if (options.option_ID == undefined){
                console.log("Must define option ID using '--option_ID' option")
            }
            return
        }

        let config = {
            method: 'post',
            url: 'http://localhost:9103/intelliq_api/doanswer/' +
            ((options.questionnaire_ID != undefined) ? options.questionnaire_ID : '') + 
            ((options.question_ID != undefined) ? '/' + options.question_ID : '') + 
            ((options.session_ID != undefined) ? '/' + options.session_ID : '') + 
            ((options.option_ID != undefined) ? '/' + options.option_ID : '')
        }
        axios(config)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log("Status code: " + err.response.status)
                if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                    console.log(err.response.data)
                if (err.response.status == 404)
                    console.log("Page Not Found")
            })
    })

 program
    .command('getsessionanswers')
    .option('--questionnaire_ID <questionnaire_ID>', 'questionnaire ID')
    .option('--session_ID <session_ID>', 'session ID')
    .action(function(options) {
        if (options.questionnaire_ID == undefined || options.session_ID == undefined) {
            if (options.questionnaire_ID == undefined){
                console.log("Must define questionnaire ID using '--questionnaire_ID' option")
            }
            if (options.session_ID == undefined){
                console.log("Must define session ID using '--session_ID' option")
            }
            return
        }

        let config = {
            method: 'get',
            url: 'http://localhost:9103/intelliq_api/getsessionanswers/' +
            ((options.questionnaire_ID != undefined) ? options.questionnaire_ID : '') + 
            ((options.session_ID != undefined) ? '/' + options.session_ID : '')
        }
        axios(config)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log("Status code: " + err.response.status)
                if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                    console.log(err.response.data)
                if (err.response.status == 404)
                    console.log("Page Not Found")
            })
    })

program    
    .command('getquestionanswers')
    .option('--questionnaire_ID <questionnaire_ID>', 'questionnaire ID')
    .option('--question_ID <question_ID>', 'question ID')
    .action(function(options) {
        if (options.questionnaire_ID == undefined || options.question_ID == undefined) {
            if (options.questionnaire_ID == undefined){
                console.log("Must define questionnaire ID using '--questionnaire_ID' option")
            }
            if (options.question_ID == undefined){
                console.log("Must define question ID using '--question_ID' option")
            }
            return
        }

        let config = {
            method: 'get',
            url: 'http://localhost:9103/intelliq_api/getquestionanswers/' +
            ((options.questionnaire_ID != undefined) ? options.questionnaire_ID : '') + 
            ((options.question_ID != undefined) ? '/' + options.question_ID : '')
        }
        axios(config)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log("Status code: " + err.response.status)
                if (err.response.status == 400 || err.response.status == 401 || err.response.status == 402)
                    console.log(err.response.data)
                if (err.response.status == 404)
                    console.log("Page Not Found")
            })
    })

program.parse(process.argv);