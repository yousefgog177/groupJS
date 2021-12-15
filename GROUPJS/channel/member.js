const fetch = require('node-fetch')
let EventEmitter = require("events");
let ws = require('ws')

 class member extends EventEmitter {
constructor (token, data, author) {
  super  ()
this.author = author
this.user = author
this.member = author
this.token = token
this.permission = data.permission 

}

async addRole(permission){
if(!permission) throw new Error('No PERMISSION')
return await new Promise((res , rej) =>{
 fetch(('https://apigroup.glitch.me/api/add-permission/') , {method: 'post', body: JSON.stringify({"user": this.author.id, "permission": permission}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message === "No Login") throw new Error('USER is unfined')
res(json.message)

 })
 })
}
async removeRole(permission){
if(!permission) throw new Error('No PERMISSION')
return await new Promise((res , rej) =>{
 fetch(('https://apigroup.glitch.me/api/remove-permission/') , {method: 'post', body: JSON.stringify({"user": this.author.id, "permission": permission}), headers: { 'authorization': this.token, 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.message === "No Login") throw new Error('USER is unfined')
if(json.message !== "Done") throw new Error(json.message)
res(json.message)
 })
 })
}

 }

module.exports = member