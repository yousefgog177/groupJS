const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const client = require("./client/user.js")
const Message = require("./events/messageCreate/manager.js")
const MessageDelete = require("./events/messageDelete/manager.js")

const client_users = require("./client/users.js")
const client_channels = require("./client/channels.js")
const client_messages = require("./client/messages.js")

let wss = new ws( "wss://apigroup.glitch.me/" , [] , { headers:{ "User-Agent": "Glitch" } })

var users = []
var channels = []
var data_client;
var messages = []
 class Client extends EventEmitter {
constructor (data) {
  super  ()
if(!data || !data.token) throw new Error('Token is defined')
this.data = data
fetch(('https://apigroup.glitch.me/api/test-account/') , {method: 'post', body: JSON.stringify({"email": "x", "password": "x", "type": 2, "token": data.token}), headers: { "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
 fetch(('https://apigroup.glitch.me/api/v1/messageslimited=50') , {method: 'GET', headers: { 'authorization': data.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ones =>{
  let jsons = await ones.json();
if(json.message === "Done Login"){
this.token = data.token
for(const d of json.users){
if(data.cache && data.cache === true || data.cache && data.cache === false && d.id === json.data.id || !data.cache && d.id === json.data.id) users.unshift(d)
if(data.cache && data.cache === false && d.id === json.data.id) users.unshift(d)
}
for(const d of json.channels){
if(data.cache && data.cache === true) channels.unshift(d)
}
this.allmessages = []
this.cache = data.cache || false
this.clientdata = json.data
data_client = json.data
this.messages = new client_messages(data.token, this.allmessages, data.cache)

if(Array.isArray(jsons)){

for(const data of jsons){
this.allmessages.unshift(data)
}

}
if(data && data.channel){
fetch(('https://apigroup.glitch.me/api/test-channel/') , {method: 'post', body: JSON.stringify({"channel": data.channel}), headers: { "authorization": this.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
if(json.message !== "Done") this.emit("error-channel", json.message)
})
}
this.users = new client_users(data.token, users)
this.channels = new client_channels(data.token, channels, data.cache)
this.guilds = new client_channels(data.token, channels, data.cache)
this.user = new client(data.token, data_client, data.type || 3)
this.emit("ready")
}else{
this.emit("error", new Error(json.message))
this.token === data.token
}
})
})
var ids = []
setInterval(async ()=>{
   wss.onerror = async function(evt) {
var dn = false
setInterval(async ()=>{
if(dn) return;
dn = true
wss = new ws( "wss://apigroup.glitch.me/" , [] , { headers:{ "User-Agent": "Glitch" } })
}, 2000)
  
 }
     wss.onclose = async function(evt) {
var dn = false
setInterval(async ()=>{
if(dn) return;
dn = true
wss = new ws( "wss://apigroup.glitch.me/" , [] , { headers:{ "User-Agent": "Glitch" } })
}, 2000)
  
   }
wss.on("message" , async message =>{
let msg;
try {msg = JSON.parse(message)} catch { return; }
if(ids.includes(msg.id[0])) return;
ids.unshift(msg.id[0])
if(msg.message === 'success' && msg.author.id !== data_client.id){
this.allmessages.unshift(msg)
}

if(msg.message === 'success'){
if(!this.cache){
let members = []
for(const data of msg.members){
if(data.user.id === data_client.id) members.unshift(data)
}
msg.members = members 
}
this.emit("messageCreate", new Message(this.token, msg, data.type || 2))
}
if(msg.message === "Deleted"){
for(const d of msg.id) this.allmessages.shift(d.id)
}
if(msg.message === "Deleted") this.emit("messageDelete", new MessageDelete(this.token, msg))

     })
}, 5000)
this.type = data.type
}

async deleteAllMessages(){
  return await new Promise((res , rej) =>{
fetch(('https://apigroup.glitch.me/api/clear/') , {method: 'post', body: JSON.stringify({"id": "all"}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
res(json.message)
})
})
}


async deleteMessage(messageID){
  return await new Promise((res , rej) =>{
fetch(('https://apigroup.glitch.me/api/clear/') , {method: 'post', body: JSON.stringify({"id": messageID}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
res(json.message)
})
})
}


async editMessage(messageID, to){
return await new Promise((res , rej) =>{
 fetch(('https://apigroup.glitch.me/api/editmessage/') , {method: 'post', body: JSON.stringify({id: messageID, to: to}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message !== 'success') throw new Error(json.message)
res(json.message)
 })
})
}

async createMessage(channel, message){
return await new Promise((res , rej) =>{
 fetch(('https://apigroup.glitch.me/api/v1/sendchat') , {method: 'post', body: JSON.stringify({"type": this.type,"message": message, "channel": channel}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message !== "success") throw new Error(json.message)
messages.unshift(json)
var users = []
for(const d of json.members) if(this.cache === true && this.clientdata.id !== d.user.id) users.unshift(d)
json.members = users
res(new Message(this.token, json, this.type, this.data.type || 2))
})
})
}
 }

module.exports = Client
/*const fetch = require('node-fetch')
let EventEmitter = require("events");
const ws = require("ws")
const members = require("./blocks/users.js")
const message = require("./blocks/message.js")
const permission = require("./blocks/permission.js")
const client = require("./blocks/client.js")
const invite = require("./blocks/invite.js")
const Message = require("./data/message.js")
const guild = require("./blocks/guild.js")
const edit = require("./blocks/edit.js")
const Collections = require("./blocks/Collection.js")

let wss = new ws( "wss://apigroup.glitch.me/" , [] , { headers:{ "User-Agent": "Glitch" } })
//console
var channels = ``
var dat = []
var events = []



 class index extends EventEmitter {
constructor (token) {
  super  ()
this.token = token
this.users = dat
this.edit = new edit(token, dat)
this.user = new client(token, dat) 
this.members = new members(dat, events, token, dat)
this.permission = new permission(token, dat)
this.message = new message(token, dat)
this.invite = new invite(token, dat)
this.guild = new guild(token, dat)
this.has = "name"
this.Collection = new Collections()
}

/*
    async getting() {


    }

async event(event){
if(!event) return 'event started'
for(const data of event){
events.unshift(data)
}
return 'event started'
}

async ws(command){
if(command === 'reconnect'){
  return await new Promise((res , rej) =>{
   wss.onerror = async function(evt) {
var dn = false
setInterval(async ()=>{
if(dn) return;
dn = true
wss = new ws( "wss://apigroup.glitch.me/" , [] , { headers:{ "User-Agent": "Glitch" } })
res()
}, 2000)
  
 }
     wss.onclose = async function(evt) {
var dn = false
setInterval(async ()=>{
if(dn) return;
dn = true
wss = new ws( "wss://apigroup.glitch.me/" , [] , { headers:{ "User-Agent": "Glitch" } })
res()
}, 2000)
  
   }
  
  })
}
return await new Promise((res , rej) =>{
wss.on("message" , async message =>{
let msg;
try {msg = JSON.parse(message)} catch { return; }
if(msg.channel.name === channels) return;
if(msg.message === 'edit') this.emit("messageEdit", msg)
if(msg.message === 'Deleted' && msg.all === false) this.emit("messageDelete", msg)
if(!msg.content) return;
res(msg)
this.emit("messageCreate", new Message(msg, this.token, dat))
})
})

}
async login(token, channel, email, password){
if(!token || !channel) throw new Error('Token Or Channel Is Defined')

if(!email && !password){
  return await new Promise((res , rej) =>{
fetch(('https://apigroup.glitch.me/api/test-account/') , {method: 'post', body: JSON.stringify({"email": "x", "password": "x", "type": 2, "token": token}), headers: { 'authorization': token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
if(json.message === "Done Login"){
for(const data of json.users){
var fetched = false
for(const datas of dat){
if(datas.id === data.id) fetched = true
}
if(!fetched && events.includes('cache')) dat.unshift({username: data.username, discriminator: data.discriminator, bot: data.bot, channel: data.channel, tag: data.discriminator, id: data.id})
}
 this.emit("ready")

}
res(json)
})
fetch(('https://apigroup.glitch.me/api/test-channel/') , {method: 'post', body: JSON.stringify({"channel": channel}), headers: { 'authorization': this.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
if(json.message === 'Done') channels = channel
if(json.message === 'Done') this.emit("chat")
res(json)
})
})
}else{
  return await new Promise((res , rej) =>{
fetch(('hhttps://apigroup.glitch.me/api/test-channel/') , {method: 'post', body: JSON.stringify({"channel": channel}), headers: { 'authorization': this.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
if(json.message === 'Done') channels = channel
if(json.message === 'Done') this.emit("chat")
res(json)
})
fetch(('https://apigroup.glitch.me/api/test-account/') , {method: 'post', body: JSON.stringify({"email": email, "password": password, "type": 1, "token": "x"}), headers: { 'authorization': token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
res(json)
if(json.message === "Done Login") this.emit("ready")
})
})
}


}

async connect(){
return await new Promise((res , rej) =>{
wss.on("message" , async message =>{
let msg;
try {msg = JSON.parse(message)} catch { return; }
if(msg.channel.name !== channels) return;
if(msg.message === 'edit') this.emit("messageEdit", msg)
if(msg.message === 'Deleted' && msg.all === false) this.emit("messageDelete", msg)
if(!msg.content) return;
res(new Message(msg, this.token, dat))
this.emit("messageCreate", new Message(msg, this.token, dat))
})
})
}


async createMessage(channel, msg, type){
if(!channel) throw new Error('Content Is Defined')
if(!type) type = 2
if(msg){
return await new Promise((res , rej) =>{
 fetch(('https://apigroup.glitch.me/api/v1/sendchat') , {method: 'post', body: JSON.stringify({"type": type,"message": msg, "channel": channel}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
res(new Message(json, this.token, dat))
})
})
return;
}
if(!msg){
return await new Promise((res , rej) =>{
 fetch(('https://apigroup.glitch.me/api/v1/sendchat') , {method: 'post', body: JSON.stringify({"type": type,"message": channel}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
res(new Message(json, this.token, dat))
})
})
return;
}
}



}
module.exports = index*/