const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const member = require("../../members/members.js")
const invites = require("../../Array_data/invites.js")

 class Guild extends EventEmitter {
constructor (token, data) {
  super  ()
this.invites = new invites(token)
this.id = data.channel.name
this.name = data.channel.name
this.members = new member(token, data.members)
}

 }

module.exports = Guild