const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const attachments = require("../Array_data/attachments.js")

const user = require("../asyncs/user.js")
var clientUser;
 class Message extends Object {
constructor (data, token, clientuser, headersSettingDefault, BodySettingDefault, domain) {

  super  ()
clientUser = clientuser
this.pinned = data.pinned
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
this.channel_id = data.channel_id
this.embeds = data.embeds
this.id = data.id
this.author = new user(data.author, token, clientUser, headersSettingDefault, BodySettingDefault, domain)
}

   async getReactions(options){

////channels/{channel.id}/messages/{message.id}/reactions/{emoji}
let headers = this.headersSettingDefault

let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
var Array_params = []
if(options && options.after) Array_params.unshift({name: "after", value: options.after})
if(options && options.limit) Array_params.unshift({name: "limit", value: options.limit})
return await new Promise((res , rej) =>{

var params = ``
for(let d of Array_params){
params = params  + `?${d.name}=${d.value}`
}
//https://${this.domain}/channels/${channel}/messages${params}
var emoji = ``
if(options && options.emoji) emoji = "/" + options.emoji

if(!emoji && this.reactions[0] && this.reactions[0].emoji.id) emoji = `/${this.reactions[0].emoji.name}:${this.reactions[0].emoji.id}`
if(!emoji && this.reactions[0] && !this.reactions[0].emoji.id) emoji = `/${this.reactions[0].emoji.name}`
fetch((`https://${this.domain}/channels/${this.channel_id}/messages/${this.id}/reactions${emoji}`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
console.log(json)
})
})
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

module.exports = Message