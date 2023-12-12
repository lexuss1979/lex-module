//index.js
class stingObj  {
 
  constructor(str){
    this.str = str;
    return this;
  }
  duplicate() {
    return this.str + this.str;
  }
  inverse() {
    let inv = '';
    for(let i=0; i< this.str.length; i++){
        inv += this.str.slice(this.str.length-i-1,this.str.length-i);
    }
    return inv;
  }

  startsWith(needle){
    return this.str.slice(0,needle.length) === needle;
  }

  endsWith(needle){
    return this.str.slice(this.str.length-needle.length) === needle;
  }

  contains(needle){
    return this.str.indexOf(needle) > -1;
  }

  truncate(length, start){
    const startPos = start ?? 0;
    return this.str.slice(startPos, startPos+length)
  }

  words(){
    return this.str.replace(/\W+/g," ").replace(/\s+/g,' ').trim().split(' ').map(word => word.toLowerCase());
    
   }

   wordsCount(){
    return this.words().length;
   }

   wordsFreq(){
    const words = [];
    const freq = [];
    
    this.words().map(word => {
      if(words.indexOf(word) > -1) {
        freq[words.indexOf(word)] ++;
      } else {
        words.push(word);
        freq.push(1);
      }
    })
    return [words, freq];
   }




}

const strObj = (str) => {
  return new stingObj(str);
}



  
 module.exports = strObj;