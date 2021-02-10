const {
    create,
    Client
} = require('@open-wa/wa-automate')
const cron = require('node-cron')
const fs = require('fs')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
const color = require('./lib/color')

const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
//THANKS TO TOBZ
lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;

const start = async (nzwa = new Client()) => {
        console.log('------------------------------------------------')
        lolcatjs.fromString(color(figlet.textSync('OSAKANA BOT', { horizontalLayout: 'full' })))
        console.log('------------------------------------------------')
        lolcatjs.fromString('[DEV] NAZWAS')
        lolcatjs.fromString('[SYSTEM] BOT Started!')
        tobz.onAnyMessage((fn) => messageLog(fn.fromMe, fn.type))
        // Force it to keep the current session
        nzwa.onStateChanged((state) => {
            console.log('[Client State]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') tobz.forceRefocus()
        })

}
