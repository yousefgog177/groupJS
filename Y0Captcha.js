const fetch = require("node-fetch")

let pics = [{
"url": "https://cdn.discordapp.com/attachments/755889784127488021/818842655454527488/unknown.png",
"type": "باص",
"key": "1234-1234-1234-1234"
},
{
"url": "https://cdn.discordapp.com/attachments/755889784127488021/818860270062927912/unknown.png",
"type": "دراجة",
"key": "RifxC5khxdUMZqEI"
},
{
"url": "https://cdn.discordapp.com/attachments/755889784127488021/818860299976704000/unknown.png",
"type": "دراجة",
"key": "yIkDkdMVddPDNZZfz"
},
{
"url": "https://cdn.discordapp.com/attachments/755889784127488021/818860356780425277/unknown.png",
"type": "دراجة",
"key": "yVv5yomB9ohRWl"
},
{
"url": "https://cdn.discordapp.com/attachments/755889784127488021/818860360109916170/unknown.png",
"type": "دراجة",
"key": "YSCesRfzsxdr4bH"
},
{
"url": "https://cdn.discordapp.com/attachments/755889784127488021/818862884196712458/unknown.png",
"type": "باص",
"key": "XSyhccxbvR5s"
},
{
"url": "https://cdn.discordapp.com/attachments/755889784127488021/818862905180160090/unknown.png",
"type": "باص",
"key": "CFVJzfyhg54d"
},
{
"url": "https://cdn.discordapp.com/attachments/755889784127488021/818862942640537600/unknown.png",
"type": "باص",
"key": "RY6Rdvccvg4fr"
},
{
url: "https://cdn.discordapp.com/attachments/827962384287137792/851455237940445185/unknown.png",
type: "اكواد مبرمجية",
key: "UYICVCI8jhnU"
},
{
url: "https://cdn.discordapp.com/attachments/827962384287137792/851454784107184180/unknown.png",
type: "اكواد مبرمجية",
key: "TRHHSi8jjhO07"
},
{
url: "https://cdn.discordapp.com/attachments/827962384287137792/851455004937683004/unknown.png",
type: "اكواد مبرمجية",
key: "T7UY6RDYfdu1"
},
{
url: "https://cdn.discordapp.com/attachments/827962384287137792/851454429399220224/unknown.png",
type: "اكواد مبرمجية",
key: "TJMNSFVJyy1"
}
]

const getCaptcha = async ()=>{

  return await new Promise((res , rej) =>{
fetch(('https://apigithub.glitch.me/api/v1/robot') , {
method: 'post', 
body: JSON.stringify({
host: "apigithub.glitch.me",
site_key: "123"
}),  
headers: { 
'Content-Type': 'application/json'
 }, 
referrerPolicy: "no-referrer"
}).then(async ress =>{
  let json = await ress.json();
res(json)
 })
  })
}

const captchaTest = async (key, data)=>{
  return await new Promise((res , rej) =>{
fetch(('https://apigithub.glitch.me/api/v1/robot') , {
method: 'PUT', 
body: JSON.stringify({
"key":key,
"site_key":"123",
"host":"apigithub.glitch.me",
"resuil":[{url: data.url}]
}),  
headers: { 
'Content-Type': 'application/json'
 }, 
referrerPolicy: "no-referrer"
}).then(async ress =>{
  let json = await ress.json();
res(json)
 })
  })
}

const getMoney = async (captcha)=>{

  return await new Promise((res , rej) =>{
fetch(('https://apigithub.glitch.me/api/v1/robot/test') , {
method: 'post', 
body: JSON.stringify({
"site_key":"123",
"code": captcha
}),  
headers: { 
'Content-Type': 'application/json'
 }, 
referrerPolicy: "no-referrer"
}).then(async ress =>{
  let json = await ress.json();
res(json)
 })
  })
}

let check = (pic, data)=>{
return pics.find(d => d.url === pic && d.type === data)
}

const start = async (type)=>{
if(type === 2){

let captchaData = await getCaptcha()

let DataON = {}

for(const d of captchaData.pic){
let dPIC = check(d.url, captchaData.need)
if(dPIC) DataON = dPIC
}

let captcha = await captchaTest(captchaData.key, DataON)

let Money = await getMoney(captcha.code)

return Money

}

if(type === 1){

let captchaData = await getCaptcha()

let DataON = {}

for(const d of captchaData.pic){
let dPIC = check(d.url, captchaData.need)
if(dPIC) DataON = dPIC
}

let captcha = await captchaTest(captchaData.key, DataON)

return captcha

}

}

module.exports = { getCaptcha, check, captchaTest, getMoney, start }