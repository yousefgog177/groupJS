const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const attachment = require("../asyncs/attachment.js")
 class Attachments extends Array {
constructor (Attachments, token, headersSettingDefault, BodySettingDefault, domain) {
        super(Attachments);
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
this.token = token
this.size = Attachments.length
this.all = Attachments
}
get(num){
  if(!this.all[num - 1] && !this.all.find(d => d.id === num) && !this.all[num]) return;
return new attachment(this.all[num - 1] || this.all.find(d => d.id === num) || this.all[num], this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain)
}


 }

module.exports = Attachments