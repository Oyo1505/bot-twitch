import {getRandomNumber, coolDownSpell}  from './utils/utils.js'
import tmi  from 'tmi.js';
// Create a client with our options
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
const client = new tmi.client(opts);
// Connect to Twitch:
client.connect();

class Character {
 constructor(name){
   this.name = name,
   this.life = getRandomNumber(400, 600),
   this.isTaken = false,
   this.hit = getRandomNumber(40, 60),
   this.buffed = false,
   this.channel = '',
   this.className = ''
 }

 init = (name, className)=>{
   if(this.isTaken){
    client.say("oyo1505", `Désolé c'est déjà pris par ${this.name}`);
     return;
   }
  this.name = name;
  this.className = className;
  this.isTaken = true;
  client.say('oyo1505', `${this.name} à choisi la classe ${this.className}`)
 }

 playerEliminated(){
  if(this.life <= 0 && this.isTaken){     
    client.say("oyo1505", `${this.name}, t'es mort ! Noob `);
    this.isTaken = false;
     return true;
   }else if(this.isTaken){
    client.say("oyo1505", `${this.name} vous reste ${this.life} de point de vie`)
    return false;
   }
 }

}
class Warrior extends Character{
  constructor(name){
    super(name)
    this.stunned = false
  }
  stunEnemy = (bot) =>{
    if(this.isTaken && !this.stunned){
      bot.isStunned = true;
      client.say("oyo1505", `* :/ Je suis stun ...*`);
      setTimeout(()=>{ bot.isStunned = false },30000);
      setTimeout(()=>{ this.stunned = false },60000);
    }else{
      client.say("oyo1505", `Hé hé hé. Ton stun ne me fait rien`);
    }
    this.stunned = true;
  }
}

class Mage extends Character{
  constructor(name){
    super(name)
  }
  freezeEnemy = (bot) =>{
    if(this.isTaken && !this.stunned){
      bot.isStunned = true;
      client.say("oyo1505", `*JE PEUX PLUS BOUGER !!!*`);
      setTimeout(()=>{ bot.isStunned = false },30000);
      setTimeout(()=>{ this.stunned = false },45000);
    }else{
      client.say("oyo1505", `Hé hé hé. Ton stun ne me fait rien`);
    }
  }
}

class Priest extends Character{
  constructor(name){
    super(name)
    this.hasBeenSpelled = false
  }
  healPlayers = (players)=> {
    if(!this.hasBeenSpelled && this.isTaken === true){
      players.map(player =>{
        if(player.isTaken){
          let lifeAdded = getRandomNumber(50, 75);
          player.life = player.life + lifeAdded;
          client.say("oyo1505", ` Le ${player.className}, ${player.name} à été soigne de ${lifeAdded} point de vie ! Tu as ${player.life} hp`);
        }
      });
      setTimeout(()=>{this.hasBeenSpelled = false },60000);
    }else{
      client.say("oyo1505", `Tu ne peux pas soigner! HA HA HA HA !`);
    }
    this.hasBeenSpelled = true;
  }
}

class Hunter extends Character{
  constructor(name){
    super(name);
    this.dogAttacked = false;
  }
  dogAttack =(bot)=>{
    if(!this.dogAttacked && this.isTaken === true){
      client.say("oyo1505", ` Aïe ! Putain de cleps ! `);  
      bot.onFight("oyo1505", this.name );
      setTimeout(()=>{this.dogAttacked = false },60000);
    }else{
      client.say("oyo1505", `Ton clébard fait dodo ! FrankerZ `);
    }
    this.dogAttacked = true;
  }
}

class Warlock extends Character{
  constructor(name){
    super(name);
    this.cursed = false
  }
  curseEnemy=(bot)=>{
    if(!bot.isCursed && this.isTaken === true){
      setTimeout(()=>{bot.isCursed = false}, 15000);
      client.say("oyo1505", ` AAAHH!! Je sens mes forces partir.`);    
      setTimeout(()=>{this.cursed = false}, 45000);
    }else{
      client.say("oyo1505", ` Misérable petit ${this.name} de pacotille, ta malédiction n'est pas disponible`);   
    }
    bot.isCursed = true;
    this.cursed = true;
  }
}
export { Mage, Warrior, Hunter, Priest, Warlock};
