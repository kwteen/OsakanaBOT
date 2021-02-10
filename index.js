const {
    create,
    Client
} = require('@open-wa/wa-automate')
const cron = require('node-cron')
const fs = require('fs')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
const color = require('./lib/color')
