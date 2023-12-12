// test/script.js

// const strMod = require('lex-module')
const str = require('../index')

console.log(str('my team').inverse())
console.log(str('my team').startsWith('me'))
console.log(str('my team').startsWith('my'))
console.log(str('my team').endsWith('team'))
console.log(str('my team').endsWith('cofe'))
console.log(str('my team').contains('cofe'))
console.log(str('my team').contains('tea'))
console.log(str('my team').truncate(3))
console.log(str('my team').truncate(3,2))
console.log(str('my team').words())
console.log(str('my team').wordsCount())
console.log(str('My team, my rule, my life. Life is great.').wordsFreq())
