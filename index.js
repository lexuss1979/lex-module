//index.js
const str = {

  str: '',

  _self: this,

  from: (str) => {
    _self.str = str;
    return _self;
  },
  duplicate:() => {
    return _self.str + _self.str;
  }
}

  
 module.exports = str;