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
 class BotFighter {
        constructor(){
          this.life = 0;
          this.fightEngaged = false
        }
         setLife(){
          this.life = 500;
        }
        takeHit(){
          return this.life = this.life - this.getRandomHit() 
        
        }
        getRandomHit(){
          return Math.floor(Math.random() * (100 - 50 +1)) + 50;
        }
         startFight(channel){
          this.setLife()
          if(!this.fightEngaged){
          client.say(channel, "FIIIGHT !!!!!!!!!!!!!!!!!!!!");
          client.say(channel, `J'ai ${this.life} point de vie! Essayer de me battre petits cloportes`);
          this.fightEngaged = !this.fightEngaged;
          }
        } 
         onFight(channel, user) {
           const life =  this.takeHit();
           if(life <= 0 && this.fightEngaged){     
            client.say(channel, `Bien... ${user} Vous m'avez battu...`);
            this.fightEngaged = false;
             return;
           }else if(this.fightEngaged === false){
            client.say(channel, "Je ne suis plus en combat petit cloporte")
            return;
           }else{
            client.say(channel, `Il me reste ${this.life} de point de vie`)
           }
        }
      }
export default BotFighter;
 /*module.exports = {
     BotFighter : BotFighter
 }*/