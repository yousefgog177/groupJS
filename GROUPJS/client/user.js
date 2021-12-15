
const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')

 class ClientUser extends EventEmitter {

constructor (token, data, type) {
  super  ()
this.id = data.id
this.username = data.username
this.bot = data.bot
this.token = token
this.discriminator = data.discriminator
this.tag = data.discriminator
this.channel = data.channel
this.type = type
}

async editname(name){
  return await new Promise((res , rej) =>{
fetch(('https://apigroup.glitch.me/api/edit-name/') , {method: 'post', body: JSON.stringify({"name": name, "type": this.type}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
if(json.status === false) throw new Error(json.message)
res(json.message)
})
})
}

 }

module.exports = ClientUser