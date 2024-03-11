const welcomestate = false
const actionreact = false
const {
    modul
  } = require('./module');
  const moment = require('moment-timezone');
  const {
    baileys,
    boom,
    chalk,
    fs,
    FileType,
    path,
    pino,
    process,
    PhoneNumber,
    axios,
    yargs,
    _
  } = modul;
  const {
    Boom
  } = boom
  const {
    default: XeonBotIncConnect,
    BufferJSON,
    initInMemoryKeyStore,
    DisconnectReason,
    AnyMessageContent,
    makeInMemoryStore,
    useMultiFileAuthState,
    delay,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    getAggregateVotesInPollMessage,
    proto
  } = require("@whiskeysockets/baileys")
  const {
    color,
    bgcolor
  } = require('./lib/color')
  const colors = require('colors')
  const {
    start
  } = require('./lib/spinner')
  const {
    uncache,
    nocache
  } = require('./lib/loader')
  const {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid
  } = require('./lib/exif')
  const {
    smsg,
    isUrl,
    generateMessageTag,
    getBuffer,
    getSizeMedia,
    fetchJson,
    await,
    sleep,
    reSize
  } = require('./lib/myfunc')
  const prefix = ''
  
  global.db = JSON.parse(fs.readFileSync('./database/database.json'))
  if (global.db) global.db = {
    sticker: {},
    database: {},
    game: {},
    others: {},
    users: {},
    chats: {},
    settings: {},
    ...(global.db || {})
  }
  
  
  const store = makeInMemoryStore({
    logger: pino().child({
      level: 'silent',
      stream: 'store'
    })
  })
  
  require('./EveloCore.js')
  nocache('../EveloCore.js', module => console.log(color('Updated file', 'red'), color(`'${module}'`, 'green'), 'Updated'))
  require('./index.js')
  nocache('../index.js', module => console.log(color('Updated file', 'red'), color(`'${module}'`, 'green'), 'Updated'))
  async function XeonBotIncBot() {
    const {saveCreds,state} = await useMultiFileAuthState(`./session`)
    //const {  saveCreds, state } = await useMultiFileAuthState(`./`)
    const EveloCodeRD = XeonBotIncConnect({
      logger: pino({
        level: 'silent'
      }),
      printQRInTerminal: true,
      browser: [`EveloCore`, 'Opera', '12.1'],
      auth: state,
      getMessage: async (key) => {
        if (store) {
          const msg = await store.loadMessage(key.remoteJid, key.id)
          return msg.message || undefined
        }
        return {
          conversation: "EveloCore Conneted"
        }
      }
    })
    store.bind(EveloCodeRD.ev)
  
    EveloCodeRD.ev.on('connection.update', async (update) => {
      const {
        connection,
        lastDisconnect
      } = update
      try {
        if (connection === 'close') {
          let reason = new Boom(lastDisconnect?.error)?.output.statusCode
          if (reason === DisconnectReason.badSession) {
            console.log(`Bad Session File, Please Delete Session and Scan Again`);
            XeonBotIncBot()
          } else if (reason === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            XeonBotIncBot();
          } else if (reason === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            XeonBotIncBot();
          } else if (reason === DisconnectReason.connectionReplaced) {
            console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
            XeonBotIncBot()
          } else if (reason === DisconnectReason.loggedOut) {
            console.log(`Device Logged Out, Please Scan Again And Run.`);
            XeonBotIncBot();
          } else if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...");
            XeonBotIncBot();
          } else if (reason === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting...");
            XeonBotIncBot();
          } else EveloCodeRD.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
          console.log(color(`\n> Connecting...`, 'yellow'))
        }
        if (update.connection == "open" || update.receivedPendingNotifications == "true") {
          console.log(color(`Account => ` + JSON.stringify(EveloCodeRD.user, null, 2), 'blue'))
          await delay(500)
          console.log(chalk.yellow(`${color(`Ev`, 'cyan')+chalk.bold.blue('elo')+color(`Co`, 'magenta')+color(`r`, 'red')+color(`e`, 'yellow')}`))
          await delay(500)
          console.log(chalk.yellow(`${color(`Ev`, 'cyan')+chalk.bold.blue('elo')+color(`Co`, 'magenta')+color(`r`, 'red')+color(`e`, 'yellow')}`))
          await delay(500)
          console.log(chalk.yellow(`${color(`Ev`, 'cyan')+chalk.bold.blue('elo')+color(`Co`, 'magenta')+color(`r`, 'red')+color(`e`, 'yellow')}\n`))
        } else {
          console.log(update.receivedPendingNotifications)
        }
  
      } catch (err) {
        console.log('❌Error in Connection.update ' + err)
        XeonBotIncBot();
      }
  
    })
  
    await delay(4000)
    start('2', colors.bold.white('\n\n💬 Waiting for client...'))
  
    EveloCodeRD.ev.on('creds.update', await saveCreds)
  
    // Anti Call
    EveloCodeRD.ev.on('call', async (XeonPapa) => {
      let botNumber = await EveloCodeRD.decodeJid(EveloCodeRD.user.id)
      let XeonBotNum = db.settings[botNumber].anticall
      if (!XeonBotNum) return
      console.log(XeonPapa)
      for (let XeonFucks of XeonPapa) {
        if (XeonFucks.isGroup == false) {
          if (XeonFucks.status == "offer") {
            //let XeonBlokMsg = await EveloCodeRD.sendTextWithMentions(XeonFucks.from, `*${EveloCodeRD.user.name}* can't receive ${XeonFucks.isVideo ? `video` : `voice` } call. Sorry @${XeonFucks.from.split('@')[0]} you will be blocked. If accidentally please contact the owner to be unblocked !`)
            //EveloCodeRD.sendContact(XeonFucks.from, global.owner, XeonBlokMsg)
            //await sleep(8000)
            //await EveloCodeRD.updateBlockStatus(XeonFucks.from, "block")
          }
        }
      }
    })
  
    EveloCodeRD.ev.on('messages.upsert', async chatUpdate => {
      try {
        const kay = chatUpdate.messages[0]
        if (!kay.message) return
        kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
        if (kay.key && kay.key.remoteJid === 'status@broadcast') {
          await EveloCodeRD.readMessages([kay.key])
        }
        if (!EveloCodeRD.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
        if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
        const m = smsg(EveloCodeRD, kay, store)
        require('./EveloCore')(EveloCodeRD, m, chatUpdate, store)
      } catch (err) {
        console.log(err)
      }
    })
    // respon cmd pollMessage
    async function getMessage(key) {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg?.message
      }
      return {
        conversation: "EveloCode"
      }
    }
    
    EveloCodeRD.ev.on('group-participants.update', async (anu) => {
      console.log(anu)
      try {
        let metadata = await EveloCodeRD.groupMetadata(anu.id)
        let participants = anu.participants
        for (let num of participants) {
          try {
            ppuser = await EveloCodeRD.profilePictureUrl(num, 'image')
          } catch (err) {
            ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            ppuser = './com.reddragon/image/welcome.jpg'
          }
          try {
            ppgroup = await EveloCodeRD.profilePictureUrl(anu.id, 'image')
          } catch (err) {
            ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
          }
          //welcome\\
          memb = metadata.participants.length
          XeonWlcm = await getBuffer(ppuser)
          XeonLft = await getBuffer(ppuser)
          if (anu.action == 'add') {
            //Lock bot {BotOff}
            const xeonbuffer = await getBuffer(ppuser)
            let xeonName = num
            const ectime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
            const ecdate = moment.tz('Asia/Kolkata').format('DD-MM-YYYY')
            const xmembers = metadata.participants.length
            let TXT = (text) => {
              text = text.replace(/{date}/g, ecdate)
              text = text.replace(/{time}/g, ectime)
              text = text.replace(/{user}/g, xeonName.split("@")[0])
              text = text.replace(/{botname}/g, ec.botname)
              text = text.replace(/{ownername}/g, ec.ownerName)
              text = text.replace(/{ownernumber}/g, ec.ownerNumber)
              text = text.replace(/{groupname}/g, metadata.subject)
              text = text.replace(/{n}/gi, "\n")
              text = text + ec.footer
              return text
            }
            if (!welcomestate) return
            EveloCodeRD.sendMessage(anu.id, {
              text: `*Hi,* ${xeonName.split("@")[0]}\n🔰 *welcome to crypto master vip signal service*`
            })
          } else if (anu.action == 'remove') {
            //Lock bot {BotOff}
            const xeonbuffer = await getBuffer(ppuser)
            let xeonName = num
            const ectime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
            const ecdate = moment.tz('Asia/Kolkata').format('DD-MM-YYYY')
            const xmembers = metadata.participants.length
            const xeonmembers = metadata.participants.length
            let TXT = (text) => {
              text = text.replace(/{date}/g, ecdate)
              text = text.replace(/{time}/g, ectime)
              text = text.replace(/{user}/g, xeonName.split("@")[0])
              text = text.replace(/{botname}/g, ec.botname)
              text = text.replace(/{ownername}/g, ec.ownerName)
              text = text.replace(/{ownernumber}/g, ec.ownerNumber)
              text = text.replace(/{groupname}/g, metadata.subject)
              text = text.replace(/{n}/gi, "\n")
              text = text + ec.footer
              return text
            }
            if (!welcomestate) return
            EveloCodeRD.sendMessage(anu.id, {
              caption: TXT(ec.goodbye),
              image: {
                url: './com.reddragon/image/goodbye.jpg'
              }
            })
          } else if (anu.action == 'promote') {
            //Lock bot {BotOff}
            const xeonbuffer = await getBuffer(ppuser)
            const ectime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
            const ecdate = moment.tz('Asia/Kolkata').format('DD-MM-YYYY')
            let xeonName = num
            let TXT = (text) => {
              text = text.replace(/{date}/g, ecdate)
              text = text.replace(/{time}/g, ectime)
              text = text.replace(/{user}/g, xeonName.split("@")[0])
              text = text.replace(/{botname}/g, ec.botname)
              text = text.replace(/{ownername}/g, ec.ownerName)
              text = text.replace(/{ownernumber}/g, ec.ownerNumber)
              text = text.replace(/{groupname}/g, metadata.subject)
              text = text.replace(/{n}/gi, "\n")
              text = text + ec.footer
              return text
            }
            if (!actionreact) return
            EveloCodeRD.sendMessage(anu.id, {
              text: TXT('🥳Wow {user}🎁{n}Now you are an *admin👤*')
            })
          } else if (anu.action == 'demote') {
            //Lock bot {BotOff}
            if(isLockedGroup()) return
            const xeonbuffer = await getBuffer(ppuser)
            const ectime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
            const ecdate = moment.tz('Asia/Kolkata').format('DD-MM-YYYY')
            let xeonName = num
            let TXT = (text) => {
              text = text.replace(/{date}/g, ecdate)
              text = text.replace(/{time}/g, ectime)
              text = text.replace(/{user}/g, xeonName.split("@")[0])
              text = text.replace(/{botname}/g, ec.botname)
              text = text.replace(/{ownername}/g, ec.ownerName)
              text = text.replace(/{ownernumber}/g, ec.ownerNumber)
              text = text.replace(/{groupname}/g, metadata.subject)
              text = text.replace(/{n}/gi, "\n")
              text = text + ec.footer
              return text
            }
            if (!actionreact) return
            EveloCodeRD.sendMessage(anu.id, {
              text: TXT('☹️Omg! {user}❗{n}You dismissed as an admin💔')
            })
          }
        }
      } catch (err) {
        console.log(err)
      }
    })
    EveloCodeRD.ev.on('messages.update', async chatUpdate => {
      for (const {
          key,
          update
        }
        of chatUpdate) {
        if (update.pollUpdates && key.fromMe) {
          const pollCreation = await getMessage(key)
          if (pollCreation) {
            const pollUpdate = await getAggregateVotesInPollMessage({
              message: pollCreation,
              pollUpdates: update.pollUpdates,
            })
            var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
            if (toCmd == undefined) return
            var prefCmd = prefix + toCmd
            EveloCodeRD.appenTextMessage(prefCmd, chatUpdate)
          }
        }
      }
    })
  
    EveloCodeRD.sendTextWithMentions = async (jid, text, quoted, options = {}) => EveloCodeRD.sendMessage(jid, {
      text: text,
      contextInfo: {
        mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')
      },
      ...options
    }, {
      quoted
    })
  
    EveloCodeRD.decodeJid = (jid) => {
      if (!jid) return jid
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {}
        return decode.user && decode.server && decode.user + '@' + decode.server || jid
      } else return jid
    }
  
    EveloCodeRD.ev.on('contacts.update', update => {
      for (let contact of update) {
        let id = EveloCodeRD.decodeJid(contact.id)
        if (store && store.contacts) store.contacts[id] = {
          id,
          name: contact.notify
        }
      }
    })
  
    EveloCodeRD.getName = (jid, withoutContact = false) => {
      id = EveloCodeRD.decodeJid(jid)
      withoutContact = EveloCodeRD.withoutContact || withoutContact
      let v
      if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
        v = store.contacts[id] || {}
        if (!(v.name || v.subject)) v = EveloCodeRD.groupMetadata(id) || {}
        resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
      })
      else v = id === '0@s.whatsapp.net' ? {
          id,
          name: 'WhatsApp'
        } : id === EveloCodeRD.decodeJid(EveloCodeRD.user.id) ?
        EveloCodeRD.user :
        (store.contacts[id] || {})
      return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
  
    EveloCodeRD.parseMention = (text = '') => {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }
  
    EveloCodeRD.sendContact = async (jid, kon, quoted = '', opts = {}) => {
      let list = []
      for (let i of kon) {
        list.push({
          displayName: await EveloCodeRD.getName(i),
          vcard: 'BEGIN:VCARD\n' // metadata of the contact card
            +
            'VERSION:3.0\n' +
            `FN:${await EveloCodeRD.getName(i)}\n` // full name
            +
            'ORG:EveloCode;\n' // the organization of the contact
            +
            `TEL;type=CELL;type=VOICE;waid=${i}:+${i}\n` // WhatsApp ID + phone number
            +
            'END:VCARD'
        })
      }
      EveloCodeRD.sendMessage(jid, {
        contacts: {
          displayName: `${list.length} Contact`,
          contacts: list
        },
        ...opts
      }, {
        quoted
      })
    }
  
    EveloCodeRD.setStatus = (status) => {
      EveloCodeRD.query({
        tag: 'iq',
        attrs: {
          to: '@s.whatsapp.net',
          type: 'set',
          xmlns: 'status',
        },
        content: [{
          tag: 'status',
          attrs: {},
          content: Buffer.from(status, 'utf-8')
        }]
      })
      return status
    }
  
    EveloCodeRD.public = true
  
    EveloCodeRD.sendImage = async (jid, path, caption = '', quoted = '', options) => {
      let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      return await EveloCodeRD.sendMessage(jid, {
        image: buffer,
        caption: caption,
        ...options
      }, {
        quoted
      })
    }
  
    EveloCodeRD.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      let buffer
      if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options)
      } else {
        buffer = await imageToWebp(buff)
      }
      await EveloCodeRD.sendMessage(jid, {
          sticker: {
            url: buffer
          },
          ...options
        }, {
          quoted
        })
        .then(response => {
          fs.unlinkSync(buffer)
          return response
        })
    }
  
    EveloCodeRD.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      let buffer
      if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options)
      } else {
        buffer = await videoToWebp(buff)
      }
      await EveloCodeRD.sendMessage(jid, {
        sticker: {
          url: buffer
        },
        ...options
      }, {
        quoted
      })
      return buffer
    }
  
    EveloCodeRD.copyNForward = async (jid, message, forceForward = false, options = {}) => {
      let vtype
      if (options.readViewOnce) {
        message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
        vtype = Object.keys(message.message.viewOnceMessage.message)[0]
        delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
        delete message.message.viewOnceMessage.message[vtype].viewOnce
        message.message = {
          ...message.message.viewOnceMessage.message
        }
      }
      let mtype = Object.keys(message.message)[0]
      let content = await generateForwardMessageContent(message, forceForward)
      let ctype = Object.keys(content)[0]
      let context = {}
      if (mtype != "conversation") context = message.message[mtype].contextInfo
      content[ctype].contextInfo = {
        ...context,
        ...content[ctype].contextInfo
      }
      const waMessage = await generateWAMessageFromContent(jid, content, options ? {
        ...content[ctype],
        ...options,
        ...(options.contextInfo ? {
          contextInfo: {
            ...content[ctype].contextInfo,
            ...options.contextInfo
          }
        } : {})
      } : {})
      await EveloCodeRD.relayMessage(jid, waMessage.message, {
        messageId: waMessage.key.id
      })
      return waMessage
    }
  
    EveloCodeRD.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
      let quoted = message.msg ? message.msg : message
      let mime = (message.msg || message).mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(quoted, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }
      let type = await FileType.fromBuffer(buffer)
      trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
      await fs.writeFileSync(trueFileName, buffer)
      return trueFileName
    }
  
    EveloCodeRD.downloadMediaMessage = async (message) => {
      let mime = (message.msg || message).mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(message, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }
      return buffer
    }
  
    EveloCodeRD.getFile = async (PATH, save) => {
      let res
      let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
      let type = await FileType.fromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
      }
      filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
      if (data && save) fs.promises.writeFile(filename, data)
      return {
        res,
        filename,
        size: await getSizeMedia(data),
        ...type,
        data
      }
    }
  
    EveloCodeRD.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
      let types = await EveloCodeRD.getFile(path, true)
      let {
        mime,
        ext,
        res,
        data,
        filename
      } = types
      if (res && res.status !== 200 || file.length <= 65536) {
        try {
          throw {
            json: JSON.parse(file.toString())
          }
        } catch (e) {
          if (e.json) throw e.json
        }
      }
      let type = '',
        mimetype = mime,
        pathFile = filename
      if (options.asDocument) type = 'document'
      if (options.asSticker || /webp/.test(mime)) {
        let {
          writeExif
        } = require('./lib/exif')
        let media = {
          mimetype: mime,
          data
        }
        pathFile = await writeExif(media, {
          packname: options.packname ? options.packname : global.packname,
          author: options.author ? options.author : global.author,
          categories: options.categories ? options.categories : []
        })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
      } else if (/image/.test(mime)) type = 'image'
      else if (/video/.test(mime)) type = 'video'
      else if (/audio/.test(mime)) type = 'audio'
      else type = 'document'
      await EveloCodeRD.sendMessage(jid, {
        [type]: {
          url: pathFile
        },
        caption,
        mimetype,
        fileName,
        ...options
      }, {
        quoted,
        ...options
      })
      return fs.promises.unlink(pathFile)
    }
  
    EveloCodeRD.sendText = (jid, text, quoted = '', options) => EveloCodeRD.sendMessage(jid, {
      text: text,
      ...options
    }, {
      quoted
    })
  
    EveloCodeRD.serializeM = (m) => smsg(EveloCodeRD, m, store)
  
    EveloCodeRD.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
      let buttonMessage = {
        text,
        footer,
        buttons,
        headerType: 2,
        ...options
      }
      EveloCodeRD.sendMessage(jid, buttonMessage, {
        quoted,
        ...options
      })
    }
  
    EveloCodeRD.sendKatalog = async (jid, title = '', desc = '', gam, options = {}) => {
      let message = await prepareWAMessageMedia({
        image: gam
      }, {
        upload: EveloCodeRD.waUploadToServer
      })
      const tod = generateWAMessageFromContent(jid, {
        "productMessage": {
          "product": {
            "productImage": message.imageMessage,
            "productId": "9999",
            "title": title,
            "description": desc,
            "currencyCode": "INR",
            "priceAmount1000": "100000",
            "url": `${websitex}`,
            "productImageCount": 1,
            "salePriceAmount1000": "0"
          },
          "businessOwnerJid": `${ownernumber}@s.whatsapp.net`
        }
      }, options)
      return EveloCodeRD.relayMessage(jid, tod.message, {
        messageId: tod.key.id
      })
    }
  
    EveloCodeRD.send5ButLoc = async (jid, text = '', footer = '', img, but = [], options = {}) => {
      var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
          hydratedTemplate: {
            "hydratedContentText": text,
            "locationMessage": {
              "jpegThumbnail": img
            },
            "hydratedFooterText": footer,
            "hydratedButtons": but
          }
        }
      }), options)
      EveloCodeRD.relayMessage(jid, template.message, {
        messageId: template.key.id
      })
    }
  
    EveloCodeRD.sendButImg = async (jid, path, teks, fke, but) => {
      let img = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      let fjejfjjjer = {
        image: img,
        jpegThumbnail: img,
        caption: teks,
        fileLength: "1",
        footer: fke,
        buttons: but,
        headerType: 4,
      }
      EveloCodeRD.sendMessage(jid, fjejfjjjer, {
        quoted: m
      })
    }
  
    /**
     * Send Media/File with Automatic Type Specifier
     * @param {String} jid
     * @param {String|Buffer} path
     * @param {String} filename
     * @param {String} caption
     * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
     * @param {Boolean} ptt
     * @param {Object} options
     */
    EveloCodeRD.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
      let type = await EveloCodeRD.getFile(path, true)
      let {
        res,
        data: file,
        filename: pathFile
      } = type
      if (res && res.status !== 200 || file.length <= 65536) {
        try {
          throw {
            json: JSON.parse(file.toString())
          }
        } catch (e) {
          if (e.json) throw e.json
        }
      }
      const fileSize = fs.statSync(pathFile).size / 1024 / 1024
      if (fileSize >= 1800) throw new Error(' The file size is too large\n\n')
      let opt = {}
      if (quoted) opt.quoted = quoted
      if (!type) options.asDocument = true
      let mtype = '',
        mimetype = options.mimetype || type.mime,
        convert
      if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
      else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
      else if (/video/.test(type.mime)) mtype = 'video'
      else if (/audio/.test(type.mime))(
        convert = await toAudio(file, type.ext),
        file = convert.data,
        pathFile = convert.filename,
        mtype = 'audio',
        mimetype = options.mimetype || 'audio/ogg; codecs=opus'
      )
      else mtype = 'document'
      if (options.asDocument) mtype = 'document'
  
      delete options.asSticker
      delete options.asLocation
      delete options.asVideo
      delete options.asDocument
      delete options.asImage
  
      let message = {
        ...options,
        caption,
        ptt,
        [mtype]: {
          url: pathFile
        },
        mimetype,
        fileName: filename || pathFile.split('/').pop()
      }
      /**
       * @type {import('@adiwajshing/baileys').proto.WebMessageInfo}
       */
      let m
      try {
        m = await EveloCodeRD.sendMessage(jid, message, {
          ...opt,
          ...options
        })
      } catch (e) {
        console.error(e)
        m = null
      } finally {
        if (!m) m = await EveloCodeRD.sendMessage(jid, {
          ...message,
          [mtype]: file
        }, {
          ...opt,
          ...options
        })
        file = null // releasing the memory
        return m
      }
    }
  
    //EveloCodeRD.sendFile = async (jid, media, options = {}) => {
    //let file = await EveloCodeRD.getFile(media)
    //let mime = file.ext, type
    //if (mime == "mp3") {
    //type = "audio"
    //options.mimetype = "audio/mpeg"
    //options.ptt = options.ptt || false
    //}
    //else if (mime == "jpg" || mime == "jpeg" || mime == "png") type = "image"
    //else if (mime == "webp") type = "sticker"
    //else if (mime == "mp4") type = "video"
    //else type = "document"
    //return EveloCodeRD.sendMessage(jid, { [type]: file.data, ...options }, { ...options })
    //}
  
    EveloCodeRD.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
        return EveloCodeRD.sendMessage(jid, {
          video: await getBuffer(url),
          caption: caption,
          gifPlayback: true,
          ...options
        }, {
          quoted: quoted,
          ...options
        })
      }
      let type = mime.split("/")[0] + "Message"
      if (mime === "application/pdf") {
        return EveloCodeRD.sendMessage(jid, {
          document: await getBuffer(url),
          mimetype: 'application/pdf',
          caption: caption,
          ...options
        }, {
          quoted: quoted,
          ...options
        })
      }
      if (mime.split("/")[0] === "image") {
        return EveloCodeRD.sendMessage(jid, {
          image: await getBuffer(url),
          caption: caption,
          ...options
        }, {
          quoted: quoted,
          ...options
        })
      }
      if (mime.split("/")[0] === "video") {
        return EveloCodeRD.sendMessage(jid, {
          video: await getBuffer(url),
          caption: caption,
          mimetype: 'video/mp4',
          ...options
        }, {
          quoted: quoted,
          ...options
        })
      }
      if (mime.split("/")[0] === "audio") {
        return EveloCodeRD.sendMessage(jid, {
          audio: await getBuffer(url),
          caption: caption,
          mimetype: 'audio/mpeg',
          ...options
        }, {
          quoted: quoted,
          ...options
        })
      }
    }
  
    /**
     * 
     * @param {*} jid 
     * @param {*} name 
     * @param [*] values 
     * @returns 
     */
    EveloCodeRD.sendPoll = (jid, name = '', values = [], selectableCount = 1) => {
      return EveloCodeRD.sendMessage(jid, {
        poll: {
          name,
          values,
          selectableCount
        }
      })
    }
  
    return EveloCodeRD
  
  }
  
  XeonBotIncBot()
  
  process.on('uncaughtException', function(err) {
    console.log('Caught exception: ', err)
  })