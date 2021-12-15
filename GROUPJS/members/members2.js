const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const cache = require("../members/members.js")

 class Members extends EventEmitter {
constructor (token, data) {
  super  ()
this.token = token
this.members = new cache(token, data)
}


 }

module.exports = Members