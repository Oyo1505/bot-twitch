 function Character (name){
  this.name=name
}
Character.prototype = {
  constructor: Character,
  attack : 0,
  shield :0,
  isTaken : false,
  nameViewer : '',
  life : 0,
  getRandomNumber : function (min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  },
  setLife : function(){
         return this.getRandomNumber(400, 500);
  },
  
}

function Warrior(name){
  this.name=name
}
Warrior.prototype = Object.create(Character.prototype);
Warrior.prototype.constructor = Warrior;
Warrior.prototype.hit = () =>{
  console.log('BIM -59Degats');
}
Warrior.prototype.setLife = () =>{
  Warrior.prototype.life = Warrior.prototype.getRandomNumber(400,500);
};
//Warrior.prototype = new Character();
class Mage extends Character{

}

class Priest extends Character{
    
}

class Hunter extends Character{
    
}

class Warlock extends Character{
    
}

module.exports = {
    Warrior : Warrior,
    Warlock : Warlock,
    Hunter : Hunter,
    Mage : Mage,
    Priest: Priest
}