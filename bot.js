const tmi = require('tmi.js');
const fetch = require('node-fetch');
require('dotenv').config()

// Define configuration options
const opts = {
    identity: {
      username: '0y0_bot',
      password: process.env.PASSWORD,
    },
    channels: [
        'oyo1505'
      ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on("join", (channel, username, self) => {
  if(self){return;} // Ignore messages from the bot
  client.say(channel, `Bonjour ${username} ! :)`)
});
client.on("chat", (channel, userstate, message, self) => {
  // Don't listen to my own messages..
  if (self) return;
  if(userstate.username !== "moodbot" && message && onLive){
    timedMsg(channel)
  }
});
// Connect to Twitch:
client.connect();

const commandList= [
  ['!rules', `Respectez-vous, soyez polis, pas de racisme... Bref, t'as compris. Aimez-vous les uns les autres BORDEL !!!` ],
  ['!insta','Le voilà : https://www.instagram.com/oyo1505/ Abonne toi :)'],
  ['!twitter','Tiens mon profil twitter https://twitter.com/Oyo1505 ;)'],
  ['!follow', 'Vous aimez le stream ? N\'oubliez pas de me Follow sur Twitch en cliquant sur le ❤️'],
  ['!joke' ],
];

// Called every time a message comes in
function onMessageHandler(target, context, msg, self){
    if(self){return;} // Ignore messages from the bot
    //Remove whitespaces from message
    const commandName = msg.trim();
    //If the commande is known, let's execute it
    let command =  commandList.filter(command => command[0] === commandName);
   command[0] && command[0][1]  ? client.say(target, `${command[0][1]}`) : (command[0] && command[0][0] && command[0][0] === "!joke" ? runJoke(target) : console.log('Unknown command'));
    
  }
 
// Timed function message
function timedMsg(target){ 
  setInterval(function() {
    var msg = 'Vous aimez le stream ? N\'oubliez pas de me Follow sur Twitch en cliquant sur le ❤️';
    client.say(target, msg)
  }, 2700000);
}


//check live status user 
 async function getLiveInformationUser(){
  var url = 'https://api.twitch.tv/helix/streams?user_login=oyo1505';
 return fetch(url, {
      headers: {
        'client-id' : process.env.CLIENT_ID,
        'Authorization' :`Bearer ${process.env.TWITCH_OAUTH_TOKEN}`
       } 
      })
  .then(res => res.json())
  .then(data =>data.data[0]);
}
async function onLive(){
  let live = await getLiveInformationUser()
  return live.type ==="live";
}
/*function newFollower(){
  var url= 'https://api.twitch.tv/helix/users/follows?first=1&to_id=55468567';

}
 */
async function getJoke(){
   return  fetch('https://www.blagues-api.fr/api/random', {
        headers: {
            'Authorization' : `Bearer ${process.env.JOKE_TOKEN}`
        } 
        })
        .then( response => response.json())
        .then(data=>  data.joke +' '+ data.answer);  
}
async function runJoke(channel){
  const data =  await getJoke();
  client.say(channel, `${data}`)
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}