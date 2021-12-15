const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const cache = require("../members/members.js")
const invites = require("../Array_data/invites.js")

 class channel extends EventEmitter {
constructor (token, members, id) {
  super  ()
this.members = new cache(token, invites)
this.invites = new invites(token, id)
}


 }

module.exports = channel