import tmi  from 'tmi.js';
import fetch from 'node-fetch';
import BotFighter  from './BotFighter.js';
import {getRandomNumber}  from './utils/utils.js'
import {Warrior, Priest, Mage, Warlock, Hunter} from './Characters.js';

//init botFighter and Charaters
const  Bot = BotFighter
var botFighter = new Bot();
const warChara = new Warrior();
const mageChara = new Mage();
const warlockChara = new Warlock();
const priestChara = new Priest();
const hunterChara = new Hunter();
const characters = [warChara, mageChara, warlockChara, priestChara, hunterChara]
// Define configuration options
const opts = {
    identity: {
      username: '0y0_bot',
      password: process.env.PASSWORD,
    },
    channels: [
        '0y0_live',
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
client.on('message', onFightHandler);
client.on('message', priestCommand);
client.on('message', warriorCommand);
client.on('message', warlockCommand);
client.on('message', mageCommand);
client.on('message', hunterCommand);
client.on('connected', onConnectedHandler);
client.on("join", (channel, username, self) => {
  if(self){return;} // Ignore messages from the bot
  onLiveMessageToUser(channel, username);
});
const usersOnChat = ["0y0_live", "commanderroot", "anotherttvviewer", "wizebot", "moobot", "soiaok", "tetedemulatre","sillygnome225", "saddestkitty", "abbottcostello", "cristianclq", "electricallongboard", "ftopayr","extramoar", "droopdoggg", "bingcortana", "casinothanks", "gowithhim", "jointeffortt", "icewizerds", "ildelara", "communityshowcase"];
const commandList= [
  ['!rules', `Respectez-vous, soyez polis, pas de racisme... Bref, t'as compris. Aimez-vous les uns les autres BORDEL !!!` ],
  ['!insta','Le voilà : https://www.instagram.com/oyo1505/ Abonne toi :)'],
  ['!twitter','Tiens mon profil twitter https://twitter.com/Oyo1505 ;)'],
  ['!follow', 'Vous aimez le stream ? N\'oubliez pas de me Follow sur Twitch en cliquant sur le ❤️'],
  ['!joke'],
  ['!fight'],
  ['!paf'],
  ['!pif'],
];
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
   :(command[0] && command[0][0] && command[0][0] === "!fight" ? botFighter.startFight(target, characters)
   :(command[0] && command[0][0] &&  command[0][0] === "!pif" || command[0] && command[0][0] && command[0][0] === "!paf"? botFighter.onFight(target, characters, pseudo)
   :'')));
  }

//Warrior Commands
function warriorCommand(target, context, msg, self){
  let commandStun = [['!stun']];
  if(self){return;} // Ignore messages from the bot
  //Remove whitespaces from message
  let messageTrim = msg.trim();
  let command = commandStun.filter(command => command[0] === messageTrim);
  command[0] && command[0][0] && command[0][0] === "!stun" ? warChara.stunEnemy(botFighter) : '';
};

//Priest Commands
function priestCommand(target, context, msg, self){
  let commandHeal = [['!heal']];
  if(self){return;} // Ignore messages from the bot
  //Remove whitespaces from message
  let messageTrim = msg.trim();
  let command = commandHeal.filter(command => command[0] === messageTrim);
  command[0] && command[0][0] && command[0][0] === "!heal" ? priestChara.healPlayers(characters)  : '';
};

//Warlock Commands
function warlockCommand(target, context, msg, self){
  let warlockCommand = [['!curse']];
  if(self){return;} // Ignore messages from the bot
  //Remove whitespaces from message
  let messageTrim = msg.trim();
  let command = warlockCommand.filter(command => command[0] === messageTrim);
  command[0] && command[0][0] && command[0][0] === "!curse"  ? warlockChara.curseEnemy(botFighter)  : '';
};

//Mage Commands
function mageCommand(target, context, msg, self){
  let mageCommand = [['!freeze']];
  if(self){return;} // Ignore messages from the bot
  //Remove whitespaces from message
  let messageTrim = msg.trim();
  let command = mageCommand.filter(command => command[0] === messageTrim);
  command[0] && command[0][0] && command[0][0] === "!freeze"  ? mageChara.freezeEnemy(botFighter)  : '';
};

//Hunter Commands
function hunterCommand(target, context, msg, self){
  let commandHunter = [['!dog']];
  if(self){return;} // Ignore messages from the bot
  //Remove whitespaces from message
  let messageTrim = msg.trim();
  let command = commandHunter.filter(command => command[0] === messageTrim);
  command[0] && command[0][0] && command[0][0] === "!dog" ? hunterChara.dogAttack(botFighter)  : '';
};


const commandChooseCharacter = [
  ['!mage'],
  ['!warlock'],
  ['!warrior'],
  ['!hunter'],
  ['!priest'],
];
function onFightHandler(target, context, msg, self) {
  const pseudo = context['display-name'];
  if(self){return;} // Ignore messages from the bot
  //Remove whitespaces from message
  let commandFightName = msg.trim();
  let command = commandChooseCharacter.filter(command => command[0] === commandFightName);
  command[0] && command[0][0] && command[0][0] === "!mage" && botFighter.fightEngaged === true ? mageChara.init(pseudo, "mage")  : 
  (command[0] && command[0][0] && command[0][0]=== "!warrior"&& botFighter.fightEngaged === true ? warChara.init(pseudo, "warrior") :
  (command[0] && command[0][0] && command[0][0] === "!warlock" && botFighter.fightEngaged === true ? warlockChara.init(pseudo, "warlock") :
  (command[0] && command[0][0] && command[0][0]=== "!hunter" && botFighter.fightEngaged === true ? hunterChara.init(pseudo, "hunter") :
  (command[0] && command[0][0] && command[0][0]=== "!priest" && botFighter.fightEngaged === true ? priestChara.init(pseudo, "priest") :
   ''))));
}

//id oyo1505 = 55468567;
//id soiaok = 516281655;
//id 0y0_bot = 585157263;

//check live status user 
 async function getLiveInformationUser(){
  let url = 'https://api.twitch.tv/helix/streams?user_login=0y0_live';
 return fetch(url, {
      headers: {
        'client-id' : process.env.CLIENT_ID,
        'Authorization' :`Bearer ${process.env.TWITCH_OAUTH_TOKEN}`
       } 
      })
  .then(res => res.json())
  .then(data => data.data[0]);
}
async function onLive(){
  let live = await getLiveInformationUser();
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
   // client.say(channel, `Bonjour ${username} ! :)`);
  }else if(!live){
    usersOnChat.splice(4, usersOnChat.length)
  } 
}
/*get new follower*/
async function getLastFollower(){
  let url = 'https://api.twitch.tv/helix/users/follows?first=1&to_id=55468567';
  return fetch(url, {
    headers: {
      'client-id' : process.env.CLIENT_ID,
      'Authorization' :`Bearer ${process.env.TWITCH_OAUTH_TOKEN}`
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

setInterval(()=> newFollowerNotif(), 10000);
async function newFollowerNotif(){
  let lastFollower = await getLastFollower();
 let m = userFollowers.some(item => item.from_id === lastFollower.from_id)
  if(!m && !notifFollow){
    client.say("0y0_live", `Bienvenue à @${lastFollower.from_name} merci de suivre la chaîne, tu as très bon goût sache le ! :)`);
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

setInterval(()=>sendMessageToChat(), 2700000);
 async function sendMessageToChat(){
   let sentences=[
   "Vous aimez le stream ? N\'oubliez pas de me Follow sur Twitch en cliquant sur le ❤️",
   "Pour être au courant des lancements d'un live veuillez suivre ce compte Twitter : https://twitter.com/bjr_le_monde",
   "Vous pouvez aussi me suivre sur instagram https://www.instagram.com/oyo1505/ "
  ];
  let sentence = sentences[getRandomNumber(0,sentences.length - 1)];
  let live = await onLive();
    if(live){
      client.say("0y0_live", `${sentence}`);
    }else if(!live){
      return;
    } 
  }

  