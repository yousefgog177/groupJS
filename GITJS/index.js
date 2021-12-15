const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')

 class index extends EventEmitter {
constructor (data) {
  super  ()
if(!data || !data.token) throw new Error('Token Is defind')
let prefix = "Bot "
if(data.bot && data.bot === false) prefix = ""
fetch(('https://apigithub.glitch.me/api/v2/login') , {method: 'post', body: JSON.stringify({}), headers: { 'authorization': prefix + data.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json()
if(json.message === "401: Unauthorized") throw new Error(json.message)

})
}


 }

module.exports = index