//index.js
const str = {

  str: '',
  from: (str) => {
    this.str = str;
  },
  duplicate:() => {
    return this.str + this.str;
  }
}

  
 module.exports = str;