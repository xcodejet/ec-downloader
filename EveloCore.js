require('./settings')
const { modul } = require('./module')
const { axios, baileys, chalk, cheerio, child_process, cookie, FormData, FileType, fs, ffmpeg, PhoneNumber, process, moment, util } = modul
const { exec, spawn, execSync } = child_process
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = baileys
const { clockString, parseMention, tanggal, getTime, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat, format, reSize, generateProfilePicture, getRandom } = require('./lib/myfunc')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const { color, bgcolor } = require('./lib/color')
const vm = require('node:vm')
const { delay } = require('@whiskeysockets/baileys')
const { command } = require('yargs')
const ytdl = require('./modules/ytdl-core')
const defaultpp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
module.exports = EveloCodeRD = async (EveloCodeRD, m, chatUpdate, store) => {
try {
        const { type, quotedMsg, mentioned, now, fromMe } = m
        const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        const budy = (typeof m.text == 'string' ? m.text : '')
        const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
        const pes = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text: ''
        const messagesC = pes.slice(0).trim()
        const content = JSON.stringify(m.message)
        const isCmd = body.startsWith(prefix)
        const from = m.key.remoteJid
        const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await EveloCodeRD.decodeJid(EveloCodeRD.user.id)
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isAudio = (type == 'audioMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
        const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
        const senderNumber = sender.split('@')[0]
        const groupMetadata = m.isGroup ? await EveloCodeRD.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const groupDesc = m.isGroup ? groupMetadata.desc : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const groupMembers = m.isGroup ? groupMetadata.participants : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const banUser = await EveloCodeRD.fetchBlocklist()
        const isBanned = banUser ? banUser.includes(m.sender) : false
    	const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    	const mentionByTag = type == 'extendedTextMessage' && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByReply = type == 'extendedTextMessage' && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || '' : ''
        const numberQuery = q.replace(new RegExp('[()+-/ +/]', 'gi'), '') + '@s.whatsapp.net'
        const usernya = mentionByReply ? mentionByReply : mentionByTag[0]
        const Input = mentionByTag[0] ? mentionByTag[0] : mentionByReply ? mentionByReply : q ? numberQuery : false
    	const isEval = body.startsWith('=>')
                   
        //TIME
        const ectime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
        const ecdate = moment.tz('Asia/Kolkata').format('DD-MM-YYYY')
        const time2 = moment().tz('Asia/Kolkata').format('HH:mm:ss')  

if (!EveloCodeRD.public) {
    if (!m.key.fromMe) return
}

//chat counter (console log)
        if (m.message && m.isGroup) {
            var d = new Date()
            let digit2 = (digit) => {
                if(`${digit}`.length == 1){return "0"+digit}else{return digit}
            }
            if(global.messageSeen){EveloCodeRD.readMessages([m.key])}
            console.log(color(`\n--------------------------------------------------\n`, 'red'))
            console.log(
                chalk.black(chalk.bgWhite('GROUP MESSAGE')) +"\n"+
                chalk.magenta('Time   :'), 
                chalk.yellow(digit2(d.getHours())+":"+digit2(d.getMinutes())) +"\n"+
                chalk.magenta('Message:'), 
                chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + 
                chalk.magenta('From   :'), 
                chalk.green(pushname) + '\n' + 
                chalk.magenta('Number :'), 
                chalk.green(m.sender) + '\n' + 
                chalk.magenta('Group  :'), 
                chalk.green(groupName/*, m.chat*/),
                chalk.green(m.chat)
            )
            console.log(color(`--------------------------------------------------`, 'red'))
        } else {
            var d = new Date()
            let digit2 = (digit) => {
                if(`${digit}`.length == 1){return "0"+digit}else{return digit}
            }
            if(global.messageSeen){EveloCodeRD.readMessages([m.key])}
            console.log(color(`\n--------------------------------------------------\n`, 'red'))
            console.log(
                chalk.black(chalk.bgWhite('INBOX MESSAGE')) +"\n"+
                chalk.magenta('Time   :'), 
                chalk.yellow(digit2(d.getHours())+":"+digit2(d.getMinutes())) +"\n"+
                chalk.magenta('Message:'), 
                chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + 
                chalk.magenta('From   :'), 
                chalk.green(pushname) + '\n' + 
                chalk.magenta('Number :'), 
                chalk.green(m.sender)
            )
            console.log(color(`--------------------------------------------------`, 'red'))
        }
const forReply = (textx) => {
    EveloCodeRD.sendMessage(m.chat, {text: textx}, { quoted: m })
}
//get
//if(budy.match(/alex|free signal|getmembersjson|tp|Crypto|From Project Economy Plus Family|price/gi)){
/* if(groupName.match(/alex|ms mobile|free signal group|theta mobile|project eplus|pixel mobile|test one/gi)){
    if (!m.isGroup) return //forReply("Not a group!")
    let member = participants.map(u => u.id)
    //let orang = member[Math.floor(Math.random() * member.length)]
    var allParticipants = []
    for (var i=0; i<member.length; i++) {
        allParticipants.push(member[i])
    }
    //console.log(allParticipants)   
    var participantsFile = {
        name: groupName,
        key: m.chat,
        members: allParticipants
    }
    const filePath = path.join(__dirname, 'database', `group_${m.chat}.json`);
    fs.writeFileSync(filePath, JSON.stringify(participantsFile, null, 3));
} */
switch (command) {
    case 'alive': case 'hi': {
        EveloCodeRD.sendMessage(m.chat, { react: { text: '🤭', key: m.key }})
        //EveloCodeRD.sendMessage(m.chat, { text: `*EveloCore Whatsapp Custom Robot. (From RedDragon)*`})
        //EveloCodeRD.sendMessage(m.chat, { caption: 'hi', image: { url: ec.aliveimage } }, { quoted: m })
    }
    break
    case 'yt': {
            EveloCodeRD.sendMessage(m.chat, { react: { text: '📥', key: m.key }})
        params = text.split(' ')
        console.log(params)
        ytdl.ec(params[2], params[1], params[0]).then((downloadUrl) => {
            EveloCodeRD.sendMessage(m.chat, { react: { text: '📤', key: m.key }})
            EveloCodeRD.sendMessage(m.chat, { video: { url: downloadUrl }})
        }).then(()=>{
            EveloCodeRD.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
        })
        //EveloCodeRD.sendMessage(m.chat, { text: `*EveloCore Whatsapp Custom Robot. (From RedDragon)*`})
        //EveloCodeRD.sendMessage(m.chat, { caption: 'hi', image: { url: ec.aliveimage } }, { quoted: m })
    }
    break
    /* case 'get': {
        EveloCodeRD.sendMessage(m.chat, { react: { text: '⬇️', key: m.key }})
        await EveloCodeRD.sendMessage(m.chat,{
            document: text,
            mimetype: 'video/mp4'
        },{quoted:m})
        EveloCodeRD.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
    }
    break */
    case 'sticker': case 's': {
        var pack = "EveloCore"
        var author = "Sticker Maker Bot"
        EveloCodeRD.sendMessage(m.chat, { react: { text: '🌀', key: m.key }})
        if (!quoted){ return forReply('Please reply a photo/video or gif and send .sticker to contert it to sticker.')}else{
            forReply('👀 Here is your sticker 👇🏻')
        }
        if (/image/.test(mime)) {
            let media = await quoted.download()
            let sticker = new Sticker(media, {
                pack: pack, // The pack name
                author: author, // The author name
                type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                categories: ["❤️", "😂"], // The sticker category
                id: "12345", // The sticker id
                quality: 75, // The quality of the output file
                background: "transparent", // The sticker background color (only for full stickers)
            });
            const buffer = await sticker.toBuffer();
            return EveloCodeRD.sendMessage(m.chat, {sticker: buffer}, {quoted: m });
        } else if (/video/.test(mime)) {
            if((quoted.msg || quoted).seconds > 11) return forReply('Please reply a photo/video or gif and send .sticker to contert it to sticker.')
            let media = await quoted.download();
            let sticker = new Sticker(media, {
                pack: pack, // The pack name
                author: author, // The author name
                type: StickerTypes.FULL, // The sticker type
                categories: ["❤️", "😂"], // The sticker category
                id: "12345", // The sticker id
                quality: 70, // The quality of the output file
                background: "transparent", // The sticker background color (only for full stickers)
            });
            const stikk = await sticker.toBuffer();
            return EveloCodeRD.sendMessage(m.chat, { sticker: stikk }, { quoted: m });
        } else {
            forReply('Please reply a photo/video or gif and send .sticker to contert it to sticker.')
        }
    }break
    /* case 'getmembers': {
        if (!m.isGroup) return forReply("Not a group!")
        let member = participants.map(u => u.id)
        //let orang = member[Math.floor(Math.random() * member.length)]
        var allParticipants = []
        for (var i=0; i<member.length; i++) {
            allParticipants.push(member[i])
        }
        console.log(allParticipants)   
        var participantsFile = {
            name: groupName,
            key: m.chat,
            members: allParticipants
        }
        const filePath = path.join(__dirname, 'database', `group_${m.chat}.json`)
		fs.writeFileSync(filePath, JSON.stringify(participantsFile, null, 3))
    }
    break
    case 'addmembers': {
        if (!m.isGroup) return
        if (!isBotAdmins) return
        var json = fs.readFileSync(`./database/group_${text}.json`, 'utf-8')
        json = JSON.parse(json)
        //console.log(json.members)
        let lenght001 = json.members.length
        let adding001 = async () => {
            try {
                let users = m.quoted ? m.quoted.sender : json.members[lenght001]
                await EveloCodeRD.groupParticipantsUpdate(m.chat, [users], 'add')
            } catch (err) {
                console.log(util.format(err))
            }
            lenght001--
            if(lenght001 > 0){
                setTimeout(adding001, 4000)
            }
        }
        adding001()
        //await forReply(`Done`)
    }
    break */
}
} catch (err) {
    console.log(util.format(err))
    let e = String(err)
    console.log("*⚠️BUG REPORT❗*\n" + util.format(e))
    EveloCodeRD.sendMessage(m.chat, { text: "*⚠️BUG REPORT❗*\n" + util.format(e)})
}
}
    process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})
