const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
var clientUser;
var channelss;
 class CategoryChannel extends Object {
constructor (data, channels, clientuser, token, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
this.token = token
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
clientUser = clientuser
channelss = channels
this.id = data.id
this.name = data.name
this.type = data.type
this.position = data.position
this.permission_overwrites = data.permission_overwrites
const channels_Array = require('../Array_data/channels.js')
this.channels = new channels_Array(channels.filter(d => d.parent_id === data.id), token, clientUser, headersSettingDefault, BodySettingDefault, domain)
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
const channel_Category = require("../channel/category.js")
fetch((`https://${this.domain}/channels/${this.id}`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let jsons = await ress.json().catch(err =>{})
res(new channel_Category(jsons, channelss, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain))
 
})
 })
})
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

 }

module.exports = CategoryChannel