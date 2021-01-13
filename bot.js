
const tmi = require('tmi.js');
const fetch = require('node-fetch');
require('dotenv').config()
let bot = require('./BotFighter');
let {Warrior, priest, Mage, warlock, hunter} = require('./Characters');

//init botFighter
let  Bot = bot.BotFighter
const botFighter = new Bot();
let magaChara = new Mage('toto');
magaChara.aire();
let warChara = new Warrior("Joken");

console.log(magaChara.life, "mage", warChara.name, "warrior");
// Define configuration options
const opts = {
    identity: {
      username: '0y0_bot',
      password: process.env.PASSWORD,
    },
    channels: [
        'oyo1505',
        'soiaok'
      ]
};

// Create a client with our options
const client = new tmi.client(opts);
// Connect to Twitch:
client.connect();

//timed message
let loopInterval
client.on('chat', (channel, userstate, message, self) => {
  if (self) return
  const msg = message.split(' ')
  if (msg[0].toLowerCase() === '!loop') {
    if (loopInterval) { // Check if set
      console.log('stop !loop')
      clearInterval(loopInterval) // delete Timer
      loopInterval = false
    } else {
      console.log('start !loop')
      loopInterval = setInterval(function () {
        client.say(channel, 'Vous aimez le stream ? N\'oubliez pas de me Follow sur Twitch en cliquant sur le ❤️') // client.say(channel, msg[1]) // ?
      }, 2700000 ) // 45min
    }
  }
});
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on("join", (channel, username, self) => {
  if(self){return;} // Ignore messages from the bot
  onLiveMessageToUser(channel, username);
});

const commandList= [
  ['!rules', `Respectez-vous, soyez polis, pas de racisme... Bref, t'as compris. Aimez-vous les uns les autres BORDEL !!!` ],
  ['!insta','Le voilà : https://www.instagram.com/oyo1505/ Abonne toi :)'],
  ['!twitter','Tiens mon profil twitter https://twitter.com/Oyo1505 ;)'],
  ['!follow', 'Vous aimez le stream ? N\'oubliez pas de me Follow sur Twitch en cliquant sur le ❤️'],
  ['!joke'],
  ['!fight'],
  ['!paf'],
  ['!pif']
];

const usersOnChat = [ "oyo1505", "commanderroot", "anotherttvviewer", "wizebot", "moobot"];

// Called every time a message comes in
function onMessageHandler(target, context, msg, self){
  const pseudo = context['display-name'];
    if(self){return;} // Ignore messages from the bot
    //Remove whitespaces from message
    const commandName = msg.trim();
    //If the commande is known, let's execute it
    let command =  commandList.filter(command => command[0] === commandName);
   command[0] && command[0][1]  ? 
    client.say(target, `${command[0][1]}`)
   :(command[0] && command[0][0] && command[0][0] === "!joke" ? runJoke(target) 
   :(command[0] && command[0][0] && command[0][0] === "!fight" ? botFighter.startFight(target)
   :(command[0] && command[0][0] &&  command[0][0] === "!pif" || command[0] && command[0][0] && command[0][0] === "!paf"? botFighter.onFight(target, pseudo)
   :console.log('Unknown command'))));
  }
//id oyo1505 = 55468567
//id soiaok = 516281655
//id 0y0_bot = 585157263

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
  .then(data => data);
}
async function onLive(){
  const live = await getLiveInformationUser();
 
  if(live && live.type === 'live'){
    return true;
  }else if (!live){
    return false;
  }
}
async function onLiveMessageToUser(channel, username){
const live = await onLive();
  if(live && !usersOnChat.includes(username)){
    usersOnChat.push(username)
    client.say(channel, `Bonjour ${username} ! :)`);
  }else if(!live){
    usersOnChat.splice(4, usersOnChat.length)
  } 
}
/*get new follower*/
async function getLastFollower(){
  var url= 'https://api.twitch.tv/helix/users/follows?first=1&to_id=55468567';
  return await fetch(url, {
    headers: {
      'client-id' : process.env.CLIENT_ID,
      'Authorization' :`Bearer   ${process.env.TWITCH_OAUTH_TOKEN}`
     } 
    })
.then(res => res.json())
.then(data => data.data[0]);
}

var userFollowers= [];
let notifFollow = false;
async function getFollowers(){
  var url= 'https://api.twitch.tv/helix/users/follows?to_id=55468567';
  return await fetch(url, {
    headers: {
      'client-id' : process.env.CLIENT_ID,
      'Authorization' :`Bearer ${process.env.TWITCH_OAUTH_TOKEN}`
     } 
    })
.then(res => res.json())
.then(data =>{ userFollowers=data.data});
}

//setInterval(()=> newFollowerNotif(), 10000);
async function newFollowerNotif(){
  let lastFollower = await getLastFollower();
  let m = userFollowers.some(item => item.from_id === lastFollower.from_id)
  if(!m && !notifFollow){
    client.say("#oyo1505", `Bienvenue à @${lastFollower.from_name} merci de suivre la chaîne, tu as très bon goût sache le ! :)`);
    await getFollowers();
    notifFollow = true;
  }else if (m){
    notifFollow = false;
  }
  clearInterval();
}

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