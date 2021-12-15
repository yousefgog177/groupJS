const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const user = require("../asyncs/user.js")
const guild = require("../asyncs/guild.js")
const attachments = require("../Array_data/attachments.js")
const channel_Text = require("../channel/text.js")
const channel_Voice = require("../channel/voice.js")
const role = require("../asyncs/role.js")
const member = require("../asyncs/member.js")
var clientUser;
 class messageCreate extends Object {
constructor (data, guilds, clientuser, token, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
clientUser = clientuser
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
if(!data.member) return;
this.pinned = this.pinned
this.type = data.type
this.components = data.components
this.reactions = data.reactions || []
this.mentions = data.mentions
this.mentionsRoles = data.mention_roles
this.mentionEveryone = data.mention_everyone
this.tts = data.tts
this.timestamp = new Date(data.timestamp).getTime()
this.edited_timestamp = new Date(data.edited_timestamp).getTime()
this.flags = data.flags
this.attachments = new attachments(data.attachments, token, headersSettingDefault, BodySettingDefault, domain)
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
this.token = token
this.content = data.content
this.channel;
var channel = guilds.find(d => d.id === data.guild_id).channels.find(d => d.id === data.channel_id)
var channels = guilds.find(d => d.id === data.guild_id).channels
if(channel.type === 0) this.channel = new channel_Text(channel, channels, token, clientuser, headersSettingDefault, BodySettingDefault, domain)
this.channel_id = data.channel_id
this.embeds = data.embeds
this.id = data.id
this.author = new user(data.author, token, clientUser, headersSettingDefault, BodySettingDefault, domain)
this.guild = new guild(guilds.find(d =>d && d.id === data.guild_id || d[0] && d[0].id === data.guild_id), token, clientUser, headersSettingDefault, BodySettingDefault, domain)
this.token = token
let membera = {
user: data.author,
roles: data.member.roles,
 premium_since: data.member.premium_since,
  pending: data.member.pending,
  nick: data.member.nick,
  mute: data.member.mute,
  joined_at: data.member.joined_at,
  is_pending: data.member.is_pending,
  hoisted_role: data.member.hoisted_role,
  deaf: data.member.deaf
}

let roles = guilds.find(d => d && d.id === data.guild_id || d[0] && [0].id === data.guild_id)
if(roles) roles = roles.roles || roles[0].roles
this.member = new member(membera, roles, this.token, clientUser, guilds.find(d =>d && d.id === data.guild_id || d[0] && d[0].id === data.guild_id), headersSettingDefault, BodySettingDefault, domain)
}

async delete(){
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token

return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${this.channel_id}/messages/${this.id}`) , {method: 'DELETE', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
res()
})
})
}

async edit(new_msg, options){
let tts = false
if(options && options.tts && options.tts === true || options && options.tts && options.tts === false) tts = options.tts 
let msgSetting = {
content: new_msg,
tts:  tts
}
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = msgSetting
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${this.channel_id}/messages/${this.id}`) , {method: 'PATCH', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
const Message = require("../asyncs/message.js")

res(new Message(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
})
})
}

 }

module.exports = messageCreate