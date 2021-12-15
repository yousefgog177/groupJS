const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const member = require("../channel/member.js")
const Message = require("../events/messageCreate/manager.js")

 class Messages extends Array {
constructor (token, data, cache) {
  super  (data) 

this.token = token
this.messages = data
this.size = data.length
}

async deleteMessage(){
  return await new Promise((res , rej) =>{
fetch(('https://apigroup.glitch.me/api/clear/') , {method: 'post', body: JSON.stringify({"id": "all"}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
res(json.message)
})
})
}

get(id){
if(!this.messages.find(d => d.id === id)) return this.messages.find(d => d.id === id)
if(this.messages.find(d => d.id === id)) return new Message(this.token,this.messages.find(d => d.id === id))
}

has(data){
return this.messages.find(data)
}
 }

module.exports = Messages