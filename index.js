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

let {
    mtc: mtcState,
    restartState: isRestart
    } = setting

/*
//THANKS TO TOBYG74 & NURUTOMO
require('./nzwa.js')
nocache('./nzwa.js', module => console.log(`'${module}' Updated!`))
require('./src/menu/help.js')
nocache('./src/menu/help.js', module => console.log(`'${module}' Updated!`))
require('./settings/setting.json')
nocache('./settings/setting.json', module => console.log(`'${module}' Updated!`))
*/

lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;

const start = async (nzwa = new Client()) => {
        console.log('------------------------------------------------')
        lolcatjs.fromString(color(figlet.textSync('OSAKANA BOT', { horizontalLayout: 'full' })))
        console.log('------------------------------------------------')
        lolcatjs.fromString('[DEV] NAZWAS')
        lolcatjs.fromString('[SYSTEM] BOT Started!')
        nzwa.onAnyMessage((fn) => messageLog(fn.fromMe, fn.type))
        // Force it to keep the current session
        nzwa.onStateChanged((state) => {
            console.log('[Client State]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') tobz.forceRefocus()
        })
        // listening on message
        nzwa.onMessage((async (message) => {

        nzwa.getAmountOfLoadedMessages() // Cut message Cache if cache more than 3K
            .then((msg) => {
                if (msg >= 1000) {
                    console.log('[CLIENT]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    nzwa.cutMsgCache()
                }
            })
        // msgHndlr(nzwa, message)
        // Message Handler (Loaded from recent cache)
        require('./nzwa.js')(nzwa, message)
    }))
           

        /*nzwa.onGlobalParicipantsChanged((async (heuh) => {
            await welcome(nzwa, heuh) 
            left(nzwa, heuh)
            }))*/

        // listening on Incoming Call
        nzwa.onIncomingCall(( async (call) => {
            await nzwa.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!.\nJika ingin membuka block harap chat Owner!')
            .then(() => tobz.contactBlock(call.peerJid))
        }))
    }

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

create(options(true, start))
    .then(nzwa => start(nzwa))
    .catch((error) => console.log(error))
