getRandomNumber = (min, max) =>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
 /*function Chara (name){
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
  
}   */
class Character {
 constructor(name){
   this.name = name,
   this.life = getRandomNumber(400, 600),
   this.isTaken = false,
   this.hit = getRandomNumber(40, 60),
   this.shield = 0
 }
}
class Warrior extends Character{
  constructor(name){
    super(name)
  }
}

class Mage extends Character{
  constructor(name){
    super(name)
  }

   aire = () => {
    console.log(this.name)
  }
  buff =()=>{

  }
 
}

class Priest extends Character{
  constructor(name){
    super(name)
  }
  heal = ()=> {
    console.log("Healed")
  }
}

class Hunter extends Character{
  constructor(name){
    super(name)
  }
  dogAttack= ()=>{
    console.log("dogAttack");
  }
}

class Warlock extends Character{
  constructor(name){
    super(name)
  }
  
}

module.exports = {
    Warrior : Warrior,
    Warlock : Warlock,
    Hunter : Hunter,
    Mage : Mage,
    Priest: Priest
}