
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

// Connect to Twitch:
client.connect();
const commandList= ['!rules', '!insta', '!twitter', '!follow', '!joke'];
// Called every time a message comes in
function onMessageHandler(target, context, msg, self){
    if(self){return;} // Ignore messages from the bot
    //Remove whitespaces from message
    const commandName = msg.trim();
    //If the commande is known, let's execute it
    if( commandName === '!rules'){
        client.say(target, `Respectez-vous, soyez polis, pas de racisme... Bref, t'as compris. Aimez-vous les uns les autres BORDEL !!!`);
        console.log(`* Executed ${commandName} command`);
    }else if(commandName ==='!insta'){
        client.say(target, 'Le voilà : https://www.instagram.com/oyo1505/ Abonne toi :)');
        console.log(`* Executed ${commandName} command`);
    }
    else if(commandName ==='!follow'){
        client.say(target, 'Vous aimez le stream ? N\'oubliez pas de me Follow sur Twitch en cliquant sur le ❤️' );
        console.log(`* Executed ${commandName} command`);
    }else if(commandName ==='!twitter'){
        client.say(target, ' Tiens mon profil twitter https://twitter.com/Oyo1505 ;)');
        console.log(`* Executed ${commandName} command`);
    }
    else if(commandName ==='!joke'){
        fetch('https://www.blagues-api.fr/api/random', {
        headers: {
            'Authorization' : `Bearer ${process.env.JOKE_TOKEN}`
        } 
        }).then( response => response.json())
            .then(data=>{
                var replyText =  data.joke +' '+ data.answer ;
                client.say(target,replyText);
            })
       
        console.log(`* Executed ${commandName} command`);
    }
    else{
        console.log(`* Unknown command ${commandName}`);
    }
}


// Function called when the "dice" command is issued
function rollDice(){
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }