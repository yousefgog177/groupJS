const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const guild = require("../asyncs/guild.js")
var clientUser;
 class Guilds extends Array {
constructor (guilds, token, clientuser, headersSettingDefault, BodySettingDefault, domain) {
        super(guilds);
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
clientUser = clientuser
this.token = token
this.size = guilds.length
this.all = guilds
}
get(id){
  if(!this.all.find(d => d.id === id)) return this.all.find(d => d.id === id)
return new guild(this.all.find(d => d.id === id), this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)
}


 }

module.exports = Guilds