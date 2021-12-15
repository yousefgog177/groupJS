const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const roles = require("../Array_data/roles.js")
const channels = require('../Array_data/channels.js')
var clientUser;
var channels_Array = []
 class Guild extends Object {
constructor (data, token, clientuser, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
const members = require("../Array_data/members.js")
channels_Array = data.channels
this.channels = new channels(data.channels, token, clientuser, data, headersSettingDefault, BodySettingDefault, domain)
clientUser = clientuser
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
this.id = data.id
this.token = token
this.roles = new roles(data.roles, data, clientUser, token, headersSettingDefault, BodySettingDefault, domain)
this.members = new members(data.members, data.roles, this.token, clientUser, data, headersSettingDefault, BodySettingDefault, domain)
this.name = data.name
this.icon = data.icon
}

async edit(options){
let apiSetting = this.apiSetting
let data = options
function validUrl(url) {
    return /http(s)?:\/\/(\w+:?\w*@)?(\S+)(:\d+)?((?<=\.)\w+)+(\/([\w#!:.?+=&%@!\-/])*)?/gi.test(url);
}

function base64ToNode(buffer) {
    return buffer.toString('base64');
}


function imageToBase64(urlOrImage) {
    if (validUrl(urlOrImage)) {
        return fetch(urlOrImage).then(function (response) {
            return response.buffer();
        }).then(base64ToNode);
    } 
}

if(options && options.icon && options.icon.url) data.icon = `data:text/plain;base64,` + await imageToBase64(options.icon.url)
if(options && options.icon && !options.icon.url) data.icon = options.icon 
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = data || {}
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise(async (res , rej) =>{
let d = await fetch(('https://' + this.domain + '/guilds/' + this.id), {method: "PATCH", headers: headers, body: JSON.stringify(body)}).catch(err =>{ throw new Error(err.message)})
if(!d) throw new Error('Error To Fetch')
let json = await d.json().catch(err =>{})
if(!json) throw new Error('Error To Fetch')
if(json.message) throw new Error(json.message)
const guild = require("../asyncs/guild.js")

json.channels = channels_Array
res(new guild(json, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
})
}

 }

module.exports = Guild