const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const Message = require("../asyncs/message.js")
var clientUser;
 class Messages extends Array {
constructor (messages, token, clientuser, headersSettingDefault, BodySettingDefault, domain) {
        super(messages);
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
clientUser = clientuser
this.token = token
this.size = messages.length
this.all = messages
}
get(id){
  if(!this.all.find(d => d.id === id)) return;
return new Message(this.all.find(d => d.id === id), this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)
}


 }

module.exports = Messages