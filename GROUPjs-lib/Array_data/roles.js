const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const role = require("../asyncs/role.js")
var clientUser;
 class Roles extends Array {
constructor (roles, guild, clientuser, token, headersSettingDefault, BodySettingDefault, domain) {
  super  (roles)
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
clientUser = clientuser
this.token = token
this.size = roles.length
this.all = roles
this.guild = guild
}

get(id){
if(!this.all.find(d => d.id === id)) return;
return new role(this.all.find(d => d.id === id), this.guild, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain)
}

async create(name, options){
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
let permissions = 0
let color = 0
if(options && options.permissions) permissions = options.permissions
if(options && options.color) color = options.color
let settings = {
name: name,
premissions: permissions,
color: color
}
return await new Promise((res , rej) =>{
 fetch((`https://${this.domain}/guilds/${this.guild.id}/roles`) , {method: 'POST', body: JSON.stringify(settings), headers: { 'authorization': token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
res(json, this.guild, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain)
 })
})
}

 }

module.exports = Roles