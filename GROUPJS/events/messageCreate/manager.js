const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const channel = require("../../events/messageCreate/channel.js")
const guild = require("../../events/messageCreate/guild.js")
const member = require("../../channel/member.js")
const members = require("../../members/members.js")

 class Message extends EventEmitter {
constructor (token, data) {
  super  ()
this.author = data.author
this.token = token
this.id = data.id
this.timestamp = data.timestamp
this.content = data.content
this.channel = new channel(token, data.channel)
this.members =  new members(token, data.members)
this.guild = new guild(token, data)
this.member = new member(token, data.member, data.author)
}

async edit(to){
return await new Promise((res , rej) =>{
 fetch(('https://apigroup.glitch.me/api/editmessage/') , {method: 'post', body: JSON.stringify({id: this.id, to: to}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message !== 'success') throw new Error(json.message)
res(json.message)
})
})
}
async delete(){
  return await new Promise((res , rej) =>{
fetch(('https://apigroup.glitch.me/api/clear/') , {method: 'post', body: JSON.stringify({"id": this.id}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
res(json.message)
})
})
}
 }

module.exports = Message