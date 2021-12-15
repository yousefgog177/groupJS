const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
var clientUser;
 class User extends EventEmitter {
constructor (data, token, clientuser, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
this.token = token
clientUser = clientuser
this.username = data.username
this.public_flags = data.public_flags
this.id = data.id
this.tag = data.username + "#" + data.discriminator
this.discriminator = data.discriminator
this.avatar= data.avatar
}

async createMessage(msg, options){
let tts = false
if(options && options.tts && options.tts === true || options && options.tts && options.tts === false) tts = options.tts 
let msgSetting = {
content: msg,
tts:  tts
}
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = msgSetting
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
  
return await new Promise((res , rej) =>{
 fetch((`https://${this.domain}/users/@me/channels`) , {method: 'POST', body: JSON.stringify({recipients: [this.id]}), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let jsons = await ress.json();
if(!jsons.id) throw new Error(jsons.message)
fetch((`https://${this.domain}/channels/${jsons.id}/messages`) , {method: 'POST', body: JSON.stringify(msgSetting), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
const Message = require("../asyncs/message.js")

res(new Message(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
 })
 })
})
}

 }

module.exports = User