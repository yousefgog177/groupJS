const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const cache = require("../members/members2.js")
const channel = require("../async/channel.js")

 class Channels extends Array {
constructor (token, data, caches) {
  super  (data)
this.token = token
this.channels = data
this.cache = caches
this.guilds = data
this.size = data.length
}

async get(id){
return await new Promise((res , rej) =>{
 fetch(('https://apigroup.glitch.me/api/channel/' + id) , {method: 'GET', headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message === "This Channel is Not Found!") res()
let members = []
if(this.cache && this.cache === true) members = json.members
 res(new channel(this.token, members, id))
})
})
}

has(data){
return this.channels.find(data)
}
 }

module.exports = Channels