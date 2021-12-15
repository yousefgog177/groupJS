/*
Package GROUPJS:

needed await or then, this package use: ws + node-fetch

Getting started:
// Go to package.json
// add GROUPJS verison: *

// Ping pong:

const G1 = require("./GROUPJS/index.js")
let client = new G1();
client.login('token bot') // login in bot
client.setchat('general') // set bot to chat
// or use client.createMessage('pong', '123')
// self bot sended use client.createMessage('pong', '', 1) // this is send to client.setchat
// self bot sended to other chat none client.setchat use client('pong', '123', 1)
wss.on("message" , async message =>{
let msg;
try {msg = JSON.parse(message)} catch { return; }
if(!msg.content) return;
var cmd = msg.content.split(" ")[0]
if(msg.content === "!ping"){
client.createMessage('pong')
}
})

// Started

// user:

// get user for ID:
client.members.get('id').then(g =>{})
or
let user = await client.members.get('id')

// get user for name:
client.members.has('name').then(g =>{})
or
let user = await client.members.has('name')

// get all user's:
client.members.all().then(g =>{})
or
let await client.member.all()

// permission:

// List permission to user:
let perms = await client.permission.list('user')
// perms = all permission to user
or
let perm = await client.permission.list('user', 'adminstartor')
// perm = true or false

// add permission to user:
client.permission.add('user', 'permission')

// remove permission to user:
client.permission.delete('user', 'permission')

// client:
Get ID Bot: await client.user.id()
Get Username Bot: await client.user.username()
Get tag Bot: await client.user.tag()

// message:

// limited Message:
let messages = await client.message.limited()
// messages = Message in client.setchat

// get id message:
let msg = await.message.fetch('!ping', '["1","2"]') // ('1','2') // 1: Message // 2: ID Message none
// msg = messages id

// delete messages:
client.delete('id') // delete message for id
client.delete() // delete all message for client.setchat()

*/