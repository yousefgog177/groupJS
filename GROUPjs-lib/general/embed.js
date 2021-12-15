const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const Message = require("../asyncs/message.js")

 class Embed extends EventEmitter {

constructor (token, clientUser, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
this.clientUser = clientUser
this.token = token
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
this.embed = {embed: {}}
}

content(content){
this.embed.content = content
}

title(title){
this.embed.embed.title = title
return this.embed
}

set(data){
this.embed.embed = data
return this.embed
}

des(description){
this.embed.embed.description = description
return this.embed
}
description(description){
this.embed.embed.description = description
return this.embed
}

addfield(name, value){
if(!this.embed.embed.fields){
this.embed.embed.fields = [{name: name, value: value}]
}else{
this.embed.embed.fields.unshift({name: name, value: value})
}
return this.embed

}

image(image){
this.embed.embed.image = {
url: image
}
return this.embed
}

thumbnail(thumbnail){
this.embed.embed.thumbnail = {
url: thumbnail
}
return this.embed
}


color(color){
this.embed.color = color
return this.embed
}

timestamp(timestamp){
this.embed.timestamp = timestamp
return this.embed
}

footer(text){
this.embed.footer = {
text: text
}
return this.embed
}

getEmbed(){
return this.embed
}

reset(){
 this.embed.embed = {}
return this.embed
}

async createMessage(id){

if(this.token === "None") throw new Error("401: Unauthorized")

let headers = this.headersSettingDefault
let token = "Bearer " + this.token
if(this.clientUser && this.clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = {
embed: this.embed.embed
}
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/channels/${id}/messages`) , {method: 'POST', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
res(new Message(json, this.token, this.clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
})
})
}

 }

module.exports = Embed