var Character =  function (name){

      this.name= name;
      this.attack = 0;
      this.shield = 0;
      this.isTaken= false;
      this.nameViewer= '';
      this.setLife = function(){
         return this.getRandomNumber(0, 500);
      }
     this.getRandomNumber = (min, max)=>{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min +1)) + min;
    }
    
      this.life = this.setLife();
}

var Warrior = function (name){
  this.name = name;
}
Warrior.prototype = new Character();
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