#!/usr/bin/node

const program = require('commander');
const axios = require('axios').default;
const spawn = require('child_process').spawn;
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

        let config = {
            method: 'post',
            url: 'http://localhost:9103/intelliq_api/login/' +
                ((options.username != undefined) ? options.username : '') +
                ((options.password != undefined) ? options.password : '')
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
    .command('logout')
    .action(function(options) {

        let config = {
            method: 'post',
            url: 'http://localhost:9103/intelliq_api/logout'
        }
        axios(config)
            .then(res => {
                console.log("Status code 200: OK")
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
    .command('healthcheck')
    .action(function() {

        let config = {
            method: 'get',
            url: 'http://localhost:9103/intelliq_api/admin/healthcheck'
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
    .command('resetall')
    .action(function() {

        let config = {
            method: 'post',
            url: 'http://localhost:9103/intelliq_api/admin/resetall'
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
    .command('questionnaire_upd')
    .option('--source <source>', 'source file')
    .action(function() {

        if (options.source == undefined) {
            console.log("Must define the source file using '--source' option")
            return
        }

        let config = {
            method: 'post',
            url: 'http://localhost:9103/intelliq_api/admin/questionnaire_udp'
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
    .command('resetq')
    .option('--questionnaire_ID <questionnaire_ID>', 'questionnaire ID')
    .action(function(options) {

        if (options.questionnaire_ID == undefined) {
            console.log("Must define the questionnaire ID using '--questionnaire_ID' option")
            return
        }

        let config = {
            method: 'post',
            url: 'http://localhost:9103/intelliq_api/resetq/' +
                ((options.questionnaire_ID != undefined) ? optionsquestionnaire_ID : '')  
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
    .command('questionnaire')
    .option('--questionnaire_ID <questionnaire_ID>', 'questionnaire ID')
    .action(function() {

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
    .action(function() {
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
            ((options.question_ID != undefined) ? options.question_ID : '')
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
    .action(function() {

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
            ((options.question_ID != undefined) ? options.question_ID : '') +
            ((options.session_ID != undefined) ? options.session_ID : '') +
            ((options.option_ID != undefined) ? options.option_ID : '')
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
    .action(function() {
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
            ((options.session_ID != undefined) ? options.session_ID : '')
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
    .action(function() {
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
            ((options.question_ID != undefined) ? options.question_ID : '')
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
    .command('usermod')
    .option('--username <username>', 'username')
    .option('--password <password>', 'password')
    .action(function(options) {

        if (options.username == undefined || options.password == undefined) {
            if (options.username == undefined){
                console.log("Must define username using '--username' option")
            }
            if (options.password == undefined){
                console.log("Must define password using '--password' option")
            }
            return
        }

        let config = {
            method: 'post',
            url: 'http://localhost:9103/intelliq_api/admin/usermod/' +
                ((options.username != undefined) ? options.username : '') +
                ((options.password != undefined) ? '/' + options.password : '')
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
    .command('users')
    .option('--username <username>', 'username')
    .action(function(options) {

        if (options.username == undefined){
            console.log("Must define username using '--username' option")
            return
        }

        let config = {
            method: 'get',
            url: 'http://localhost:9103/intelliq_api/admin/users/' +
                ((options.username != undefined) ? options.username : '')
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