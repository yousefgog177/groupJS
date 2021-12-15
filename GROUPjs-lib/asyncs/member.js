const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const user = require("../asyncs/user.js")
const roles = require("../Array_data/roles.js")
var clientUser;
 class Member extends EventEmitter {
constructor (data, allroles, token, clientuser, guild, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
if(!allroles) allroles = []
clientUser = clientuser
this.token = token
this.guild = guild
this.user = new user(data.user)
this._roles = data.roles
this.roles = new roles(allroles.filter(d =>data.roles.find(da =>{ 
if(!d.id === da) return d.id === da
if(d.id === da) return d.id === da
}
)), guild, clientUser, token, headersSettingDefault, BodySettingDefault, domain),

this.joined_at = data.joined_at,
this.nick = data.nick,
this.premium_since = data.premium_since,
this.pending = data.premium_since,
this.is_pending = data.is_pending,
this.mute = data.mute,
this.deaf = data.deaf
}
async addRole(id, reason){

let roles = this._roles
if(!this._roles.includes(id)) roles.unshift(id)
console.log(roles)
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = { 
roles: ['858393565880123462']
}
console.log(body)
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
 fetch((`https://${this.domain}/guilds/${this.guild.id}/members/${this.user.id}?reason=${reason}`) , {method: 'PATCH', body: JSON.stringify(body), headers: { 'authorization': token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
roles = []

  let json = await ress.json()
//if(json && json.message) throw new Error(json.message)
res(json)
})
 
})
}
async kick(reason){
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = { reason: reason || ""}
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
 fetch((`https://${this.domain}/guilds/${this.guild.id}/members/${this.user.id}?reason=${reason}`) , {method: 'DELETE', headers: { 'authorization': token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{
res()
})
if(json && json.message) throw new Error(json.message)
res()
 })
})
}

async ban(reason, options){
let delete_message_days = "1"
if(options && options.delete_message_days) delete_message_days = options.delete_message_days
let settings = {
delete_message_days: delete_message_days,
reason: reason || ""
}
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = settings
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
 fetch((`https://${this.domain}/guilds/${this.guild.id}/bans/${this.user.id}`) , {method: 'PUT', body: JSON.stringify(settings), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{
res()
})
if(json && json.message) throw new Error(json.message)
res()
 })
})
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
 fetch((`https://${this.domain}/users/@me/channels`) , {method: 'POST', body: JSON.stringify({recipients: [this.user.id]}), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
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

module.exports = Member