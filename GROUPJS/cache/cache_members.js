const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const member = require("../channel/member.js")

 class Users extends Array {
constructor (token, data) {
  super  (data)
this.token = token
this.users = data
let zize = data
if(data) zize = data.length
this.size = zize
Array(data)
}

get(id){
if(this.users.find(d => `${d.id}` === `${id}`)) return this.users.find(d => `${d.id}` === `${id}`)
for(const d of this.users){
if(d.user && `${d.user.id}` === `${id}`) return new member(this.token, d, d.user || d)
}
}

has(data){
return this.users.find(data)
}
 }

module.exports = Users