const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
const channel_Text = require("../channel/text.js")
const channel_Voice = require("../channel/voice.js")
const channel_Category = require("../channel/category.js")
const channel_news = require("../channel/news.js")
const channel_stage = require("../channel/stage.js")

const guild = require("../asyncs/guild.js")

var clientUser;
 class Channels extends Array {
constructor (channels, token, clientuser, guild_data, headersSettingDefault, BodySettingDefault, domain) {
        super(channels);
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
clientUser = clientuser
this.guild_id = guild_data.id
this.token = token
this.size = channels.length
this.all = channels
}
get(id){
if(!this.all.find(d => d.id === id)) return;
if(this.all.find(d => d.id === id).type === 13) return new channel_stage(this.all.find(d => d.id === id), this.all, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain)

if(this.all.find(d => d.id === id).type === 5) return new channel_news(this.all.find(d => d.id === id), this.all, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)

if(this.all.find(d => d.id === id).type === 4) return new channel_Category(this.all.find(d => d.id === id), this.all, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain)
if(this.all.find(d => d.id === id).type === 2) return new channel_Voice(this.all.find(d => d.id === id), this.all, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain)
if(this.all.find(d => d.id === id).type === 0) return new channel_Text(this.all.find(d => d.id === id), this.all, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain)
}
   
   async create(name, options){
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
let permissions = 0
let type = 0
var topic = ``
var bitrate = 8000
var user_limit = 0
var rate_limit_per_user = 0
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
 fetch((`https://${this.domain}/guilds/${this.guild_id}/channels`) , {method: 'POST', body: JSON.stringify(settings), headers: { 'authorization': token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message) throw new Error(json.message)
if(json.type === 4) return res(new channel_Category(json, this.all, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain))
if(json.type === 2) return res(new channel_Voice(json, this.all, clientUser, this.token, this.headersSettingDefault, this.BodySettingDefault, this.domain))
if(json.type === 0) return res(new channel_Text(json, this.all, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
 })
})
}


 }

module.exports = Channels