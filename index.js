//index.js
class stingObj  {
 
  constructor(str){
    this.str = str;
    return this;
  }
  duplicate() {
    return this.str + this.str;
  }
}

const str = {



  from: (str) => {
    return new stingObj(str);
  },
  
}



  
 module.exports = str;