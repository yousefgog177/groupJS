const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const members = require("../Array_data/members.js")
var clientUser;
 class Role extends Object {
constructor (data, guild, clientuser, token, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
clientUser = clientuser
this.token = token

this.guild = guild
this.id = data.id
this.name = data.name
this.position = data.position
this.hoist = data.hoist
this.managed = data.managed
this.color = data.color
this.mentionable = data.mentionable
this.permission = data.permissions
}

async edit(options){
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = options
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/guilds/${this.guild.id}/roles/${this.id}`) , {method: 'PATCH', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
const Role = require("../asyncs/role.js")

res(new Role(json, this.guild, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain))
 })
})
}

async delete(){
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = {}
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
 fetch((`https://${this.domain}/guilds/${this.guild.id}/roles/${this.id}`) , {method: 'DELETE', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
res()
 })
})
}

 }

module.exports = Role