//index.js
class stingObj {
  constructor(str) {
    this.str = str;

    return this;
  }
  length() {
    return this.str.length;
  }

  split(delimiter) {
    return this.str.split(delimiter);
  }

  
  toString() {
    return this.str;
  }
  duplicate() {
    this.str = this.str + this.str;
    return this;
  }
  inverse() {
    let inv = "";
    for (let i = 0; i < this.str.length; i++) {
      inv += this.str.slice(this.str.length - i - 1, this.str.length - i);
    }
    this.str = inv;
    return this;
  }

  startsWith(needle) {
    return this.str.slice(0, needle.length) === needle;
  }

  endsWith(needle) {
    return this.str.slice(this.str.length - needle.length) === needle;
  }

  contains(needle) {
    return this.str.indexOf(needle) > -1;
  }

  truncate(length, start) {
    const startPos = start ?? 0;
    this.str = this.str.slice(startPos, startPos + length);
    return this;
  }

  words() {
    if (!this.str || this.str.trim() === "") {
      return [];
    }
    return this.str
      .replace(/\W+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((word) => word.toLowerCase());
  }

  wordsCount() {
    return this.words().length;
  }

  wordsFreq() {
    const words = [];
    const freq = [];

    this.words().map((word) => {
      if (words.indexOf(word) > -1) {
        freq[words.indexOf(word)]++;
      } else {
        words.push(word);
        freq.push(1);
      }
    });
    return [words, freq];
  }

  //ucFirst
  ucFirst() {
    this.str = this.str.slice(0, 1).toUpperCase() + this.str.slice(1);
    return this;
  }

  //capitalize
  capitalize() {
    let newStr = [];
    this.str
      .toLowerCase()
      .split(" ")
      .map((part) => {
        newStr.push(part.slice(0, 1).toUpperCase() + part.slice(1));
      });

    this.str = newStr.join(" ");
    return this;
  }

  //uppercase
  uppercase() {
    this.str = this.str.toUpperCase();
    return this;
  }

  //lowercase
  lowercase() {
    this.str = this.str.toLowerCase();
    return this;
  }

  //striptags
  stripTags() {
    this.str = this.str.replaceAll(/(<([^>]+)>)/gi, "");
    return this;
  }

  //isHtml
  isHtml() {
    let regexp = /<\/?\s?(\w*)[^]*?>/g;

    const tags = "document|body|p|div|br|span|section".split("|");
    const matches = [...this.str.matchAll(regexp)];

    if (matches.length === 0) return false;

    matches.forEach((tag) => {
      if (tags.indexOf(tag[1]) === -1) return false;
    });
    return true;
  }

  sentences() {
    return this.str
      .replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|")
      .split("|");
  }

  //replace
  replace(from, to) {
    from = from.constructor !== Array ? [from] : from;
    to = from.constructor !== Array ? [to] : to;

    from.forEach((fromItem, index) => {
      let toItem = to;
      if (to.constructor === Array) {
        toItem = to[index] !== undefined ? to[index] : "";
      }
      this.str = this.str.replaceAll(fromItem, toItem);
    });

    return this;
  }

  //replaceFirst
  replaceFirst(from, to) {
    from = from.constructor !== Array ? [from] : from;
    to = from.constructor !== Array ? [to] : to;

    from.forEach((fromItem, index) => {
      let toItem = to;
      if (to.constructor === Array) {
        toItem = to[index] !== undefined ? to[index] : "";
      }
      this.str = this.str.replace(fromItem, toItem);
    });

    return this;
  }

  //compile(params) - replace string wildcards with params
  compile(params, template) {
    let regexp = template !== undefined ? template : /\{(\w*)\}/g;
    const wildacrds = [...this.str.matchAll(regexp)];

    if (wildacrds.length > 0) {
      wildacrds.forEach((wildcard, index) => {
        if (params[wildcard[1]] !== undefined) {
          this.str = this.str.replaceAll(wildcard[0], params[wildcard[1]]);
        }
      });
    }
    return this;
  }
  //randomWord - returns a random word from the string
  randomWord() {
    const words = this.words();
    console.log("w", words);
    if (words.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
  //randomLetter
  //isNumeric
  //isInt

  //randomLetter - returns a random letter from the string
  randomLetter() {
    if (!this.str || this.str.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.str.length);
    return this.str[randomIndex];
  }


  //truncateWithTags - truncates the string while preserving HTML tags
  truncateWithTags(length) {
    let truncatedStr = '';
    let tagStack = [];
    let currentLength = 0;

    const regex = /(<\/?[^>]+>)|([^<]+)/g;
    let match;

    while ((match = regex.exec(this.str)) !== null && currentLength < length) {
      if (match[1]) {
        // It's a tag
        truncatedStr += match[1];
        if (!match[1].startsWith('</')) {
          // It's an opening tag, push to stack
          tagStack.push(match[1]);
        } else {
          // It's a closing tag, pop from stack
          tagStack.pop();
        }
      } else if (match[2]) {
        // It's text
        const text = match[2];
        const remainingLength = length - currentLength;
        if (text.length > remainingLength) {
          truncatedStr += text.slice(0, remainingLength);
          currentLength += remainingLength;
        } else {
          truncatedStr += text;
          currentLength += text.length;
        }
      }
    }

    // Close any unclosed tags
    while (tagStack.length > 0) {
      const tag = tagStack.pop();
      truncatedStr += `</${tag.match(/<\/?(\w+)/)[1]}>`;
    }

    this.str = truncatedStr;
    return this;
  }
  
  //slug - generates a URL-friendly slug from the string
  slug() {
    this.str = this.str
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a single hyphen
      .replace(/^-+|-+$/g, ''); // Trim hyphens from the start and end

    return this;
  }

  //randomizeWords - shuffles the words in the string randomly
  randomizeWords() {
    const words = this.words();
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    this.str = words.join(" ");
    return this;
    
  }
  //insertTypo - inserts a random typo into the string
  insertTypo() {
    if (!this.str || this.str.length === 0) return this;

    const typoTypes = [
      // Swap adjacent characters
      (str, index) => {
        if (index >= str.length - 1) return str;
        return str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2);
      },
      // Delete a character
      (str, index) => {
        return str.slice(0, index) + str.slice(index + 1);
      },
      // Insert a random character
      (str, index) => {
        const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
        return str.slice(0, index) + randomChar + str.slice(index);
      },
      // Replace a character with a random character
      (str, index) => {
        const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
        return str.slice(0, index) + randomChar + str.slice(index + 1);
      }
    ];

    const randomIndex = Math.floor(Math.random() * this.str.length);
    const randomTypo = typoTypes[Math.floor(Math.random() * typoTypes.length)];
    this.str = randomTypo(this.str, randomIndex);

    return this;
  }

  
  //compareByChar
  compareByChar(strToCompare) {
    const result = [];
    let i = 0, j = 0;
    let currentEqual = '';
    let currentDiffLeft = '';
    let currentDiffRight = '';

    while (i < this.str.length || j < strToCompare.length) {
      const char1 = this.str[i] || '';
      const char2 = strToCompare[j] || '';

      if (char1 === char2) {
        if (currentDiffLeft || currentDiffRight) {
          result.push({ type: 'diff', left: currentDiffLeft, right: currentDiffRight });
          currentDiffLeft = '';
          currentDiffRight = '';
        }
        currentEqual += char1;
        i++;
        j++;
      } else {
        if (currentEqual) {
          result.push({ type: 'eq', content: currentEqual });
          currentEqual = '';
        }
        currentDiffLeft += char1;
        currentDiffRight += char2;
        i++;
        j++;
      }
    }

    if (currentEqual) {
      result.push({ type: 'eq', content: currentEqual });
    }
    if (currentDiffLeft || currentDiffRight) {
      result.push({ type: 'diff', left: currentDiffLeft, right: currentDiffRight });
    }

    return result;
  }
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

  //chained function str('some string).uppercaseThan().shiftleftThan().fisrtWorld()
}

const strObj = (str) => {
  return new stingObj(str);
};

module.exports = strObj;
