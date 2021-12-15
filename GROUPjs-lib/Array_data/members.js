const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const role = require("../asyncs/role.js")
const ms = require('ms')
var clientUser;
 class Members extends Object {
constructor (members, roles, token, clientuser, guild, headersSettingDefault, BodySettingDefault, domain) {
  super  (members)
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
clientUser = clientuser
this.all = members
this.guild_roles = roles
this.token = token
this.guild = guild
}

get(id){
const member = require("../asyncs/member.js")

if(!this.all.find(d => d.id === id || d.user && d.user.id === id)) return;
let data = this.all.find(d => d.id === id || d.user && d.user.id === id)
return new member(data, this.guild_roles, this.token, clientUser, this.guild, this.headersSettingDefault, this.BodySettingDefault, this.domain)

}

 }

module.exports = Members