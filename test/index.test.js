//http://es6katas.org/  https://gist.github.com/hanmd82

//String includes()
describe('`string.includes()` finds string within another string', function () {

  describe('find a single character', function () {
    it('in a three char string', function () {
      const searchString = 'x';
      assert.equal('xyz'.includes(searchString), true);
    });
    it('reports false if character was not found', function () {
      const expected = false;
      assert.equal('xyz'.includes('abc'), expected);
    });
  });

  describe('find a string', function () {
    it('that matches exactly', function () {
      const findSome = findMe => findMe.includes(findMe);
      assert.equal(findSome('xyz'), true);
    });
  });

  describe('search for an empty string, is always true', function () {
    it('in an empty string', function () {
      const emptyString = '';
      assert.equal(''.includes(emptyString), true);
    });
    it('in `abc`', function () {
      const actual = ''.includes('');
      assert.equal(actual, true);
    });
  });

  describe('special/corner cases', function () {
    it('search for `undefined` in a string fails', function () {
      const findInAbc = (what) => 'abc'.includes(what);
      assert.equal(findInAbc(void 0), false);
    });
    it('searches case-sensitive', function () {
      const findInAbc = (what) => 'abc'.includes(what);
      assert.equal(findInAbc('A'), false);
    });
    it('must NOT be a regular expression', function () {
      const regExp = /$%/;
      assert.throws(() => { ''.includes(regExp) });
    });
    describe('coerces the searched "thing" into a string', function () {
      it('e.g. from a number', function () {
        const actual = '123'.includes(2);
        assert.equal(actual, true);
      });
      it('e.g. from an array', function () {
        const actual = '123'.includes([1]);
        assert.equal(actual, true);
      });
      it('e.g. from an object, with a `toString()` method', function () {
        const objWithToString = { toString() { return 1 } };
        assert.equal('123'.includes(objWithToString), true);
      });
    });
  });

  describe('takes a position from where to start searching', function () {
    it('does not find `a` after position 1 in `abc`', function () {
      const position = 2;
      assert.equal('abc'.includes('a', position), false);
    });
    it('even the position gets coerced', function () {
      const findAtPosition = (pos) => 'xyz'.includes('z', pos);
      assert.equal(findAtPosition('2'), true);
    });
    describe('invalid positions get converted to 0', function () {
      it('e.g. `undefined`', function () {
        const findAtPosition = (pos) => 'xyz'.includes('x', pos);
        assert.equal(findAtPosition(void 0), true);
      });
      it('negative numbers', function () {
        const findAtPosition = (pos) => 'xyz'.includes('x', pos);
        assert.equal(findAtPosition(-2), true);
      });
      it('NaN', function () {
        const findAtPosition = (pos) => 'xyz'.includes('x', pos);
        assert.equal(findAtPosition(NaN), true);
      });
    });
  });

});

//String repeat()
describe('`str.repeat(x)` appends `x` copies of `str` to each other and returns it', function () {

  describe('pass the count to `str.repeat(count)`', function () {
    it('for `1` the string stays the same', function () {
      const what = 'one'.repeat(1);
      assert.equal(what, 'one');
    });
    it('for `3` the string `x` becomes `xxx`', function () {
      const actual = 'x'.repeat(3);
      assert.equal(actual, 'xxx');
    });
    it('for `0` an empty string is returned', function () {
      const dontRepeat = 0;
      assert.equal('shrink'.repeat(dontRepeat), '');
    });

    it('the count is not an int, such as "3", it gets coerced to an int', function () {
      const repeated = 'three'.repeat('3');
      assert.equal(repeated, 'threethreethree');
    });
  });

  describe('throws an error for', function () {
    it('a count of <0', function () {
      const belowZero = -1;
      assert.throws(() => { ''.repeat(belowZero); }, RangeError);
    });
    it('a count of +Infinty', function () {
      let infinity = '+Infinity';
      assert.throws(() => { ''.repeat(infinity); }, RangeError);
    });
  });

  describe('accepts everything that can be coerced to a string', function () {
    it('e.g. a boolean', function () {
      let aBool = false;
      assert.equal(String.prototype.repeat.call(aBool, 2), 'falsefalse');
    });
    it('e.g. a number', function () {
      let aNumber = 1;
      assert.equal(String.prototype.repeat.call(aNumber, 2), '11');
    });
  });

  describe('for my own (string) class', function () {
    it('calls `toString()` to make it a string', function () {
      class MyString { toString() { return 'my string'; } }

      const expectedString = 'my string';

      assert.equal(String(new MyString()).repeat(1), expectedString);
    });
    it('`toString()` is only called once', function () {
      let counter = 1;
      class X {
        toString() {
          return counter++;
        }
      }

      let repeated = String(new X()).repeat(2);

      assert.equal(repeated, '11');
    });
  });

});

//String startsWith()
describe('`str.startsWith(searchString)` determines whether `str` begins with `searchString`.', function () {

  const s = 'the string s';

  describe('1st parameter, the string to search for', function () {
    it('works with just a character', function () {
      const actual = s.startsWith('t');
      assert.equal(actual, true);
    });
    it('works with a string', function () {
      const expected = true;
      assert.equal(s.startsWith('the'), expected);
    });
    it('works with unicode characters', function () {
      const nuclear = '☢ NO';
      assert.equal(nuclear.startsWith('☢'), true);
    });
    it('a regular expression throws a TypeError', function () {
      const aRegExp = /&$/;
      assert.throws(() => { ''.startsWith(aRegExp) }, TypeError);
    });
  });

  describe('2nd parameter, the position where to start searching from', function () {
    it('find "str" at position 4', function () {
      const position = 4;
      assert.equal(s.startsWith('str', position), true);
    });
    it('`undefined` is the same as 0', function () {
      const _undefined_ = 0;
      assert.equal(s.startsWith('the', _undefined_), true);
    });
    it('the parameter gets coerced to an int', function () {
      const position = '4';
      assert.equal(s.startsWith('str', position), true);
    });
    it('a value larger than the string`s length, returns false', function () {
      const expected = false;
      assert.equal(s.startsWith(' ', s.length + 1), expected);
    });
  });

  describe('transfer the functionality to other objects', function () {

    const startsWith = (...args) => String.prototype.startsWith.call(...args);

    it('e.g. a boolean', function () {
      let aBool = true;
      assert.equal(startsWith(!aBool, 'false'), true);
    });
    it('e.g. a number', function () {
      let aNumber = 1900;
      assert.equal(startsWith(aNumber + 84, '1984'), true);
    });
    it('also using the position works', function () {
      const position = 1;
      assert.equal(startsWith(1994, '99', position), true);
    });
  });

});

//String endsWith()
describe('`str.endsWith(searchString)` determines whether `str` ends with `searchString`.', function () {

  const s = 'el fin';

  describe('1st parameter, the string to search for', function () {
    it('works with just a character', function () {
      const doesEndWith = s.endsWith('n');
      assert.equal(doesEndWith, true);
    });
    it('works with a string', function () {
      const expected = true;
      assert.equal(s.endsWith('fin'), expected);
    });
    it('works with unicode characters', function () {
      const nuclear = 'NO ☢';
      assert.equal(nuclear.endsWith('☢'), true);
    });
    it('a regular expression throws a TypeError', function () {
      const aRegExp = /%&/;
      assert.throws(() => { ''.endsWith(aRegExp) }, TypeError);
    });
  });

  describe('2nd parameter, searches within this string as if this string were only this long', function () {
    it('find "el" at a substring of the length 2', function () {
      const endPos = 2;
      assert.equal(s.endsWith('el', endPos), true);
    });
    it('`undefined` uses the entire string', function () {
      const _undefined_ = undefined;
      assert.equal(s.endsWith('fin', _undefined_), true);
    });
    it('the parameter gets coerced to an int', function () {
      const position = '5';
      assert.equal(s.endsWith('fi', position), true);
    });
    describe('value less than 0', function () {
      it('returns `true`, when searching for an empty string', function () {
        const emptyString = '';
        assert.equal('1'.endsWith(emptyString, -1), true);
      });
      it('return `false`, when searching for a non-empty string', function () {
        const notEmpty = 'lol';
        assert.equal('1'.endsWith(notEmpty, -1), false);
      });
    });
  });

  describe('transfer the functionality to other objects', function () {

    const endsWith = (...args) => String.prototype.endsWith.call(...args);

    it('e.g. a boolean', function () {
      let aBool = true;
      assert.equal(endsWith(!aBool, 'lse'), true);
    });
    it('e.g. a number', function () {
      let aNumber = 84;
      assert.equal(endsWith(aNumber + 1900, 84), true);
    });
    it('also using the position works', function () {
      const position = '3';
      assert.equal(endsWith(1994, '99', position), true);
    });
  });

});



////////////////////////////////////////////////////////////////////////////////////////////


//Arrow functions basis
describe('arrow functions', function () {

  it('are shorter to write', function () {
    var func = () => {
      return 'I am func';
    };
    assert.equal(func(), 'I am func');
  });

  it('a single expression, without curly braces returns too', function () {
    var func = () => 'I return too';
    assert.equal(func(), 'I return too');
  });

  it('one parameter can be written without parens', () => {
    var func = p => p - 1;
    assert.equal(func(25), 24);
  });

  it('many params require parens', () => {
    var func = (param, param1) => param + param1;
    assert.equal(func(23, 42), 23 + 42);
  });

  it('body needs parens to return an object', () => {
    var func = () => {
      return {
        iAm: 'an object'
      }
    };
    assert.deepEqual(func(), { iAm: 'an object' });
  });

});

//Arrow functions binding
class LexicallyBound {

  getFunction() {
    return () => this
  }

  getArgumentsFunction() {
    return () => arguments
  }

}

describe('arrow functions have lexical `this`, no dynamic `this`', () => {

  it('bound at definition time, use `=>` ', function () {
    var bound = new LexicallyBound();
    var fn = bound.getFunction();

    assert.strictEqual(fn(), bound);
  });

  it('can NOT bind a different context', function () {
    var bound = new LexicallyBound();
    var fn = bound.getFunction();
    var anotherObj = {};
    var expected = bound;

    assert.strictEqual(fn.call(anotherObj), expected);
  });

  it('`arguments` doesnt work inside arrow functions', function () {
    var bound = new LexicallyBound();
    var fn = bound.getArgumentsFunction();

    assert.equal(fn(1, 2).length, 0);
  });

});



////////////////////////////////////////////////////////////////////////////////////////////////////



//Block scope let
describe('`let` restricts the scope of the variable to the current block', () => {

  describe('`let` vs. `var`', () => {

    it('`var` works as usual', () => {
      if (true) {
        var varX = true;
      }
      assert.equal(varX, true);
    });

    it('`let` restricts scope to inside the block', () => {
      if (true) {
        let letX = true;
      }
      assert.throws(() => console.log(letX));
    });

  });

  describe('`let` usage', () => {

    it('`let` use in `for` loops', () => {
      let obj = { x: 1 };
      for (let key in obj) { }
      assert.throws(() => console.log(key));
    });

    it('create artifical scope, using curly braces', () => {
      {
        let letX = true;
      }
      assert.throws(() => console.log(letX));
    });

  });

});

//Block scope const
describe('`const` is like `let` plus read-only', () => {

  describe('scalar values are read-only', () => {

    it('number', () => {
      const constNum = 0;
      //constNum = 1;
      assert.equal(constNum, 0);
    });

    it('string', () => {
      const constString = 'I am a const';
      //constString = 'Cant change you?';
      assert.equal(constString, 'I am a const');
    });

  });

  const notChangeable = 23;

  it('const scope leaks too', () => {
    assert.equal(notChangeable, 23);
  });

  describe('complex types are NOT fully read-only', () => {

    it('array', () => {
      const arr = [4, 23];
      arr[0] = 42;
      assert.equal(arr[0], 42);
    });

    it('object', () => {
      const obj = { x: 1 };
      obj.x = 3;
      assert.equal(obj.x, 3);
    });

  });

});



//////////////////////////////////////////////////////////////////////////////////////////////////////



//Default parameters
describe('default parameters make function parameters more flexible', () => {

  it('define it using an assignment to the parameter `function(param=1){}`', function () {
    let number = (int = 0) => int;

    assert.equal(number(), 0);
  });

  it('it is used when undefined is passed', function () {
    let number = (int = 23) => int;
    const param = undefined;

    assert.equal(number(param), 23);
  });

  it('it is not used when a value is given', function () {
    function xhr(method = 'turuuru') {
      return method;
    }

    assert.equal(xhr('POST'), 'POST');
  });

  it('it is evaluated at run time', function () {
    let defaultValue;
    defaultValue = 42;
    function xhr(method = `value: ${defaultValue}`) {
      return method;
    }

    assert.equal(xhr(), 'value: 42');
  });

  it('it can also be a function', function () {
    let defaultValue = () => { };
    function fn(value = defaultValue()) {
      return value;
    }

    assert.equal(fn(), defaultValue());
  });

});




/////////////////////////////////////////////////////////////////////////////////////////////////



//Modules import
import assert from 'assert'; // is only here for completeness, `assert` is always imported by default
import { equal, deepEqual, notEqual } from 'assert';
import { equal as myEqual } from 'assert';
import myAssert from 'assert';

describe('use `import` to import functions that have been exported (somewhere else)', function () {

  describe('the import statement', function () {
    it('is only allowed on the root level', function () {
      //try to comment this out, it will yell at you :)
      //import assert from 'assert';
    });

    it('import an entire module using `import <name> from "<moduleName>"`', function () {
      // this can't fail, since `assert` is imported by default
      assert.equal(typeof assert, 'function');
    });
  });

  describe('import members', function () {
    it('import a single member, using `import {<memberName>} from "module"`', function () {
      assert.strictEqual(equal, assert.equal);
    });
    describe('separate multiple members with a comma', function () {
      it('`deepEqual` from the assert module', () => {
        assert.strictEqual(deepEqual, assert.deepEqual);
      });
      it('`notEqual` from the assert module', () => {
        assert.strictEqual(notEqual, assert.notEqual);
      });
    });
  });

  describe('alias imports', function () {
    it('using `member as alias` as memberName', function () {
      assert.strictEqual(myEqual, assert.equal);
    });
    it('rename the default export of a module, using `default as alias` as memberName', function () {
      assert.strictEqual(myAssert, assert);
    });
  });
});



//////////////////////////////////////////////////////////////////////////////////////////////////



//Object literal basis
describe('The object literal allows for new shorthands', () => {

  const x = 1;
  const y = 2;

  describe('with variables', () => {
    it('the short version for `{x: x}` is {x}', () => {
      const short = { y };
      assert.deepEqual(short, { y: y });
    });
    it('works with multiple variables too', () => {
      const short = { x, y };
      assert.deepEqual(short, { x: x, y: y });
    });
  });

  describe('with methods', () => {

    const func = () => func;

    it('using the name only uses it as key', () => {
      const short = { func };
      assert.deepEqual(short, { func: func });
    });

    it('a different key must be given explicitly, just like before ES6', () => {
      const short = { otherKey: func };
      assert.deepEqual(short, { otherKey: func });
    });

    it('inline functions, can written as `obj={func(){}}` instead of `obj={func:function(){}}`', () => {
      const short = {
        inlineFunc() { return 'I am inline' }
      };
      assert.deepEqual(short.inlineFunc(), 'I am inline');
    });
  });
});

//Object literal computed properties
describe('Object literal properties may be computed values', () => {

  it('a computed property `x` needs to be surrounded by `[]`', () => {
    const propertyName = 'x';
    const obj = { [propertyName]: 1 };
    assert.equal(obj.x, 1);
  });

  it('can also get a function assigned', () => {
    const key = 'func';
    const obj = { [key]() { return 'seven' } };
    assert.equal(obj.func(), 'seven');
  });

  it('the key may also be the result of a function call', () => {
    const getName = 'propertyName';
    const obj = { [getName]() { return 'seven' } };
    assert.equal(obj.propertyName(), 'seven');
  });

  it('the key can also be constructed by an expression', () => {
    const what = 'tyName';
    const obj = { ['proper' + what]: null };
    assert.equal('propertyName' in obj, true);
  });

  it('accessor keys can be computed names too', () => {
    const obj = {
      get ['key']() { return 1 }
    };
    assert.equal(obj.key, 1);
  });
});

//Object literal getter
describe('An object literal can also contain getters', () => {

  it('just prefix the property with `get` (and make it a function)', function () {
    const obj = {
      get x() { return 'ax'; }
    };

    assert.equal(obj.x, 'ax');
  });

  it('must have NO parameters', function () {
    const obj = {
      get x() { return 'ax'; }
    };

    assert.equal(obj.x, 'ax');
  });


  it('can be a computed property (an expression enclosed in `[]`)', function () {
    const keyName = 'x';
    const obj = {
      get ['x']() { return 'ax'; }
    };

    assert.equal(obj.x, 'ax');
  });

  it('can be removed using delete', function () {
    const obj = {
      get x() { return 'ax'; }
    };
    delete obj.x;

    assert.equal(obj.x, void 0);
  });

  // The following dont seem to work in the current transpiler version
  // but should be correct, as stated here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
  // It might be corrected later, new knowledge welcome.

  //it('must not overlap with a pure property', function() {
  //  const obj = {
  //    x: 1,
  //    get x() { return 'ax'; }
  //  };
  //  
  //  assert.equal(obj.x, 'ax');
  //});
  //
  //it('multiple `get` for the same property are not allowed', function() {
  //  const obj = {
  //    x: 1,
  //    get x() { return 'ax'; },
  //    get x() { return 'ax1'; }
  //  };
  //  
  //  assert.equal(obj.x, 'ax');
  //});
});

//Objecy literal setter
describe('An object literal can also contain setters', () => {

  describe('defining: a setter', function () {
    it('by prefixing the property with `set` (and make it a function)', function () {
      let theX = null;
      const obj = {
        set x(newX) { theX = newX; }
      };

      obj.x = 'the new X';
      assert.equal(theX, 'the new X');
    });
    it('must have exactly one parameter', function () {
      let setterCalledWith = void 0;
      const obj = {
        set x(newValue) {
          if (arguments.length === 1) {
            setterCalledWith = arguments[0];
          }
        }
      };

      assert.equal(obj.x = 'new value', setterCalledWith);
    });
    it('can be a computed property (an expression enclosed in `[]`)', function () {
      const publicPropertyName = 'x';
      const privatePropertyName = '_' + publicPropertyName;
      const obj = {
        set [publicPropertyName](newValue) {
          this[privatePropertyName] = newValue
        }
      };

      obj.x = 'axe';
      assert.equal(obj._x, 'axe');
    });
  });

  describe('working with/on the setter', function () {

    it('you can use `delete` to remove the property (including it`s setter)', function () {
      let setterCalled = false;
      const obj = {
        set x(param) { setterCalled = true; }
      };

      delete obj.x

      obj.x = true;
      assert.equal(setterCalled, false);
    });

  });

  // TODO
  // The following dont seem to work in the current transpiler version
  // but should be correct, as stated here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
  // It might be corrected later, new knowledge welcome.
  // it('must not overlap with a pure property', function() {
  //   const obj = {
  //     x: 1,
  //     set x(val) { return 'ax'; }
  //   };
  //   assert.equal(obj.x, 'ax');
  // });
  // it('multiple `set` for the same property are not allowed', function() {
  //   const obj = {
  //     x: 1,
  //     set x(v) { return 'ax'; },
  //     set x(v) { return 'ax1'; }
  //   };
  //   assert.equal(obj.x, 'ax');
  // });
});



////////////////////////////////////////////////////////////////////////



//Rest operators as parameter
describe('rest in function params', () => {

  it('must be the last parameter', () => {
    const fn = (...rest) => {
      assert.deepEqual([1, 2], rest);
    };
    fn(1, 2);
  });

  it('can be used to get all other parameters', () => {
    const fn = (firstParam, secondParam, ...rest) => {
      assert.deepEqual([3, 4], rest);
    };
    fn(null, 2, 3, 4);
  });

  it('makes `arguments` obsolete', () => {
    const fn = (args, ...rest) => {
      assert.deepEqual([42, 'twenty three', 'win'], args);
    };
    fn([42, 'twenty three', 'win']);
  });

  it('eliminate `arguments`!!!', () => {
    const fn = (...args) => args;
    const [firstArg, ...rest] = fn(1, 2, 3);
    assert.deepEqual([2, 3], rest);
  });

});

//Rest operators with destructuring
describe('rest with destructuring', () => {

  it('rest parameter must be last', () => {
    const [...all] = [1, 2, 3, 4];
    assert.deepEqual(all, [1, 2, 3, 4]);
  });

  it('assign rest of an array to a variable', () => {
    const [, ...all] = [1, 2, 3, 4];
    assert.deepEqual(all, [2, 3, 4]);
  });

  // the following are actually using `spread` ... oops, to be fixed
  it('concat differently', () => {
    const theEnd = [3, 4];
    const allInOne = [1, 2, ...theEnd];
    assert.deepEqual(allInOne, [1, 2, 3, 4]);
  });

  it('`apply` made simple, even for constructors', () => {
    const theDate = [2015, 1, 1];
    const date = new Date(...theDate);
    assert.deepEqual(new Date(2015, 1, 1), date);
  });

});



//////////////////////////////////////////////////////////////////////////////



//Spread with arrays
describe('spread with arrays', () => {

  it('extracts each array item', function () {
    const [a, b] = [...[1, 2]];
    assert.equal(a, 1);
    assert.equal(b, 2);
  });

  it('in combination with rest', function () {
    const [, a, b, ...rest] = [...[0, 1, 2, 3, 4, 5]];
    assert.equal(a, 1);
    assert.equal(b, 2);
    assert.deepEqual(rest, [3, 4, 5]);
  });

  it('spreading into the rest', function () {
    const [...rest] = [...[1, 2, 3, 4, 5]];
    assert.deepEqual(rest, [1, 2, 3, 4, 5]);
  });

  describe('used as function parameter', () => {
    it('prefix with `...` to spread as function params', function () {
      const magicNumbers = [1, 2];
      const fn = (magicA, magicB) => {
        assert.deepEqual(magicNumbers[0], magicA);
        assert.deepEqual(magicNumbers[1], magicB);
      };
      fn(...magicNumbers);
    });

    it('pass an array of numbers to Math.max()', function () {
      const max = Math.max(...[23, 0, 42, 42]);
      assert.equal(max, 42);
    });
  });
});

//Spread with strings
describe('spread with strings', () => {

  it('simply spread each char of a string', function () {
    const [a, b] = [...'ab'];
    assert.equal(a, 'a');
    assert.equal(b, 'b');
  });

  it('extracts each array item', function () {
    const [a, b] = [...'12'];
    assert.equal(a, 1);
    assert.equal(b, 2);
  });

  it('works anywhere inside an array (must not be last)', function () {
    const letters = ['a', ...'bcd', 'e', 'f'];
    assert.equal(letters.length, 6);
  });

  it('dont confuse with the rest operator', function () {
    const [...rest] = [...'1234', ...'5'];
    assert.deepEqual(rest, [1, 2, 3, 4, 5]);
  });

  it('passed as function parameter', function () {
    const max = Math.max(...'12345');
    assert.deepEqual(max, 5);
  });

});



//////////////////////////////////////////////////////////////////////////////



//Number isInteger
describe('`Number.isInteger()` determines if a value is an integer', function () {

  const isTrue = (what) => assert.equal(what, true);
  const isFalse = (what) => assert.equal(what, false);

  it('`isInteger` is a static function on `Number`', function () {
    const whatType = 'function';
    assert.equal(typeof Number.isInteger, whatType);
  });

  describe('zero in different ways', function () {
    it('0 is an integer', function () {
      const zero = 0;
      isTrue(Number.isInteger(zero));
    });
    it('0.000', function () {
      isTrue(Number.isInteger(0.000));
    });
    it('the string "0" is NOT an integer', function () {
      const stringZero = '0';
      isFalse(Number.isInteger(stringZero));
    });
  });

  describe('one in different ways', function () {
    it('0.111 + 0.889', function () {
      const rest = 0.889;
      isTrue(Number.isInteger(0.111 + rest));
    });
    it('0.5 + 0.2 + 0.2 + 0.1 = 1 ... isn`t it?', function () {
      const oneOrNot = 0.5 + 0.2 + 0.2 + 0.1;
      isFalse(Number.isInteger(oneOrNot));
    });
    it('parseInt`ed "1" is an integer', function () {
      const convertedToInt = parseInt('1.01');
      isTrue(Number.isInteger(convertedToInt));
    });
  });

  describe('what is not an integer', function () {
    it('`Number()` is an integer', function () {
      const numberOne = Number();
      isTrue(Number.isInteger(numberOne));
    });
    it('`{}` is NOT an integer', function () {
      const isit = Number.isInteger({});
      isFalse(isit);
    });
    it('`0.1` is not an integer', function () {
      const isit = Number.isInteger(0.1);
      isFalse(isit);
    });
    it('`Number.Infinity` is not an integer', function () {
      const isit = Number.isInteger(Number.Infinity);
      isFalse(isit);
    });
    it('`NaN` is not an integer', function () {
      const isit = Number.isInteger(NaN);
      isFalse(isit);
    });
  });

});



/////////////////////////////////////////////////////////////////////////////////



//Object.is()
describe('`Object.is()` determines whether two values are the same', function () {

  describe('scalar values', function () {
    it('1 is the same as 1', function () {
      const areSame = Object.is(1, 1);
      assert.equal(areSame, true);
    });
    it('int 1 is different to string "1"', function () {
      const areSame = Object.is(1, '1');
      assert.equal(areSame, false);
    });
    it('strings just have to match', function () {
      const areSame = Object.is('one', 'one');
      assert.equal(areSame, true);
    });
    it('+0 is not the same as -0', function () {
      const areSame = false;
      assert.equal(Object.is(+0, -0), areSame);
    });
    it('NaN is the same as NaN', function () {
      const number = NaN;
      assert.equal(Object.is(NaN, number), true);
    });
  });

  describe('coercion, as in `==` and `===`, does NOT apply', function () {
    it('+0 != -0', function () {
      const coerced = +0 !== -0;
      const isSame = Object.is(+0, -0);
      assert.equal(isSame, coerced);
    });
    it('empty string and `false` are not the same', function () {
      const emptyString = '';
      const isSame = !Object.is(emptyString, false);
      assert.equal(isSame, emptyString == false);
    });
    it('NaN', function () {
      const coerced = NaN !== NaN;
      const isSame = Object.is(NaN, NaN);
      assert.equal(isSame, coerced);
    });
    it('NaN 0/0', function () {
      const isSame = Object.is(NaN, 0 / 0);
      assert.equal(isSame, true);
    });
  });

  describe('complex values', function () {
    it('`{}` is just not the same as `{}`', function () {
      const areSame = false;
      assert.equal(Object.is({}, {}), areSame);
    });
    it('Map', function () {
      let map1 = new Map([[1, 'one']]);
      let map2 = new Map([[1, 'one']]);
      const areSame = Object.is(map1, map2);
      assert.equal(areSame, false);
    });
  });

});



///////////////////////////////////////////////////////////////////////////



//Destructuring arrays
describe('destructuring arrays makes shorter code', () => {

  it('extract value from array, e.g. extract 0 into x like so `let [x] = [0];`', () => {
    let [firstValue] = [1];
    assert.strictEqual(firstValue, 1);
  });

  it('swap two variables, in one operation', () => {
    let [x, y] = ['ax', 'why'];
    [x, y] = [y, x];
    assert.deepEqual([x, y], ['why', 'ax']);
  });

  it('leading commas', () => {
    const all = ['ax', 'why', 'zet'];
    const [, , z] = all;
    assert.equal(z, 'zet');
  });

  it('extract from nested arrays', () => {
    const user = [['Some', 'One'], 23];
    const [[firstName, surname], age] = user;

    const expected = 'Some One = 23 years';
    assert.equal(`${firstName} ${surname} = ${age} years`, expected);
  });

  it('chained assignments', () => {
    let c, d;
    let [a, b] = [c, d] = [1, 2];
    assert.deepEqual([a, b, c, d], [1, 2, 1, 2]);
  });

  it('in for-of loop', () => {
    for (var [, a, b] of [[0, 1, 2]]) { }
    assert.deepEqual([a, b], [1, 2]);
  });

});

//Destructuring string
describe('destructuring also works on strings', () => {


  it('destructure every character', () => {
    let [a, b, c] = 'abc';
    assert.deepEqual([a, b, c], ['a', 'b', 'c']);
  });

  it('missing characters are undefined', () => {
    const [a, c] = 'a';
    assert.equal(c, void 0);
  });

  it('unicode character work too', () => {
    const [space, coffee] = 'a☕';
    assert.equal(coffee, '\u{2615}');
  });

});

//Destructuring object
describe('destructuring objects', () => {

  it('is simple', () => {
    const { x } = { x: 1 };
    assert.equal(x, 1);
  });

  describe('nested', () => {
    it('multiple objects', () => {
      const magic = { first: 23, second: 42 };
      const { magic: { second } } = { magic };
      assert.equal(second, 42);
    });
    it('object and array', () => {
      const { z: [, x] } = { z: [23, 42] };
      assert.equal(x, 42);
    });
    it('array and object', () => {
      const [, [{ lang }]] = [null, [{ env: 'browser', lang: 'ES6' }]];
      assert.equal(lang, 'ES6');
    });
  });

  describe('interesting', () => {
    it('missing refs become undefined', () => {
      const { z } = { x: 1, y: 2 };
      assert.equal(z, void 0);
    });

    it('destructure from builtins (string)', () => {
      const { substr } = '1'; //String(1)
      assert.equal(substr, String.prototype.substr);
    });
  });

});

//Destructuring defaults
describe('destructuring can also have default values', () => {

  it('for an empty array', () => {
    const [a = 1] = [];
    assert.equal(a, 1);
  });

  it('for a missing value', () => {
    const [, b = 2] = [1, , 3];
    assert.equal(b, 2);
  });

  it('in an object', () => {
    const { a, b = 2 } = { a: 1 };
    assert.equal(b, 2);
  });

  it('if the value is undefined', () => {
    const { a, b = 2 } = { a: 1, b: void 0 };
    assert.strictEqual(b, 2);
  });

  it('also a string works with defaults', () => {
    const [a, b = 2] = '1';
    assert.equal(a, '1');
    assert.equal(b, 2);
  });

});

//Destructuring parameters
describe('destructuring function parameters', () => {

  describe('destruct parameters', () => {
    it('multiple params from object', () => {
      const fn = ({ name, id }) => {
        assert.equal(id, 42);
        assert.equal(name, 'Wolfram');
      };
      const user = { name: 'Wolfram', id: 42 };
      fn(user);
    });

    it('multiple params from array/object', () => {
      const fn = ([{ name }]) => {
        assert.equal(name, 'Alice');
      };
      const users = [{ name: 'Alice', id: 42 }, { name: 'nobody' }];
      fn(users);
    });
  });

  describe('default values', () => {
    it('for simple values', () => {
      const fn = (id, name = 'Bob') => {
        assert.strictEqual(id, 23);
        assert.strictEqual(name, 'Bob');
      };
      fn(23);
    });

    it('for a missing array value', () => {
      const defaultUser = { id: 23, name: 'Joe' };
      const fn = ([user]) => {
        assert.deepEqual(user, defaultUser);
      };
      fn([defaultUser]);
    });

    it('mix of parameter types', () => {
      const fn = (id = 1, [arr = 2], { obj = 3 }) => {
        assert.equal(id, 1);
        assert.equal(arr, 2);
        assert.equal(obj, 3);
      };
      fn(void 0, [], {});
    });
  });

});

//Destructuring assign
describe('assign object property values to new variables while destructuring', () => {

  describe('for simple objects', function () {
    it('use a colon after the property name, like so `propertyName: newName`', () => {
      const { x: y } = { x: 1 };
      assert.equal(y, 1);
    });

    it('assign a new name and give it a default value using `= <default value>`', () => {
      const { x: y = 42 } = { y: 23 };
      assert.equal(y, 42);
    });
  });

  describe('for function parameter names', function () {
    it('do it the same way, with a colon behind it', () => {
      const fn = ({ x: y }) => {
        assert.equal(y, 1);
      };
      fn({ x: 1 });
    });

    it('giving it a default value is possible too, like above', () => {
      const fn = ({ x: y = 3 }) => {
        assert.equal(y, 3);
      };
      fn({ x: 3 });
    });
  });

});



//////////////////////////////////////////////////////////////////////////////



//Array.find()
describe('`Array.prototype.find` makes finding items in arrays easier', () => {

  it('takes a compare function', function () {
    const found = [false, true].find((check) => check == true);

    assert.equal(found, true);
  });

  it('returns the first value found', function () {
    const found = [0, 2, 1].find(item => item > 1);

    assert.equal(found, 2);
  });

  it('returns `undefined` when nothing was found', function () {
    const found = [1, 3].find(item => item === 2);

    assert.equal(found, void 0);
  });

  it('combined with destructuring complex compares become short', function () {
    const bob = { name: 'Bob' };
    const alice = { name: 'Alice' };
    const found = [bob, alice].find(({ name }) => name === 'Alice');

    assert.equal(found, alice);
  });

});




///////////////////////////////////////////////////////////////////



//Promise Basics
describe('a Promise represents an operation that hasn`t completed yet, but is expected in the future', function () {

  it('`Promise` is a global function', function () {
    const expectedType = 'function';
    assert.equal(typeof Promise, expectedType);
  });

  describe('the constructor', function () {

    it('instantiating it without params throws', function () {
      const fn = () => new Promise
      assert.throws(fn);
    });

    it('expects a function as parameter', function () {
      const param = function () { };
      assert.doesNotThrow(() => { new Promise(param); });
    });

  });

  describe('simplest promises', function () {

    it('resolve a promise by calling the `resolve` function given as first parameter', function (done) {
      let promise = new Promise((resolve) => {
        resolve();

      });

      promise
        .then(() => done())
        .catch(() => done(new Error('The promise is expected to resolve.')));
    });

    it('the `resolve` function can return a value, that is consumed by the `promise.then()` callback', function (done) {
      let promise = new Promise((resolve) => {
        resolve(42);
      });

      promise
        .then(value => { assert.equal(value, 42); done(); })
        .catch(() => done(new Error('The promise is expected to resolve with 42!')));
    });

    it('rejecting a promise is done by calling the callback given as 2nd parameter', function (done) {
      let promise = new Promise(() => {
        reject();
      });

      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });

  });

  describe('an asynchronous promise', function () {

    it('can resolve later, also by calling the first callback', function (done) {
      let promise = new Promise((resolve) => {
        setTimeout(() => resolve(), 100);
      });

      promise
        .then(() => done())
        .catch(() => done(new Error('The promise is expected to resolve.')));
    });

    it('reject it at some later point in time, calling the 2nd callback', function (done) {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => reject(), 100);
      });

      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });

  });

  describe('test library (mocha here) support for promises', function () {

    it('just returning the promise makes the test library check that the promise resolves', function () {
      let promise = new Promise((resolve) => {
        return resolve();
      });

      // return the promise to mocha, it has the checking for promise resolving built in, when it receives a promise
      return promise;
    });

  });
});


//Promise API
describe('`Promise` API overview', function () {

  it('`new Promise()` requires a function as param', () => {
    const param = function () { };
    assert.doesNotThrow(() => { new Promise(param); });
  });

  describe('resolving a promise', () => {
    // reminder: the test passes when a fulfilled promise is returned
    it('via constructor parameter `new Promise((resolve) => { resolve(); })`', () => {
      const param = (resolve) => { resolve(); };
      return new Promise(param);
    });
    it('using `Promise.resolve()`', () => {
      return Promise.resolve('all fine');
    });
  });

  describe('a rejected promise', () => {
    it('using the constructor parameter', (done) => {
      const promise = new Promise((resolve, reject) => { reject(); });
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });
    it('via `Promise.reject()`', (done) => {
      const promise = Promise.reject();
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });
  });

  const resolvingPromise = Promise.resolve();
  const rejectingPromise = Promise.reject();

  describe('`Promise.all()`', () => {
    it('`Promise.all([p1, p2])` resolves when all promises resolve', () =>
      Promise.all([resolvingPromise, resolvingPromise])
    );
    it('`Promise.all([p1, p2])` rejects when a promise is rejected', (done) => {
      Promise.all([resolvingPromise, rejectingPromise])
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done())
    });
  });

  describe('`Promise.race()`', () => {
    it('`Promise.race([p1, p2])` resolves when one of the promises resolves', () =>
      Promise.race([resolvingPromise, rejectingPromise])
    );
    it('`Promise.race([p1, p2])` rejects when one of the promises rejects', (done) => {
      Promise.race([rejectingPromise, resolvingPromise])
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done())
    });
    it('`Promise.race([p1, p2])` order matters (and timing)', () =>
      Promise.race([resolvingPromise, rejectingPromise])
    );
  });

});




/////////7////////////////////////////////////////////////////////////////////////////////////////



//Class Creation
describe('class creation', () => {

  it('is as simple as `class XXX {}`', function () {
    class TestClass { };

    const instance = new TestClass();
    assert.equal(typeof instance, 'object');
  });

  it('class is block scoped', () => {
    //class Inside {}
    { class Inside { } }
    assert.equal(typeof Inside, 'undefined');
  });

  it('special method is `constructor`', function () {
    class User {
      constructor(id) {
        this.id = id
      }
    }

    const user = new User(42);
    assert.equal(user.id, 42);
  });

  it('defining a method is simple', function () {
    class User {
      writesTests() { return false }
    }

    const notATester = new User();
    assert.equal(notATester.writesTests(), false);
  });

  it('multiple methods need no commas (opposed to object notation)', function () {
    class User {
      wroteATest() { this.everWroteATest = true; }
      isLazy() { return !this.everWroteATest }
    }

    const tester = new User();
    assert.equal(tester.isLazy(), true);
    tester.wroteATest();
    assert.equal(tester.isLazy(), false);
  });

  it('anonymous class', () => {
    const classType = typeof class { };
    assert.equal(classType, 'function');
  });

});

//Class Accessors
describe('class accessors (getter and setter)', () => {

  it('only a getter is defined like a method prefixed with `get`', () => {
    class MyAccount {
      get balance() { return Infinity; }
    }

    assert.equal(new MyAccount().balance, Infinity);
  });

  it('a setter has the prefix `set`', () => {
    class MyAccount {
      get balance() { return this.amount; }
      set balance(amount) { this.amount = amount; }
    }

    const account = new MyAccount();
    account.balance = 23;
    assert.equal(account.balance, 23);
  });

  describe('dynamic accessors', () => {

    it('a dynamic getter name is enclosed in [ and ]', function () {
      const balance = 'yourMoney';
      class YourAccount {
        get [balance]() { return -Infinity; }
      }

      assert.equal(new YourAccount().yourMoney, -Infinity);
    });

    it('a dynamic setter name as well', function () {
      const propertyName = 'balance';
      class MyAccount {
        get [propertyName]() { return this.amount; }
        set [propertyName](amount) { this.amount = amount; }
      }

      const account = new MyAccount();
      account.balance = 23;
      assert.equal(account.balance, 23);
    });
  });

});

//Class Extends 
describe('classes can inherit from another', () => {

  describe('the default super class is Object', () => {

    it('class A is an instance of Object', () => {
      class A extends Object { };

      assert.equal(new A() instanceof Object, true);
    });

    it('B extends A, B is also instance of Object', () => {
      class A extends Object { };
      class B extends A { }

      assert.equal(new B() instanceof A, true);
      assert.equal(new B() instanceof Object, true);
    });

    it('class can extend `null`, not an instance of Object', () => {
      class NullClass extends null { }

      let nullInstance = new NullClass();
      assert.equal(nullInstance instanceof Object, false);
    });

  });

  describe('instance of', () => {
    it('when B inherits from A, `new B()` is also an instance of A', () => {
      class A { };
      class B extends A { }

      assert.equal(new B() instanceof A, true);
    });

    it('extend over multiple levels', () => {
      class A extends Object { }
      class B extends A { }
      class C extends B { }

      let instance = new C;
      assert.equal(instance instanceof A, true);
    });
  });
});

//Class more extends
describe('class can inherit from another', () => {

  it('extend an `old style` "class", a function, still works', () => {
    function A() { };
    class B extends A { }

    assert.equal(new B() instanceof A, true);
  });

  describe('prototypes are as you know them', () => {
    class A { }
    class B extends A { }
    it('A is the prototype of B', () => {
      const isIt = A.isPrototypeOf(B);
      assert.equal(isIt, true);
    });
    it('A`s prototype is also B`s prototype', () => {
      const proto = B.prototype;
      // Remember: don't touch the assert!!! :)
      assert.equal(A.prototype.isPrototypeOf(proto), true);
    });
  });

  describe('`extends` using an expression', () => {
    it('eg the inline assignment of the parent class', () => {
      let A = class A { };
      class B extends (A) { }

      assert.equal(new B() instanceof A, true);
    });

    it('or calling a function that returns the parent class', () => {
      const returnParent = (beNull) => beNull ? class A { } : null;
      class B extends (returnParent(null)) { }

      assert.equal(Object.getPrototypeOf(B.prototype), null);
    });
  });

});