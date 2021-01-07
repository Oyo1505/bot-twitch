class Character {
    constructor(){
      this.name='',
      this.life = 0;
      this.attack = 0;
      this.shield = 0;
      this.isTaken= false;
      this.nameViewer= '';
    }
    setLife(){
        this.life = 500;
      }
}

class Warrior extends Character{
    
}

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