const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const category = require("../channel/category.js")
var clientUser;
var channelss;
 class VoiceChannel extends Object {
constructor (data, channels, clientuser, token, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
clientUser = clientuser
channelss = channels
this.token = token
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
this.bitrate = data.bitrate
this.id = data.id
this.user_limit = data.user_limit
this.rtc_region = data.rtc_region
this.name = data.name
this.type = data.type
this.position = data.position
this.permission_overwrites = data.permission_overwrites
this.parent = null
if(data.parent_id) this.parent = new category(channels.find(d => d.id === data.parent_id), channels, clientUser, token, headersSettingDefault, BodySettingDefault, domain)
this.nsfw = data.nsfw
}

async delete(){

let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token

return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${this.id}`) , {method: 'DELETE', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
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
const channel_Voice = require("../channel/voice.js")
fetch((`https://${this.domain}/channels/${this.id}`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let jsons = await ress.json().catch(err =>{})
res(new channel_Voice(jsons, channelss, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain))
 
})
 })
})
}

 }

module.exports = VoiceChannel