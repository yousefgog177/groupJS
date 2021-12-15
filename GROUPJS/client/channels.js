const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const cache = require("../cache/cache_channels.js")
const invites = require("../Array_data/invites.js")

 class Channels extends EventEmitter {
constructor (token, data, caches) {
  super  ()
this.token = token
this.cache = new cache(token, data, caches)
}


 }

module.exports = Channels