import tmi  from 'tmi.js';
import {getRandomNumber}  from './utils/utils.js'
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
          this.fightEngaged = false;
          this.isStunned = false;
          this.isCursed = false;
        }
         setLife(){
          this.life = 500;
        }
        takeHit(){
          if(this.isCursed){
            return this.life = this.life - getRandomNumber(70, 120);   
          }else{
            return this.life = this.life - getRandomNumber(50, 100);
          }
           
        }
        attackPlayers(players){
          if(!this.isStunned){
            players.map(player =>{
              if(player.playerEliminated() && player.isTaken){
                player.life = player.life - getRandomNumber(50, 75)
              }else{
                console.log(`${player.name} mort`)
              };
            });
          }
        }
         startFight(channel, players){
          this.setLife()
          client.say(channel, "Pour choisir votre classe : !mage, !warrior, !warlock, !priest, !hunter");
          if(!this.fightEngaged){
          
           client.say(channel, `J'ai ${this.life} point de vie! Essayer de me battre petits cloportes`);
           this.attackPlayers(players)
           //   setInterval(()=>{this.attackPlayers(players)},3000);
           this.fightEngaged = !this.fightEngaged;
          }
        } 
        findUsernameInArray  (players, username){
         console.log( players.map(player => player.hasOwnProperty(username)));
        }
         onFight(channel, players, username) {
           this.findUsernameInArray(players, username)
           const life =  this.takeHit();
           if(life <= 0 && this.fightEngaged && players.include(username)){     
            client.say(channel, `Bien... ${username} Vous m'avez battu...`);
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