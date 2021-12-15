const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const Message = require("../asyncs/message.js")
const Messages = require("../Array_data/messages.js")
const category = require("../channel/category.js")
var clientUser;
var channels;
 class TextChannel extends Object {
constructor (data, channelss, token, clientuser, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
channels = channelss
clientUser = clientuser
this.token = token
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
this.id = data.id
this.name = data.name
this.type = data.type
this.topic = data.topic
this.rate_limit_per_user = data.rate_limit_per_user
this.position = data.position
this.permission_overwrites = data.permission_overwrites
this.parent = null
if(data.parent_id) this.parent = new category(channelss.find(d => d.id === data.parent_id), channelss, clientUser, token, headersSettingDefault, BodySettingDefault, domain)
this.nsfw = data.nsfw
this.last_message_id = data.last_message_id
}

async deleteMessage(id){
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token

return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${this.id}/messages/${id}`) , {method: 'DELETE', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
res()
})
})
}
async editMessage(id, new_msg, options){
let tts = false
if(options && options.tts && options.tts === true || options && options.tts && options.tts === false) tts = options.tts 
let msgSetting = {
content: new_msg,
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
fetch((`https://${this.domain}/channels/${this.id}/messages/${id}`) , {method: 'PATCH', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
const Message = require("../asyncs/message.js")

res(new Message(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
})
})
}
async createMessage(msg, options){
let tts = false
var embed;
if(options && options.tts && options.tts === true || options && options.tts && options.tts === false) tts = options.tts 
if(options && options.embed) tts = options.embed 
let msgSetting = {
content: msg,
tts:  tts
}
if(embed) msgSetting.embed = embed
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = msgSetting
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${this.id}/messages`) , {method: 'POST', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
res( new Message(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
})
})
}
async getMessages(options){
let headers = this.headersSettingDefault

let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
var Array_params = []
if(options && options.around) Array_params.unshift({name: "around", value: options.around})
if(options && options.before) Array_params.unshift({name: "before", value: options.before})
if(options && options.after) Array_params.unshift({name: "after", value: options.after})
if(options && options.limit) Array_params.unshift({name: "limit", value: options.limit})
return await new Promise((res , rej) =>{

var params = ``
for(let d of Array_params){
params = params  + `?${d.name}=${d.value}`
}
//https://${this.domain}/channels/${channel}/messages${params}
fetch((`https://${this.domain}/channels/${this.id}/messages${params}`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
//console.log(json)
res(new Messages(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)) 
})
})

}
async getMessage(id){
let headers = this.headersSettingDefault

let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${this.id}/messages/${id}`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
//console.log(json)
res(new Message(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)) 
})
})

}
async deleteMessage(id){

let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token

return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${id}`) , {method: 'DELETE', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{})
if(json && json.message) throw new Error(json.message)
res()
})
 })
}

async Permission(id, allow, deny, type){
var PermissionSetting = {
allow: allow,
deny: deny,
id: id,
type: type,
}
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = PermissionSetting
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${this.id}/permissions/${id}`) , {method: 'PUT', body: JSON.stringify(PermissionSetting), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{})
if(json && json.message) throw new Error(json.message)
const channel_Text = require("../channel/text.js")
fetch((`https://${this.domain}/channels/${this.id}`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let jsons = await ress.json().catch(err =>{})
res(new channel_Text(jsons, channels, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
 
})
 })
})
}


 }

module.exports = TextChannel