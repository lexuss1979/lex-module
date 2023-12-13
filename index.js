//index.js
class stingObj  {
 
  constructor(str){
    this.str = str;
    
    return this;
  }

  toString(){
    return this.str;
  }
  duplicate() {
    this.str = this.str + this.str;
    return this;
  }
  inverse() {
    let inv = '';
    for(let i=0; i< this.str.length; i++){
        inv += this.str.slice(this.str.length-i-1,this.str.length-i);
    }
    this.str =  inv;
    return this;
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
    this.str = this.str.slice(startPos, startPos+length)
    return this;
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

   //ucFirst
   //capitalize
   //uppercase
   //lowercase
   //striptags
   //isHtml
   //sentensies
   //replace
   //replaceFirst
   //compile(params) - заменяет параметры в строке на заданные
   //randomWord
   //randomLetter
   //isNumeric
   //isInt
   //truncateWithTags
   //smartTruncate
   //slug
   //randomizeWords
   //insertTypo
   //compareByChar
   //compareByWord
   //highlight - подсвечивает заданным шаблоном искомое слово(слова)
   //queryParams
   //isUrl
   //urlScheme
   //urlDomain
   //urlRoute
   //fileExtention
   //baseFileName
   //pathToFile
   //toFileNameWithExtention
   //randomChars(count)
   //hash(method)
   //hashEquals(hash)
   //acronim
   //recompileWithQueryParams(paramsArray)
   //equalsQueryString(querystring)
   //isAbbrivation - определяет аббревиатуру
   //parse(template) - разбирает строки на объекты
   //lettersCount()
   //digitsCount()
   //punctuationCount()
   //isJSON()
   //uniqWords()
   //containsFuzzy(word) - ищет вхождения с опечатками
   //validEmail()
   //validIP()
   //validPhoneNumber()
   //validate(rules)
   //validDate
   //validTimestamp
   //validTime()
   //truncateRight
   //mergeByEquals()  - склеивает совмещая начало и конец строк по точном совпадению
   //diff(str)- находит различия строк
 

}

const strObj = (str) => {
  return new stingObj(str);
}



  
 module.exports = strObj;