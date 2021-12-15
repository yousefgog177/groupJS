const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')

 class Attachment extends Object {
constructor (data, token, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
this.id = data.id
this.file_name = data.filename
this.size = data.size
this.url = data.url
this.proxy_url = data.proxy_url
this.width = data.width
this.height = data.height
this.content_type = data.content_type
this.type = data.content_type.replace('image/', '').replace('video/', '')
}




 }

module.exports = Attachment