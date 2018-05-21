//http://es6katas.org/  https://gist.github.com/hanmd82
//Template strings basic

describe('a template string, is wrapped in ` (backticks) instead of \' or "', function () {

  describe('by default, behaves like a normal string', function () {

    it('just surrounded by backticks', function () {
      var str = `like a string`;
      expect(str).toEqual('like a string');
    });

  });

  var x = 42;
  var y = 23;

  describe('can evaluate variables, which are wrapped in "${" and "}"', function () {

    it('e.g. a simple variable "${x}" just gets evaluated', function () {
      var evaluated = `x=${x}`;
      expect(evaluated).toEqual('x=' + x);
    });

    it('multiple variables get evaluated too', function () {
      var evaluated = `${x}+${y}`;
      expect(evaluated).toEqual(x + '+' + y);
    });

  });

  describe('can evaluate any expression, wrapped inside "${...}"', function () {

    it('all inside "${...}" gets evaluated', function () {
      var evaluated = parseInt(`${x + y}`);
      expect(evaluated).toEqual(x + y);
    });

    it('inside "${...}" can also be a function call', function () {
      function getDomain() {
        return 'jest';
      }
      var evaluated = `${getDomain()}`;
      expect(evaluated).toEqual('jest');
    });
  });
});

//Template strings multiline 
describe('template string, can contain multiline content', function () {

  it('a normal string can`t span across multiple lines', function () {
    var normalString = 'line1\n' + 'line2';
    expect(normalString).toEqual('line1\nline2');
  });

  it('wrapped in backticks it can span over multiple lines', function () {
    var templateString = `line1\nline2`;
    expect(templateString).toEqual('line1\nline2');
  });

  it('even over more than two lines', function () {
    var multiline = `line 1\nline 2\nline 3\n`;
    expect(multiline.split('\n').length).toEqual(4);
  });

  describe('and expressions inside work too', function () {

    var x = 42;

    it('like simple variables', function () {
      var multiline = `line 1\n          ${x}`;
      expect(multiline).toEqual('line 1\n          42');
    });

    it('also here spaces matter', function () {
      var multiline = `\n${x}`;
      expect(multiline).toEqual('\n42');
    });
  });
});

//Template strings tagged
describe('tagged template strings, are an advanced form of template strings', function () {

  it('syntax: prefix the template string with a function to call (without "()" around it)', function () {
    function tagFunction(s) {
      return s.toString();
    }
    var evaluated = tagFunction`template string`;
    assert.equal(evaluated, 'template string');
  });

  describe('the function can access each part of the template', function () {

    describe('the 1st parameter - receives only the pure strings of the template string', function () {

      function tagFunction(strings) {
        return strings;
      }

      it('the strings are an array', function () {
        var result = ['template string'];
        assert.deepEqual(tagFunction`template string`, result);
      });

      it('expressions are NOT passed to it', function () {
        var tagged = tagFunction`one${23}two`;
        assert.deepEqual(tagged, ['one', 'two']);
      });

    });

    describe('the 2nd and following parameters - contain the values of the processed substitution', function () {

      var one = 1;
      var two = 2;
      var three = 3;
      it('the 2nd parameter contains the first expression`s value', function () {
        function firstValueOnly(strings, first_value) {
          return first_value;
        }
        assert.equal(firstValueOnly`uno ${one}, dos ${two}`, 1);
      });

      it('the 3rd parameter contains the second expression`s value', function () {
        function firstValueOnly(strings, firstValue, secondValue) {
          return secondValue;
        }
        assert.equal(firstValueOnly`uno ${one}, dos ${two}`, 2);
      });

      it('using ES6 rest syntax, all values can be accessed via one variable', function () {
        function valuesOnly(stringsArray, ...allValues) { // using the new ES6 rest syntax
          return allValues;
        }
        assert.deepEqual(valuesOnly`uno=${one}, dos=${two}, tres=${three}`, [1, 2, 3]);
      });

    });
  });

});

//Template strings String.raw
describe('on tagged template strings you can use the `raw` property like so `s.raw`', function () {

  it('the `raw` property accesses the string as it was entered', function () {
    function firstChar(strings) {
      return strings.raw;
    }
    assert.equal(firstChar`\n`, '\\n');
  });

  it('`raw` can access the backslash of a line-break', function () {
    function firstCharEntered(strings) {
      var lineBreak = strings.raw.toString()[0];
      return lineBreak;
    }
    assert.equal(firstCharEntered`\n`, '\\');
  });

  describe('`String.raw` as a static function', function () {

    it('concats the raw strings', function () {
      var expected = '\\n';
      assert.equal(String.raw`\n`, expected);
    });

    it('two raw-templates-string-backslashes equal two escaped backslashes', function () {
      const TWO_BACKSLASHES = '\\\\';
      assert.equal(String.raw`\\`, TWO_BACKSLASHES);
    });

    it('works on unicodes too', function () {
      var smilie = '\\u{1F600}';
      var actual = String.raw`\u{1F600}`;
      assert.equal(actual, smilie);
    });

  });
});


//////////////////////////////////////////////////////////////////////////////////////////////////


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
    const fn = (...args) => {
      assert.deepEqual([42, 'twenty three', 'win'], args);
    };
    fn(42, 'twenty three', 'win');
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