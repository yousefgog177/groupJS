var clientUser;
var fetch = require('node-fetch')
 class index extends Object {
constructor (data, token, clientuser, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
this.number = data
clientUser = clientuser
this.token = token
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
}

async verify(code, password){
let phoneBody = {
phone: "+" + this.number,
code: code
}
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = phoneBody
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
console.log(phoneBody)
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/phone-verifications/verify`) , {method: 'post', body: JSON.stringify(phoneBody), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
console.log(json)
if(json && json.message) throw new Error(json.message)
let body_verify = {
password: password,
phone_token: json.token
}
fetch((`https://discord.com/api/v9/users/@me/phone`) , {method: 'post', body: JSON.stringify(body_verify), headers: headers, referrerPolicy: "no-referrer"}).then(async ressa =>{
  let jsons = await ressa.json().catch(err =>{});
console.log(jsons)
if(jsons && jsons.message) throw new Error(jsons.message)

res()


})


})
})
}

 }
module.exports = index