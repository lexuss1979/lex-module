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
   ucFirst(){
    this.str = this.str.slice(0,1).toUpperCase() + this.str.slice(1);
    return this;
   }


   //capitalize
   capitalize(){
    let newStr = [];
    this.str.toLowerCase().split(' ').map(part => {
      newStr.push(part.slice(0,1).toUpperCase() + part.slice(1));     
    });
    
    this.str =  newStr.join(' '); 
    return this;
   }

   //uppercase
   uppercase(){
    this.str = this.str.toUpperCase();
    return this;
   }


   //lowercase
   lowercase(){
    this.str = this.str.toLowerCase();
    return this;
   }

   //striptags
   stripTags(){
    this.str = this.str.replaceAll(/(<([^>]+)>)/ig,"");
    return this;
   }


   //isHtml
   isHtml(){
    let regexp = /<\/?\s?(\w*)[^]*?>/g;
    
    const tags = "document|body|p|div|br|span|section".split('|')
    const matches = [...this.str.matchAll(regexp)];

    if(matches.length === 0) return false;

    matches.forEach(tag => {
      if(tags.indexOf(tag[1]) === -1) return false;
    });
    return true;
   }


   sentences() {
     return this.str.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|");
   }



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
   //emailsCount()
   //ipCount()
   //urlCount()
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
   //everyWord(callback)
   //everyEmail(callback)
   //everyIp(callback)
   //uniqIP()
   //uniqIPWithCount()
   //shiftLeft(count)
   //shiftright(count)
   //shiftWordLeft(count)
   //shiftWordRight(count)
   //firstWord
   //lastWord
   //detectMustFrequentDelimiter
   //splitByFrequentDelimeter
   //lines
   //linesCount
   //everyLine
   //every(template)
   //equals
   //notEquals
   //hasSameLengthAs
   //levenstain()
   //shorterThan
   //longerThan
   //containsEmail
   //containsIP
   //containsURL
   //everyURL
   //sameButWordsOrderChanged
   //isLikelyName
   //isFilenameWithExtention
   


}

const strObj = (str) => {
  return new stingObj(str);
}



  
 module.exports = strObj;