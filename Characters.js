import getRandomNumber  from './utils/utils.js'

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
export  { Mage, Warrior, Hunter, Priest, Warlock};
/*module.exports = {
    Warrior : Warrior,
    Warlock : Warlock,
    Hunter : Hunter,
    Mage : Mage,
    Piest: Priest
}*/