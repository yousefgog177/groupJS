const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const user = require("../asyncs/user.js")
var clientUser;

 class Users extends EventEmitter {
constructor (users, token, clientuser, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
  this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
clientUser = clientuser
this.token = token
this.size = users.length
this.all = users
}

 get(id){
if(!this.all.find(d => d.id === id || d.user && d.user.id === id)) return;
let data = this.all.find(d => d.id === id || d.user && d.user.id === id)
return new user(data, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)
}

 }

module.exports = Users