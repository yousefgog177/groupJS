const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const cache = require("../cache/cache_messages.js")

 class Messages extends EventEmitter {
constructor (token, data, caches) {
  super  ()
this.token = token
this.cache = new cache(token, data, caches)
}


 }

module.exports = Messages