const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const member = require("../../channel/member.js")
const members = require("../../members/members.js")

 class MessageDelete extends EventEmitter {
constructor (token, data) {
  super  ()
this.author = data.author
this.token = token
this.id = data.id
this.member = new member(token, data.member, data.author)
}

 }

module.exports = MessageDelete