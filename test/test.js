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
        assert.equal(str('my very long sentence').truncate(9,3), 'very long');
      });
  });

  describe('#sequense()', function () {
    it('can apply command in chain', function () {
            assert.equal(str('my very long sentence').truncate(7).duplicate(), 'my verymy very');
    });
  });
});