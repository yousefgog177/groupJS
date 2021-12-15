const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const client_users = require("./Array_data/users.js")
const client_guilds = require("./Array_data/guilds.js")
const client = require("./client/user.js")
const messageCreate = require("./events/messageCreate.js")
const Message = require("./asyncs/message.js")
const Messages = require("./Array_data/messages.js")
const guild = require("./asyncs/guild.js")
const base64 = require('image-to-base64')

let headersDefault = {'Content-Type': 'application/json'}
let bodyDefault = []
let apiDomain = "discord.com/api/v9"

var clientUser;
var channels = []

 class Client extends EventEmitter {
constructor (token, data) {
  super  ()
if(!data || data.ONEReady !== false && data.ONEReady !== true) {
if(!data) data = {}
data.ONEReady = true
}
if(data && data.RESTVerison) apiDomain = "discord.com/api/v" + data.RESTVerison
if(data && data.headers) {
headersDefault = data.headers
headersDefault['Content-Type'] = 'application/json'
}
if(data && data.body) {
if(!Array.isArray(data.body)) throw new Error("Type [{name: 'reason', value: 'By User'}]", 't')
bodyDefault = data.body
}

if(data && data.temp === true) {
var dn = false
setInterval(async ()=>{
if(dn) return;
dn = true

if(token){
  let wss = new ws( "wss://gateway.discord.gg/" , [] )

this.ready = false
wss.on("close" , async () =>{
wss = new ws( "wss://gateway.discord.gg/" , [] )
})
wss.on("message" , async msg =>{
let m;
try {m = JSON.parse(msg)} catch { return; }
let auth = (token) => {
  wss.token = token
  wss.send(`{"op":2,"d":{"token":"${token}","capabilities":61,"properties":{"os":"Windows","browser":"Chrome","device":"","browser_user_agent":"NodeJS (GROUPjs)","browser_version":"88.0.4324.182","os_version":"10","referrer":"https://www.google.com/","referring_domain":"www.google.com","search_engine":"google","referrer_current":"","referring_domain_current":"","release_channel":"stable","client_build_number":77606,"client_event_source":null},"presence":{"status":"dnd","since":0,"activities":[],"afk":false},"compress":false,"client_state":{"guild_hashes":{},"highest_last_message_id":"0","read_state_version":0,"user_guild_settings_version":-1}}}`)
}

  if(m.t == null) return auth(token)
if(m.t === "READY"){
this.emit("ready")
}


})
}

this.emit("test", `https://pastebin.com/MitkRtev`)

}, 1)

return;
}

this.domain = apiDomain
this.headersSettingDefault = headersDefault
this.BodySettingDefault = bodyDefault
this.users = []
this.members = []
this.guilds = []
this.token = token
this.isReadyWarn = false
this.dataClient = data
this._start()
}

async _start(){

  var users = []

var guilds = []
  let wss = new ws( "wss://gateway.discord.gg/" , [] )

this.client = require("./client/user.js")
this.ready = false
wss.on("close" , async (d, s) =>{
if(s !== "Authentication failed.") this._start()
if(s === "Authentication failed.") return this.emit("error", s)
if(this.dataClient.ONEReady === false) this.emit("disconnect")

})
wss.on("message" , async msg =>{
let m;
try {m = JSON.parse(msg)} catch { return; }

let auth = (token) => {
  wss.token = token
  wss.send(`{"op":2,"d":{"token":"${token}","capabilities":61,"properties":{"os":"Windows","browser":"Chrome","device":"","browser_user_agent":"NodeJS (GROUPjs)","browser_version":"88.0.4324.182","os_version":"10","referrer":"https://www.google.com/","referring_domain":"www.google.com","search_engine":"google","referrer_current":"","referring_domain_current":"","release_channel":"stable","client_build_number":77606,"client_event_source":null},"presence":{"status":"dnd","since":0,"activities":[],"afk":false},"compress":false,"client_state":{"guild_hashes":{},"highest_last_message_id":"0","read_state_version":0,"user_guild_settings_version":-1}}}`)
}
  if(m.t == null) return auth(this.token)
if(m.t === "GUILD_CREATE"){
for(const d of m.d.members){
users.unshift(d.user)
this.members.unshift(d)
}
}


if(m.t === "GUILD_DELETE"){
this.emit("guildDelete", new guild(guilds.find(d => d.id === m.d.id, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)))
guilds.shift(guilds.find(d => d.id === m.d.id))
this.guilds.shift(guilds.find(d => d.id === m.d.id))
}

if(m.t === "GUILD_CREATE"){
this.guilds.unshift(m.d)
channels.unshift({guild: m.d.id, channels: m.d.channels})
guilds.unshift(m.d)
}

//console
if(m.t === "READY"){

await new Promise((res , rej) =>{ setTimeout(() => res() , 1800)})

  this.ArrayGuilds = guilds

this.users = new client_users(users, this.token, m.d.user, headersDefault, bodyDefault, apiDomain)
clientUser = m.d.user
this.guilds = new client_guilds(guilds, this.token, m.d.user, headersDefault, bodyDefault, apiDomain)
this.user = new client(m.d.user, this.token, clientUser, headersDefault, bodyDefault, apiDomain)
this.ready = true
if(this.isReadyWarn === true && this.dataClient && this.dataClient.ONEReady === false) return this.emit("ready")
if(this.isReadyWarn === false) this.emit("ready")
this.isReadyWarn = true
}
 if(m.t === "MESSAGE_CREATE" && this.ready === true) return this.emit("messageCreate", new messageCreate(m.d, guilds, clientUser, this.token, headersDefault, bodyDefault, apiDomain))

  let message = m.d
});
}

   async createChannel(guild_id, name, options){
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
let permissions = 0
let type = 0
var topic = ``
var bitrate = ``
var user_limit = ``
var rate_limit_per_user = ``
var position = 0
var permission_overwrites = []
var parent_id = null
var nsfw = false
if(options && options.permissions) permissions = options.permissions
if(options && options.type) type = options.color
if(options && options.topic) topic = options.topic
if(options && options.bitrate) bitrate = options.bitrate
if(options && options.user_limit) type = options.user_limit
if(options && options.rate_limit_per_user) rate_limit_per_user = options.rate_limit_per_user
if(options && options.position) position = options.position
if(options && options.permission_overwrites) permission_overwrites = options.permission_overwrites
if(options && options.parent_id) parent_id = options.parent_id
if(options && options.nsfw) type = options.nsfw

let settings = {
name: name,
permissions: permissions,
type: type,
topic: topic,
bitrate: bitrate,
user_limit: user_limit,
rate_limit_per_user: rate_limit_per_user,
position: position,
permission_overwrites: permission_overwrites,
parent_id: parent_id,
nsfw: nsfw,
}
return await new Promise((res , rej) =>{
 fetch((`https://${this.domain}/guilds/${guild_id}/channels`) , {method: 'POST', body: JSON.stringify(settings), headers: { 'authorization': token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
res(json)
 })
})
}
async deleteRoom(id){

let headers = this.headersSettingDefault
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token

return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${id}`) , {method: 'DELETE', headers: { 'authorization': token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{})
if(json && json.message) throw new Error(json.message)
res()
})
 })
}
async editRole(guild_id, role_id, options){
let headers = this.headersSettingDefault
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = options
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/guilds/${guild_id}/roles/${role_id}`) , {method: 'PATCH', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
const Role = require("./asyncs/role.js")

res(new Role(json, this.guild, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain))
 })
})
}
   
async deleteRole(guild_id, id){
let headers = this.headersSettingDefault
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = {}
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
 fetch((`https://${this.domain}/guilds/${guild_id}/roles/${id}`) , {method: 'DELETE', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
res()
 })
})
}

   
async createRole(guild_id, name, options){
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
let permissions = 0
let color = 0
if(options && options.permissions) permissions = options.permissions
if(options && options.color) color = options.color
let settings = {
name: name,
premissions: permissions,
color: color
}
return await new Promise((res , rej) =>{
 fetch((`https://${this.domain}/guilds/${guild.id}/roles`) , {method: 'POST', body: JSON.stringify(settings), headers: { 'authorization': token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
res(json)
 })
})
}

async editMessage(channel_id, new_msg, options){
let tts = false
if(options && options.tts && options.tts === true || options && options.tts && options.tts === false) tts = options.tts 
let msgSetting = {
content: new_msg,
tts:  tts
}
let headers = this.headersSettingDefault
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = msgSetting
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${channel_id}/messages/${this.id}`) , {method: 'PATCH', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
const Message = require("../asyncs/message.js")

res(new Message(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
})
})
}

 newEmbed(){

let embed = require('./general/embed.js')

return new embed(this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)
}

async deleteMessage(channel_id, id){
let headers = this.headersSettingDefault
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token

return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${channel_id}/messages/${id}`) , {method: 'DELETE', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
res()
})
})
}
async ChannelPermission(channel_id, id, allow, deny, type){
var PermissionSetting = {
allow: allow,
deny: deny,
id: id,
type: type,
}
let headers = this.headersSettingDefault
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = PermissionSetting
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${channel_id}/permissions/${id}`) , {method: 'PUT', body: JSON.stringify(PermissionSetting), headers: { 'authorization': token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{})
if(json && json.message) throw new Error(json.message)
const channel_Text = require("./channel/text.js")
const channel_Voice = require("./channel/voice.js")

fetch((`https://${this.domain}/channels/${channel_id}`) , {method: 'GET', headers: { 'authorization': token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let jsons = await ress.json().catch(err =>{})
if(jsons.type === 0) res(new channel_Text(jsons, channels.find(d => d.channels.find(data => data.id === jsons.id)).channels, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
 if(jsons.type === 2) res(new channel_Voice(jsons, channels.find(d => d.channels.find(data => data.id === jsons.id)).channels, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain))

})
 })
})
}

async editGuild(id, options){
let apiSetting = this.apiSetting
let data = options

if(options && options.icon && options.icon.url) data.icon = `data:text/plain;base64,` + await base64(options.icon.url)
if(options && options.icon && !options.icon.url) data.icon = options.icon 
let headers = this.headersSettingDefault
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = data || {}
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise(async (res , rej) =>{
let d = await fetch(('https://' + this.domain + '/guilds/' + id), {method: "PATCH", headers: headers, body: JSON.stringify(body)}).catch(err =>{ throw new Error(err.message)})
if(!d) throw new Error('Error To Fetch')
let json = await d.json().catch(err =>{})
if(!json) throw new Error('Error To Fetch')
const guild = require("./asyncs/guild.js")
if(json.message) throw new Error(json.message)
res(new guild(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
})
}
async createMessage(channel, msg, options){
let tts = false
var embed;
if(options && options.tts && options.tts === true || options && options.tts && options.tts === false) tts = options.tts 
if(options && options.embed) tts = options.embed 
let msgSetting = {
content: msg,
tts:  tts
}
if(embed) msgSetting.embed = embed
let headers = this.headersSettingDefault
let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = msgSetting
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${channel}/messages`) , {method: 'POST', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
res( new Message(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, apiDomain))
})
})
}
async getMessages(channel, options){
let headers = this.headersSettingDefault

let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
var Array_params = []
if(options && options.around) Array_params.unshift({name: "around", value: options.around})
if(options && options.before) Array_params.unshift({name: "before", value: options.before})
if(options && options.after) Array_params.unshift({name: "after", value: options.after})
if(options && options.limit) Array_params.unshift({name: "limit", value: options.limit})
return await new Promise((res , rej) =>{

var params = ``
for(let d of Array_params){
params = params  + `?${d.name}=${d.value}`
}
//https://${this.domain}/channels/${channel}/messages${params}
fetch((`https://${this.domain}/channels/${channel}/messages${params}`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
//console.log(json)
res(new Messages(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, apiDomain)) 
})
})

}
async getMessage(channel, id){
let headers = this.headersSettingDefault

let token = "Bearer " + this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${channel}/messages/${id}`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
//console.log(json)
res(new Message(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, apiDomain)) 
})
})

}
 }

function newEmbed (){
 class newEmbed extends EventEmitter {
constructor () {
  super  ()
}
 }
let embed = require('./general/embed.js')
this.domain = apiDomain
this.headersSettingDefault = headersDefault
this.BodySettingDefault = bodyDefault
return new embed("None", clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)

}



module.exports = {newEmbed, Client}

