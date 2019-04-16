(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin', 'kotlinClientServerCalculator', 'kotlin-test'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'), require('kotlinClientServerCalculator'), require('kotlin-test'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'kotlinClientServerCalculator_test'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'kotlinClientServerCalculator_test'.");
    }
    if (typeof kotlinClientServerCalculator === 'undefined') {
      throw new Error("Error loading module 'kotlinClientServerCalculator_test'. Its dependency 'kotlinClientServerCalculator' was not found. Please, check whether 'kotlinClientServerCalculator' is loaded prior to 'kotlinClientServerCalculator_test'.");
    }
    if (typeof this['kotlin-test'] === 'undefined') {
      throw new Error("Error loading module 'kotlinClientServerCalculator_test'. Its dependency 'kotlin-test' was not found. Please, check whether 'kotlin-test' is loaded prior to 'kotlinClientServerCalculator_test'.");
    }
    root.kotlinClientServerCalculator_test = factory(typeof kotlinClientServerCalculator_test === 'undefined' ? {} : kotlinClientServerCalculator_test, kotlin, kotlinClientServerCalculator, this['kotlin-test']);
  }
}(this, function (_, Kotlin, $module$kotlinClientServerCalculator, $module$kotlin_test) {
  'use strict';
  var Sample = $module$kotlinClientServerCalculator.sample.Sample;
  var assertTrue = $module$kotlin_test.kotlin.test.assertTrue_ifx8ge$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var hello = $module$kotlinClientServerCalculator.sample.hello;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var test = $module$kotlin_test.kotlin.test.test;
  var suite = $module$kotlin_test.kotlin.test.suite;
  function SampleTests() {
  }
  SampleTests.prototype.testMe = function () {
    assertTrue((new Sample()).checkMe() > 0);
  };
  SampleTests.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SampleTests',
    interfaces: []
  };
  function SampleTestsJS() {
  }
  SampleTestsJS.prototype.testHello = function () {
    assertTrue(contains(hello(), 'JS'));
  };
  SampleTestsJS.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SampleTestsJS',
    interfaces: []
  };
  var package$sample = _.sample || (_.sample = {});
  package$sample.SampleTests = SampleTests;
  package$sample.SampleTestsJS = SampleTestsJS;
  suite('sample', false, function () {
    suite('SampleTests', false, function () {
      test('testMe', false, function () {
        return (new SampleTests()).testMe();
      });
    });
    suite('SampleTestsJS', false, function () {
      test('testHello', false, function () {
        return (new SampleTestsJS()).testHello();
      });
    });
  });
  Kotlin.defineModule('kotlinClientServerCalculator_test', _);
  return _;
}));

//# sourceMappingURL=kotlinClientServerCalculator_test.js.map
