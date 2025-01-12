var assert = require('assert');
var str = require('../index');
describe('Str', function () {
  describe('#inverse()', function () {
    it('should return inverse string', function () {
      assert.equal(str('my team').inverse(), 'maet ym');
    });
  });

  describe('#startsWith()', function () {
    it('should return true if string starts with needle', function () {
      assert.equal(str('my team').startsWith('me'), false);
      assert.equal(str('my team').startsWith('my'), true);
    });
  });

  describe('#endsWith()', function () {
    it('should return true if string ends with needle', function () {
      assert.equal(str('my team').endsWith('team'), true);
      assert.equal(str('my team').endsWith('cofe'), false);
    });
  });

  describe('#contains()', function () {
    it('should return true if string contains needle', function () {
      assert.equal(str('my team').contains('tea'), true);
    });
    it('should return false if string doesn\'t contain needle', function () {
      assert.equal(str('my team').contains('cofe'), false);
    });
  });

  describe('#truncate()', function () {
    it('should return truncated string with only length parameter', function () {
      assert.equal(str('my very long sentence').truncate(7), 'my very');
    });
    it('should return truncated string with length and offset parameter', function () {
      assert.equal(str('my very long sentence').truncate(9, 3), 'very long');
    });
  });

  describe('#sequense()', function () {
    it('can apply command in chain', function () {
      assert.equal(str('my very long sentence').truncate(7).duplicate(), 'my verymy very');
    });
  });

  //ucFirst

  describe('#ucFirst()', function () {
    it('it returns string with first letter capitalized', function () {
      assert.equal(str('my very long sentence').ucFirst(), 'My very long sentence');
    });
  });


  //capitalize
  describe('#capitalize()', function () {
    it('it returns string with all words capitalized', function () {
      assert.equal(str('my very long sentence').capitalize(), 'My Very Long Sentence');
    });
  });


  //uppercase
  describe('#uppercase()', function () {
    it('it returns string with all words uppercased', function () {
      assert.equal(str('my very long sentence').uppercase(), 'MY VERY LONG SENTENCE');
    });
  });

  //lowercase
  describe('#lowercase()', function () {
    it('it returns string with all words lowercased', function () {
      assert.equal(str('My very Long sentence').lowercase(), 'my very long sentence');
    });
  });

  //stripTags
  describe('#stripTags()', function () {
    it('it returns string without xml/html tags ', function () {
      assert.equal(str('<p>My very Long sentence.<br><br /></p><div class="some">123</div>').stripTags(), 'My very Long sentence.123');
    });
  });


  //isHTML
  describe('#isHTML()', function () {
    it('it returns true is string contains html tags', function () {
      assert.equal(str('<p>My very Long sentence.<br><br /></p><div class="some">123</div>').isHtml(), true);
    });
    it('it returns false is string does not contain html tags', function () {
      assert.equal(str('My very Long sentence.').isHtml(), false);
    });
  });

    //sentences - spllit text into array of sentences
    describe('#sentences()', function () {
      it('it returns array of sentences', function () {
        assert.deepEqual(str('It is the first sentence. And this is the second one! What about third? I really think it works, but maybe it doesn\'t...')
        .sentences(),
        [
          'It is the first sentence.',
          'And this is the second one!',
          'What about third?',
          'I really think it works, but maybe it doesn\'t...'
        ]
        );
      });
    });
        //replace
        describe('#replace()', function () {
          it('it makes simple replaceAll', function () {
            assert.equal(str('The village was not so large')
            .replace('village','town'),
            'The town was not so large'
            );
          });
          it('it makes replaceAll with array', function () {
            assert.equal(str('The village was not so large')
            .replace(['village','not '],['town','']),
            'The town was so large'
            );
          });
          it('it makes replace for all occurencies', function () {
            assert.equal(str('one two bone')
            .replace('one','on'),
            'on two bon'
            );
          });
        });

        //replaceFirst
        describe('#replaceFirst()', function () {
          it('it makes simple replace', function () {
            assert.equal(str('The village was not so large. I liked the village.')
            .replaceFirst('village','town'),
            'The town was not so large. I liked the village.'
            );
          });
          it('it makes replace with array', function () {
            assert.equal(str('The village was not so large. The village was small.')
            .replaceFirst(['village','not '],['town','']),
            'The town was so large. The village was small.'
            );
          });
        });

           //compile(params) - replace string wildcards with params

           describe('#compile()', function () {
            it('it replaces wildcards with values', function () {
              assert.equal(str('The {type} was not so {size}')
              .compile({
                  type: 'village',
                  size: 'large'
              }),
              'The village was not so large'
              );
            });

          });
          describe('#randomWord()', function () {
            it('should return a random word from the string', function () {
              const result = str('my very long sentence').randomWord();
              assert.ok(['my', 'very', 'long', 'sentence'].includes(result));
            });
            it('should return null if the string is empty', function () {
              assert.equal(str('').randomWord(), null);
            });
          });
      describe('#randomLetter()', function () {
        it('should return a random letter from the string', function () {
          const result = str('my very long sentence').randomLetter();
          assert.ok('my very long sentence'.includes(result));
        });
        it('should return null if the string is empty', function () {
          assert.equal(str('').randomLetter(), null);
        });
      });

      describe('#truncateWithTags()', function () {
        it('should return truncated string with HTML tags preserved', function () {
          assert.equal(str('<p>My very long sentence</p>').truncateWithTags(7), '<p>My very</p>');
        });
        it('should handle nested HTML tags', function () {
          assert.equal(str('<div><p>My very long sentence</p></div>').truncateWithTags(7), '<div><p>My very</p></div>');
        });
        it('should handle self-closing HTML tags', function () {
          assert.equal(str('<p>My very long sentence<br /></p>').truncateWithTags(7), '<p>My very</p>');
        });
      });

      describe('#slug()', function () {
        it('should return a slugified string', function () {
          assert.equal(str('My Very Long Sentence').slug(), 'my-very-long-sentence');
        });
        it('should handle special characters', function () {
          assert.equal(str('My Very Long Sentence!@#$%^&*()').slug(), 'my-very-long-sentence');
        });
        it('should handle multiple spaces', function () {
          assert.equal(str('My   Very   Long   Sentence').slug(), 'my-very-long-sentence');
        });
        it('should handle leading and trailing spaces', function () {
          assert.equal(str('  My Very Long Sentence  ').slug(), 'my-very-long-sentence');
        });
        it('should handle mixed case', function () {
          assert.equal(str('My VeRy LoNg SeNtEnCe').slug(), 'my-very-long-sentence');
        });
      });

          describe('#randomizeWords()', function () {
            it('should return a string with words in random order', function () {
              const result = str('my very long sentence').randomizeWords();
              const words = result.split(' ');
              assert.ok(words.includes('my') && words.includes('very') && words.includes('long') && words.includes('sentence'));
            });
            it('should return an empty string if the input is empty', function () {
              assert.equal(str('').randomizeWords(), '');
            });
            it('should handle single word strings', function () {
              assert.equal(str('word').randomizeWords(), 'word');
            });
          });

      describe('#insertTypo()', function () {
        it('should insert a typo into the string', function () {
          const result = str('my very long sentence').insertTypo();
          console.log(result);
          
          assert.notEqual(result, 'my very long sentence');
        });
        it('should return the original string if it is empty', function () {
          assert.equal(str('').insertTypo(), '');
        });

      });

        describe('#compareByChar()', function () {
          it('should return an array of equal and diff objects for identical strings', function () {
            assert.deepEqual(str('abc').compareByChar('abc'), [
              { type: 'eq', content: 'abc' }
            ]);
          });
          it('should return an array of equal and diff objects for different strings', function () {
            assert.deepEqual(str('abc').compareByChar('def'), [
              { type: 'diff', left: 'abc', right: 'def' }
            ]);
          });
          it('should return an array of equal and diff objects for partially matching strings', function () {
            assert.deepEqual(str('abcxyz').compareByChar('abcpqr'), [
              { type: 'eq', content: 'abc' },
              { type: 'diff', left: 'xyz', right: 'pqr' }
            ]);
          });
          it('should handle strings of different lengths', function () {
            assert.deepEqual(str('abc').compareByChar('abcdef'), [
              { type: 'eq', content: 'abc' },
              { type: 'diff', left: '', right: 'def' }
            ]);
          });
          it('should handle empty strings', function () {
            assert.deepEqual(str('').compareByChar(''), []);
            assert.deepEqual(str('abc').compareByChar(''), [
              { type: 'diff', left: 'abc', right: '' }
            ]);
            assert.deepEqual(str('').compareByChar('abc'), [
              { type: 'diff', left: '', right: 'abc' }
            ]);
          });
        });
          
      describe('#highlight()', function () {
        it('should highlight the specified word in the string', function () {
          assert.equal(str('my very long sentence').highlight('long'), 'my very <mark>long</mark> sentence');
        });
        it('should highlight multiple occurrences of the specified word', function () {
          assert.equal(str('my long long sentence').highlight('long'), 'my <mark>long</mark> <mark>long</mark> sentence');
        });
        it('should return the original string if the word is not found', function () {
          assert.equal(str('my very long sentence').highlight('short'), 'my very long sentence');
        });
        it('should use user-defined mark for highlighting', function () {
          assert.equal(str('my very long sentence').highlight('long','<span class="highlight">$&</span>'), 'my very <span class="highlight">long</span> sentence');
        });
        it('should handle empty string', function () {
          assert.equal(str('').highlight('word'), '');
        });
        it('should handle empty word', function () {
          assert.equal(str('my very long sentence').highlight(''), 'my very long sentence');
        });

      });

          describe('#queryParams()', function () {
            it('should return an object of query parameters from the string', function () {
              assert.deepEqual(str('https://example.com?name=John&age=30').queryParams(), {
                name: 'John',
                age: '30'
              });
            });
            it('should handle multiple query parameters with the same key', function () {
              assert.deepEqual(str('https://example.com?name=John&name=Doe&age=30').queryParams(), {
                name: ['John', 'Doe'],
                age: '30'
              });
            });
            it('should handle empty query string', function () {
              assert.deepEqual(str('https://example.com').queryParams(), {});
            });
            it('should handle query string without values', function () {
              assert.deepEqual(str('https://example.com?name&age').queryParams(), {
                name: '',
                age: ''
              });
            });
            it('should handle query string with encoded characters', function () {
              assert.deepEqual(str('https://example.com?name=John%20Doe&age=30').queryParams(), {
                name: 'John Doe',
                age: '30'
              });
            });
            it('should handle query string with special characters', function () {
              assert.deepEqual(str('https://example.com?name=John+Doe&age=30').queryParams(), {
                name: 'John Doe',
                age: '30'
              });
            });
            it('should handle query string with arrays', function () {
              assert.deepEqual(str('https://example.com?name[]=John&name[]=Doe&age=30').queryParams(), {
                name: ['John', 'Doe'],
                age: '30'
              });
            });
          });
      
          describe('#isUrl()', function () {
            it('should return true if the string is a valid URL', function () {
              assert.equal(str('https://example.com').isUrl(), true);
              assert.equal(str('http://example.com').isUrl(), true);
              assert.equal(str('example.com').isUrl(), true);
              
            });
            it('should return false if the string is not a valid URL', function () {
              assert.equal(str('ftp://example.com').isUrl(), false);
              assert.equal(str('not a url').isUrl(), false);
            });
          });

          describe('#urlScheme()', function () {
            it('should return the scheme of the URL', function () {
              assert.equal(str('https://example.com').urlScheme(), 'https');
              assert.equal(str('http://example.com').urlScheme(), 'http');
            });
            it('should return null if the string is not a valid URL', function () {
              assert.equal(str('example.com').urlScheme(), null);
            });
          });

          describe('#urlDomain()', function () {
            it('should return the domain of the URL', function () {
              assert.equal(str('https://example.com').urlDomain(), 'example.com');
              assert.equal(str('http://sub.example.com').urlDomain(), 'sub.example.com');
            });
            it('should return null if the string is not a valid URL', function () {
              assert.equal(str('not valid url').urlDomain(), null);
            });
          });

          describe('#urlRoute()', function () {
            it('should return the route of the URL', function () {
              assert.equal(str('https://example.com/path/to/resource').urlRoute(), '/path/to/resource');
              assert.equal(str('http://example.com/').urlRoute(), '/');
            });
            it('should return null if the string is not a valid URL', function () {
              assert.equal(str('example.com').urlRoute(), null);
            });
          });

      describe('#fileExtention()', function () {
        it('should return file extension from string', function () {
          assert.equal(str('example.txt').fileExtention(), 'txt');
          assert.equal(str('archive.tar.gz').fileExtention(), 'gz');
          assert.equal(str('noextension').fileExtention(), null);
          assert.equal(str('path/to/file.js').fileExtention(), 'js');
          assert.equal(str('image.png?width=200').fileExtention(), 'png');
        });
      });



});
