import getRandomNumber  from './utils/utils.js'
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
   this.buffed = false
 }

 init = (name)=>{
   if(this.isTaken){
    client.say("oyo1505", `Désolé c'est déjà pris par ${this.name}`);
     return
   }
  this.name = name;
  this.isTaken = true;
 }

}
class Warrior extends Character{
  constructor(name){
    super(name)
  }
  stunEnemy = (bot) =>{

  }
}

class Mage extends Character{
  constructor(name){
    super(name)
  }
  buffPlayer=(player)=>{
    
  }
 
}

class Priest extends Character{
  constructor(name){
    super(name)
  }
  healPlayer = (player)=> {
   return player.life  + getRandomNumber(50, 75);
  }
}

class Hunter extends Character{
  constructor(name){
    super(name)
  }
  dogAttack= (bot)=>{
    bot.onFight()
  }
}

class Warlock extends Character{
  constructor(name){
    super(name)
  }
  curseEnemy=()=>{

  }
}
export  { Mage, Warrior, Hunter, Priest, Warlock};
/*module.exports = {
    Warrior : Warrior,
    Warlock : Warlock,
    Hunter : Hunter,
    Mage : Mage,
    Piest: Priest
}*/