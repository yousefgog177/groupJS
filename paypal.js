let fetch = require('node-fetch')
let FormData = require('form-data');
 
const getHome = async()=>{
  return await new Promise((res , rej) =>{
fetch(('https://www.paypal.com/ro/home') , {
method: 'GET', 
headers: { 
'Content-Type': 'application/json'
 }, 
referrerPolicy: "no-referrer"
}).then(async ress =>{
  let json = await ress.text();
res(json)
 })
  })
}

const getLogin = async()=>{
  return await new Promise((res , rej) =>{
fetch(('https://www.paypal.com/signin') , {
method: 'GET', 
headers: { 
'Content-Type': 'application/json'
 }, 
referrerPolicy: "no-referrer"
}).then(async ress =>{
  let json = await ress.text();
res(json)
 })
  })
}

const captchaVerify = async(data)=>{
  return await new Promise((res , rej) =>{

const form = new FormData();
form.append('_recaptchaEnterpriseEnabled', data._recaptchaEnterpriseEnabled);
form.append('_adsRecaptchaSiteKey', data._adsRecaptchaSiteKey);
form.append('_csrf', data._csrf);
form.append('_requestId', data._requestId);
form.append('_hash', data._hash);
form.append('grc_eval_start_time_utc', data.grc_eval_start_time_utc);
form.append('_sessionID', data._sessionID);
form.append('jse', data.jse);
form.append('recaptcha', data.recaptcha);
form.append('grc_render_start_time_utc', data.grc_render_start_time_utc);
form.append('grc_render_end_time_utc', data.grc_render_end_time_utc);
form.append('grc_verification_time_utc', data.grc_verification_time_utc);

fetch(('https://www.paypal.com/auth/validatecaptcha') , {
method: 'post', 
body: form,
headers: { 
'Content-Type': 'application/x-www-form-urlencoded'
 }, 
referrerPolicy: "no-referrer"
}).then(async ress =>{
  let json = await ress.text();
res(json)
 })
  })
}


module.exports = { getHome, getLogin, captchaVerify }