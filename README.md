GJS!
 
Ready: 
let Gjs = require('GROUPjs')
let client = Gjs('TOKEN_USER_OR_BOT')
client.on('ready', () =>{
console.log('Ready on ' + client.user.username)
}) 
 
client.on('messageCreate', () =>{
if(msg.content === "!ping"){
client.createMessage(msg.channel_id, 'pong')
}
}) 
 
 
Asyncs:
 
Attachment
 
Returns:
- id | Returns Attachment ID
- file_name | Returns Attachment file name
- size | Returns Attachment size
- url | Returns Attachment url
- proxy_url | Returns Attachment proxy_url
- width | Returns Attachment width
- height | Returns Attachment height
- height | Returns Attachment height
- content_type | Returns Attachment content_type
- type | Returns Attachment type (png, gif ...)
 
Guild
 
Functions:
- edit(options) | Return Promise<Guild>
Returns:
- id | Return Guild ID
- roles | Returns <Guild Roles>
- channels | Returns <Guild Channels>
- members | Returns <Guild Members>
- name | Returns Guild Name
- icon | Returns Guild Icon
 
Category Channel

Functions:
- Permission(id, allow, deny, type) | Return Promise<Category Channel>
- delete() | Return Promise<>
Returns:
- id | Return Channel ID
- type | Returns Channel type
- name | Returns Channel Name
- position | Returns Channel position
- permission_overwrites | Returns Channel permission_overwrites
- channels | Returns <Guild Channels>

Text Channel

Functions:
- Permission(id, allow, deny, type) | Return Promise<Text Channel>
- delete() | Return Promise<>
- getMessage(id) | Returns Promise<Messages>
- createMessage(content, options) | Returns Promise<Message>
- getMessages(options) | Returns Promise<Messages>
- deleteMessage(message_id) Returns Promise<>
Returns:
- id | Return Channel ID
- type | Returns Channel type
- name | Returns Channel Name
- position | Returns Channel position
- topic | Returns Channel topic
- rate_limit_per_user | Returns Channel rate limit per user
- parent | Returns <Category Channel>
- nsfw | Returns Channel nsfw
- last_message_id | Returns Channel last message id
- permission_overwrites | Returns Channel permission_overwrites

Voice Channel

Functions:
- Permission(id, allow, deny, type) | Return Promise<Voice Channel>
- delete() | Return Promise<>
Returns:
- id | Return Channel ID
- type | Returns Channel type
- rtc_region | Returns Channel rtc_region
- name | Returns Channel Name
- position | Returns Channel position
- topic | Returns Channel topic
- bitrate | Returns Channel bitrate
- parent | Returns <Category Channel>
- permission_overwrites | Returns Channel permission_overwrites
- user_limit | Returns Channel user_limit

Stage Channel

Functions:
- Permission(id, allow, deny, type) | Return Promise<Stage Channel>
- delete() | Return Promise<>
Returns:
- id | Return Channel ID
- type | Returns Channel type
- rtc_region | Returns Channel rtc_region
- name | Returns Channel Name
- position | Returns Channel position
- topic | Returns Channel topic
- bitrate | Returns Channel bitrate
- parent | Returns <Category Channel>
- permission_overwrites | Returns Channel permission_overwrites
- user_limit | Returns Channel user_limit

Member
 
Functions:
- kick(reason, options) | Returns Promise<>
- ban(reason, options) | Returns Promise<>
- createMessage(content, options) | Returns Promise<Message>
Returns:
- guild | Return <Guild>
- user | Return <User>
- roles | Return <Roles>
- joined_at | Return Member joined_at
- nick | Return Member nick
- premium_since | Return Member premium_since
- pending | Return Member premium_since
- is_pending | Return Member is_pending
- mute | Return Member Mute
- deaf | Return Member deaf
 
Message
 
Functions 
- getReactions(options) | Returns Promise<Reactions>
- delete() | Returns Promise<>
- edit(content, options) | Returns Promise<Message>
Returns:
- pinned | Return pinned
- type | Return type
- components | Return components
- reactions | Return <Reactions>
- mentions | Return mentions
- mentionsRoles | Return mentionsRoles
- mentionEveryone | Return mentionEveryone
- tts | Return tts
- timestamp | Return timestamp
- edited_timestamp | Return edited_timestamp
- flags | Return flags
- attachments | Return <attachments>
- content | Return content
- channel_id | Return channel_id
- embeds | Return embeds
- id | Return id
- author | Return <User>
 
Role
 
Functions:
- edit(options) | Returns Promise<Role>
- delete() | Returns Promise<>
Returns:
- guild | Return <Guild>
- id | Return Role ID
- name | Returns Role Name
- position | Returns Role position
- hoist | Returns Role hoist
- managed | Returns Role managed
- color | Returns Role color
- mentionable | Returns Role mentionable
- permission | Returns Role permission

Client User 
 
Functions:
- phoneGetCode(country_code, number) | Returns Promise<Phone Verified>
- create2FA(password) | Returns Promise<Object>
- verifyPhone(country_code_and_number, code_verified, password)  Returns Promise<>
Returns:
- username | Returns User username
- id | Returns User id
- tag | Returns User tag
- discriminator | Returns User discriminator
- avatar | Returns User avatar

Phone Verified
 
Functions:
- verify(country_code_and_number, code_verified, password)  Returns Promise<>
Returns:
- number | Returns Client User Number
 
User 
 
Functions:
- createMessage(content, options) | Returns Promise<Message>
Returns:
- username | Returns User username
- public_flags | Returns User public_flags
- id | Returns User id
- tag | Returns User tag
- discriminator | Returns User discriminator
- avatar | Returns User avatar
 
Embed
 
Functions:
- content(content) | Returns Embed
- title(title) | Returns Embed
- set({title: title}) | Returns Embed
- des(description) | Returns Embed
- description(description) | Returns Embed
- addfield(name, value) | Returns Embed
- image(url) | Returns Embed
- thumbnail(url) | Returns Embed
- color(color) | Returns Embed
- timestamp(timestamp) | Returns Embed
- footer(text) | Returns Embed
- getEmbed() | Returns Embed
- reset() | Returns Embed
- createMessage(channel_id) | Returns Promise<Message>
Returns:
- clientUser | Returns <User>
- embed | Returns Embed
 
================================================ End Async ================================================
 
Array_data:
 
Attachments
 
Functions:
- get(num || id) | Returns Promise<Attachment>
Returns:
- size | Returns Attachments Length
- all | Returns Attachments
 
Guilds
 
Functions:
- get(id) | Returns Promise<Guild>
Returns:
- size | Returns Guilds Length
- all | Returns Guilds
 
Channels
 
Functions:
- get(id) | Returns Promise<Member>
- create(name, options) | Returns Promise<Text Channel | Voice Channel | Category channel>
Returns:
- size | Returns Channels Length
- all | Returns Channels
- guild_id | Returns Guild ID

Members
 
Functions:
- get(id) | Returns Promise<Member>
Returns:
- size | Returns Members Length
- all | Returns Members
- guild_roles | Returns <Roles>
- guild | Returns <Guild>
 
Messages
 
Functions:
- get(id) | Returns Promise<Message>
Returns:
- size | Returns Messages Length
- all | Returns Messages
 
Roles
 
Functions:
- get(id) | Returns Promise<Role>
- create(name, options) | Returns Promise<Role>
Returns:
- size | Returns Roles Length
- all | Returns Roles
- guild | Returns <Guild>
 
Users
 
Functions:
- get(id) | Returns Promise<User>
Returns:
- size | Returns Users Length
- all | Returns Users 
 
================================================ End Array_data ​================================================
 
Client
 
Client Data:
ONEReady: true/false | false = Return If Bot disconnect You Have Get Ready Event | true = Return If Bot disconnect You Don't get Event Ready
RESTVerison: Number | Verison Api
headers: {say: "hi"} | Add Default Headers In REST
body: [{name: "reason", value: "No Reason"}, {name: "id", value: "123"}] | Add Default Body In REST 
Functions:
- getMessage(channel_id, id) | Returns Promise<Messages>
- createMessage(channel_id, content, options) | Returns Promise<Message>
- getMessages(channel_id, options) | Returns Promise<Messages>
- editGuild(guild_id, options) | Returns Promise<Guild>
- deleteMessage(channel_id, message_id) Returns Promise<>
- newEmbed() Returns Promise<Embed>
- editRole(guild_id, role_id, options) | Returns Promise<Role>
Returns:
- users | Returns <Users>
- guilds | Returns <Guild>
- user | Returns <Client User>
 
================================================ End Client ​================================================
 
Events
 
messageCreate
Functions:
- delete() | Returns Promise<>
- edit(content, options) | Returns Promise<Message>
Returns:
- pinned | Returns pinned
- type | Returns type
- components | Returns components
- reactions | Returns <Reactions>
- mentions | Returns mentions
- mentionsRoles | Returns mentionsRoles
- mentionEveryone | Returns mentionEveryone
- tts | Returns tts
- timestamp | Returns timestamp
- edited_timestamp | Returns edited_timestamp
- flags | Returns flags
- attachments | Returns <attachments>
- content | Returns content
- channel_id | Returns channel_id
- channel | Returns <Text Channel | News channel>
- embeds | Returns embeds
- id | Returns id
- author | Returns <User>
- guild | Returns <Guild>
- member | Returns <Member>
 
================================================ End Events ​================================================