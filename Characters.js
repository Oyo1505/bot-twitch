import {getRandomNumber, coolDownSpell}  from './utils/utils.js'
import tmi  from 'tmi.js';
// Create a client with our options
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
const client = new tmi.client(opts);
// Connect to Twitch:
client.connect();

class Character {
 constructor(name){
   this.name = name,
   this.life = 0,
   this.isTaken = false,
   this.hit = getRandomNumber(40, 60),
   this.buffed = false,
   this.channel = '',
   this.className = '',
   this.isDead = true
 }

 init = (name, className)=>{
   if(this.isTaken){
    client.say("0y0_live", `Désolé c'est déjà pris par ${this.name}`);
     return;
   }
  this.life = getRandomNumber(400, 600);
  this.name = name;
  this.className = className;
  this.isTaken = true;
  this.isDead = false;
  client.say('0y0_live', `${this.name} à choisi la classe ${this.className}`)
 }

 playerEliminated(){
  if(this.life <= 0 && this.isTaken && !this.isDead){     
    client.say("0y0_live", `${this.name}, t'es mort ! Noob `);
    this.isDead = true;
     return true;
   }else if(this.isTaken && this.life > 0){
    client.say("0y0_live", `${this.name}  avec la classe ${this.className} vous reste ${this.life} de point de vie`)
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
      client.say("0y0_live", `* :/ Je suis stun ...*`);
      setTimeout(()=>{ bot.isStunned = false },30000);
      setTimeout(()=>{ this.stunned = false },60000);
    }else{
      client.say("0y0_live", `Hé hé hé. Ton stun ne me fait rien`);
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
      client.say("0y0_live", `*JE PEUX PLUS BOUGER !!!*`);
      setTimeout(()=>{ bot.isStunned = false },30000);
      setTimeout(()=>{ this.stunned = false },45000);
    }else{
      client.say("0y0_live", `Hé hé hé. Ton stun ne me fait rien`);
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
          client.say("0y0_live", ` Le ${player.className}, ${player.name} à été soigne de ${lifeAdded} point de vie ! Tu as ${player.life} hp`);
        }
      });
      setTimeout(()=>{this.hasBeenSpelled = false },60000);
    }else{
      client.say("0y0_live", `Tu ne peux pas soigner! HA HA HA HA !`);
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
      client.say("0y0_live", ` Aïe ! Putain de cleps ! `);  
      bot.onFight("0y0_live", this.name );
      setTimeout(()=>{this.dogAttacked = false },60000);
    }else{
      client.say("0y0_live", `Ton clébard fait dodo ! FrankerZ `);
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
      client.say("0y0_live", ` AAAHH!! Je sens mes forces partir.`);    
      setTimeout(()=>{this.cursed = false}, 45000);
    }else{
      client.say("0y0_live", ` Misérable petit ${this.name} de pacotille, ta malédiction n'est pas disponible`);   
    }
    bot.isCursed = true;
    this.cursed = true;
  }
}
export { Mage, Warrior, Hunter, Priest, Warlock};
