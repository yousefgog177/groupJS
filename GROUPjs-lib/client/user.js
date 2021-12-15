const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')
var clientUser;
 class ClientUser extends Object {
constructor (user, token, clientuser, headersSettingDefault, BodySettingDefault, domain) {
  super  ()
clientUser = clientuser
this.token = token
this.domain = domain
this.BodySettingDefault = BodySettingDefault
this.headersSettingDefault = headersSettingDefault
this.id = user.id
this.username = user.username
this.tag = user.username + "#" + user.discriminator
this.discriminator = user.discriminator
}
async verifyPhone(number, code, password){
let phoneBody = {
phone: number,
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
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/phone-verifications/verify`) , {method: 'post', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
if(json && json.message) throw new Error(json.message)
let body_verify = {
password: password,
phone_token: json.token
}
fetch((`https://${this.domain}/phone-verifications/verify`) , {method: 'post', body: JSON.stringify(body_verify), headers: headers, referrerPolicy: "no-referrer"}).then(async ressa =>{
  let jsons = await ressa.json().catch(err =>{});
if(jsons && jsons.message) throw new Error(jsons.message)

res()


})


})
})
}

async create2FA(password){
const twofactor = require("node-2fa");

const newSecret = twofactor.generateSecret({ name: "Discord 2fa", account: clientUser.id });

const newToken = twofactor.generateToken(newSecret.secret);

let authBody = {
code: newToken.token,
password: password,
secret: newSecret.secret
}
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = authBody
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/users/@me/mfa/totp/enable`) , {method: 'post', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
if(json && json.message) throw new Error(json.message)
json.secretCode = newSecret.secret
res(json)
})
})

}

async phoneGetCode(bin, number){
let phoneBody = {
phone: "+" + bin + number
}
let headers = this.headersSettingDefault
let token = this.token
if(clientUser && clientUser.bot) token = "Bot " + this.token
headers.authorization = token
let body = phoneBody
for(const d of this.BodySettingDefault){
body[d.name] = d.value
}
return await new Promise((res , rej) =>{
fetch((`https://${this.domain}/users/@me/phone`) , {method: 'post', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
if(json && json.message) throw new Error(json.message)
const Verify = require("../endpoints/phone.js")

res(new Verify(number, this.token, clientUser, this.headersSettingDefault, this.BodySettingDefault, this.domain))
})
})
}

 }

module.exports = ClientUser