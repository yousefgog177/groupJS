const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const cache = require("../members/members2.js")
const invites = require("../Array_data/invites.js")
 class index extends EventEmitter {
constructor (token, id) {
  super  ()
this.channel = id
this.token = token
}
async get(code){
fetch(('https://apigroup.glitch.me/api/invites') , {method: 'PATCH', body: JSON.stringify({"code": code}), headers: { "authorization": this.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
console.log(json)
})
}

async create(){
fetch(('https://apigroup.glitch.me/api/invites') , {method: 'PUT', body: JSON.stringify({"chat": this.channel}), headers: { "authorization": this.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
console.log(json)
})
}

 }

module.exports = index