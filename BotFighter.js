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
var attackInterval;
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
          this.life = 20000;
        }
        takeHit(){
          if(this.isCursed){
            return this.life = this.life - getRandomNumber(70, 120);   
          }else{
            return this.life = this.life - getRandomNumber(50, 100);
          }
           
        }
        findPlayersIsTaken(players){
           return players.map(player=> player.isDead ? true : false)
        }
        attackPlayers(players){
          var playersAlive = this.allPlayersAreDead(players).includes(false);
          var playersTaken = this.findPlayersIsTaken(players).includes(false);
          
           if(playersAlive && playersTaken && this.fightEngaged){
            if(!this.isStunned){
              players.map(player =>{
                if(!player.playerEliminated() && player.isTaken){
                return  player.life = player.life - getRandomNumber(50, 75);
                }
              });
              return true;
            }
           }else if(!playersAlive) {
             this.fightEngaged = false;
             this.makeAvaibleCharaterClass(players)
             client.say("oyo1505", `Le combat est terminé, je vous ai battu... Vous êtes tres mauvais sachez le ! PJSalt PJSalt PJSalt `);
             clearInterval(attackInterval)
           }
          }
        
         startFight(channel, players){
          this.setLife()
          client.say(channel, "Pour choisir votre classe : !mage, !warrior, !warlock, !priest, !hunter. Le combar commence dans 30 secondes");
          if(!this.fightEngaged){
           client.say(channel, `J'ai ${this.life} point de vie! Essayer de me battre petits cloportes`);
           attackInterval = setInterval(()=>{this.attackPlayers(players)},30000);
           this.fightEngaged = !this.fightEngaged;
          }
        } 
        makeAvaibleCharaterClass(players){
          players.map(player => player.isTaken = false)
        }
        allPlayersAreDead(players){
         return players.map(player => player.isDead ? true : false);
        }

        findUsernameInArray(players, username){
          return players.map(player=> player.name === username ? true : false)
       }

       findPlayerNotDead(players,username){
        return players.map(player=>player.name === username && player.isDead === false && player.isTaken === true ? true : false)
       }
         onFight(channel, players, username) {  
           let playersNotDead = this.findPlayerNotDead(players, username).includes(true);
          if(playersNotDead){        
            const life =  this.takeHit();
            if(life <= 0 && this.fightEngaged){     
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
      }
export default BotFighter;