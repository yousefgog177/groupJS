const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const invites = require("../../Array_data/invites.js")

 class Channel extends EventEmitter {
constructor (token, data) {
  super  ()
this.invites = new invites(token)
this.id = data.name
this.name = data.name
}

 }

module.exports = Channel