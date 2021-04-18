'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117,
    x = b ? Symbol.for("react.responder") : 60118,
    y = b ? Symbol.for("react.scope") : 60119;

function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;

              default:
                return u;
            }

        }

      case d:
        return u;
    }
  }
}

function A(a) {
  return z(a) === m;
}

var AsyncMode = l;
var ConcurrentMode = m;
var ContextConsumer = k;
var ContextProvider = h;
var Element = c;
var ForwardRef = n;
var Fragment = e;
var Lazy = t;
var Memo = r;
var Portal = d;
var Profiler = g;
var StrictMode = f;
var Suspense = p;

var isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};

var isConcurrentMode = A;

var isContextConsumer = function (a) {
  return z(a) === k;
};

var isContextProvider = function (a) {
  return z(a) === h;
};

var isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};

var isForwardRef = function (a) {
  return z(a) === n;
};

var isFragment = function (a) {
  return z(a) === e;
};

var isLazy = function (a) {
  return z(a) === t;
};

var isMemo = function (a) {
  return z(a) === r;
};

var isPortal = function (a) {
  return z(a) === d;
};

var isProfiler = function (a) {
  return z(a) === g;
};

var isStrictMode = function (a) {
  return z(a) === f;
};

var isSuspense = function (a) {
  return z(a) === p;
};

var isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};

var typeOf = z;
var reactIs_production_min = {
  AsyncMode: AsyncMode,
  ConcurrentMode: ConcurrentMode,
  ContextConsumer: ContextConsumer,
  ContextProvider: ContextProvider,
  Element: Element,
  ForwardRef: ForwardRef,
  Fragment: Fragment,
  Lazy: Lazy,
  Memo: Memo,
  Portal: Portal,
  Profiler: Profiler,
  StrictMode: StrictMode,
  Suspense: Suspense,
  isAsyncMode: isAsyncMode,
  isConcurrentMode: isConcurrentMode,
  isContextConsumer: isContextConsumer,
  isContextProvider: isContextProvider,
  isElement: isElement,
  isForwardRef: isForwardRef,
  isFragment: isFragment,
  isLazy: isLazy,
  isMemo: isMemo,
  isPortal: isPortal,
  isProfiler: isProfiler,
  isStrictMode: isStrictMode,
  isSuspense: isSuspense,
  isValidElementType: isValidElementType,
  typeOf: typeOf
};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var reactIs_development = createCommonjsModule(function (module, exports) {

  if (process.env.NODE_ENV !== "production") {
    (function () {
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }

      function typeOf(object) {
        if (typeof object === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }

              }

            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode


      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

            console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }

      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }

      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }

      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }

      function isElement(object) {
        return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }

      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }

      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }

      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }

      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }

      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }

      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }

      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
      exports.isValidElementType = isValidElementType;
      exports.typeOf = typeOf;
    })();
  }
});

var reactIs = createCommonjsModule(function (module) {

  if (process.env.NODE_ENV === 'production') {
    module.exports = reactIs_production_min;
  } else {
    module.exports = reactIs_development;
  }
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var printWarning = function () {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning$1 = function () {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning$1('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning$1('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has$1(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning$1('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (!checker) {
          continue;
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = objectAssign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = typeof propValue;

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var propTypes = createCommonjsModule(function (module) {
  if (process.env.NODE_ENV !== 'production') {
    var ReactIs = reactIs; // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod

    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  } else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = factoryWithThrowingShims();
  }
});

var typable_cjs = createCommonjsModule(function (module) {

  function t(t) {
    return t && "object" == typeof t && "default" in t ? t : {
      default: t
    };
  }

  var r = t(propTypes),
      e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : {};

  function n(t) {
    var r = {
      exports: {}
    };
    return t(r, r.exports), r.exports;
  }

  var o = "object" == typeof e && e && e.Object === Object && e,
      a = "object" == typeof self && self && self.Object === Object && self,
      u = o || a || Function("return this")(),
      i = u.Symbol,
      c = Object.prototype,
      f = c.hasOwnProperty,
      s = c.toString,
      p = i ? i.toStringTag : void 0;

  var l = function (t) {
    var r = f.call(t, p),
        e = t[p];

    try {
      t[p] = void 0;
      var n = !0;
    } catch (t) {}

    var o = s.call(t);
    return n && (r ? t[p] = e : delete t[p]), o;
  },
      v = Object.prototype.toString;

  var y = function (t) {
    return v.call(t);
  },
      h = i ? i.toStringTag : void 0;

  var b = function (t) {
    return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : h && h in Object(t) ? l(t) : y(t);
  };

  var d = function (t) {
    var r = typeof t;
    return null != t && ("object" == r || "function" == r);
  };

  var _,
      j = function (t) {
    if (!d(t)) return !1;
    var r = b(t);
    return "[object Function]" == r || "[object GeneratorFunction]" == r || "[object AsyncFunction]" == r || "[object Proxy]" == r;
  },
      g = u["__core-js_shared__"],
      O = (_ = /[^.]+$/.exec(g && g.keys && g.keys.IE_PROTO || "")) ? "Symbol(src)_1." + _ : "";

  var m = function (t) {
    return !!O && O in t;
  },
      w = Function.prototype.toString;

  var A = function (t) {
    if (null != t) {
      try {
        return w.call(t);
      } catch (t) {}

      try {
        return t + "";
      } catch (t) {}
    }

    return "";
  },
      z = /^\[object .+?Constructor\]$/,
      T = Function.prototype,
      k = Object.prototype,
      S = T.toString,
      P = k.hasOwnProperty,
      x = RegExp("^" + S.call(P).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

  var E = function (t) {
    return !(!d(t) || m(t)) && (j(t) ? x : z).test(A(t));
  };

  var $ = function (t, r) {
    return null == t ? void 0 : t[r];
  };

  var F = function (t, r) {
    var e = $(t, r);
    return E(e) ? e : void 0;
  },
      M = function () {
    try {
      var t = F(Object, "defineProperty");
      return t({}, "", {}), t;
    } catch (t) {}
  }();

  var I = function (t, r, e) {
    "__proto__" == r && M ? M(t, r, {
      configurable: !0,
      enumerable: !0,
      value: e,
      writable: !0
    }) : t[r] = e;
  };

  var B = function (t) {
    return function (r, e, n) {
      for (var o = -1, a = Object(r), u = n(r), i = u.length; i--;) {
        var c = u[t ? i : ++o];
        if (!1 === e(a[c], c, a)) break;
      }

      return r;
    };
  }();

  var D = function (t, r) {
    for (var e = -1, n = Array(t); ++e < t;) n[e] = r(e);

    return n;
  };

  var q = function (t) {
    return null != t && "object" == typeof t;
  };

  var R = function (t) {
    return q(t) && "[object Arguments]" == b(t);
  },
      U = Object.prototype,
      C = U.hasOwnProperty,
      L = U.propertyIsEnumerable,
      V = R(function () {
    return arguments;
  }()) ? R : function (t) {
    return q(t) && C.call(t, "callee") && !L.call(t, "callee");
  },
      W = Array.isArray;

  var N = function () {
    return !1;
  },
      G = n(function (t, r) {
    var e = r && !r.nodeType && r,
        n = e && t && !t.nodeType && t,
        o = n && n.exports === e ? u.Buffer : void 0,
        a = (o ? o.isBuffer : void 0) || N;
    t.exports = a;
  }),
      H = /^(?:0|[1-9]\d*)$/;

  var J = function (t, r) {
    var e = typeof t;
    return !!(r = null == r ? 9007199254740991 : r) && ("number" == e || "symbol" != e && H.test(t)) && t > -1 && t % 1 == 0 && t < r;
  };

  var K = function (t) {
    return "number" == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991;
  },
      Q = {};

  Q["[object Float32Array]"] = Q["[object Float64Array]"] = Q["[object Int8Array]"] = Q["[object Int16Array]"] = Q["[object Int32Array]"] = Q["[object Uint8Array]"] = Q["[object Uint8ClampedArray]"] = Q["[object Uint16Array]"] = Q["[object Uint32Array]"] = !0, Q["[object Arguments]"] = Q["[object Array]"] = Q["[object ArrayBuffer]"] = Q["[object Boolean]"] = Q["[object DataView]"] = Q["[object Date]"] = Q["[object Error]"] = Q["[object Function]"] = Q["[object Map]"] = Q["[object Number]"] = Q["[object Object]"] = Q["[object RegExp]"] = Q["[object Set]"] = Q["[object String]"] = Q["[object WeakMap]"] = !1;

  var X = function (t) {
    return q(t) && K(t.length) && !!Q[b(t)];
  };

  var Y = function (t) {
    return function (r) {
      return t(r);
    };
  },
      Z = n(function (t, r) {
    var e = r && !r.nodeType && r,
        n = e && t && !t.nodeType && t,
        a = n && n.exports === e && o.process,
        u = function () {
      try {
        var t = n && n.require && n.require("util").types;

        return t || a && a.binding && a.binding("util");
      } catch (t) {}
    }();

    t.exports = u;
  }),
      tt = Z && Z.isTypedArray,
      rt = tt ? Y(tt) : X,
      et = Object.prototype.hasOwnProperty;

  var nt = function (t, r) {
    var e = W(t),
        n = !e && V(t),
        o = !e && !n && G(t),
        a = !e && !n && !o && rt(t),
        u = e || n || o || a,
        i = u ? D(t.length, String) : [],
        c = i.length;

    for (var f in t) !r && !et.call(t, f) || u && ("length" == f || o && ("offset" == f || "parent" == f) || a && ("buffer" == f || "byteLength" == f || "byteOffset" == f) || J(f, c)) || i.push(f);

    return i;
  },
      ot = Object.prototype;

  var at = function (t) {
    var r = t && t.constructor;
    return t === ("function" == typeof r && r.prototype || ot);
  };

  var ut = function (t, r) {
    return function (e) {
      return t(r(e));
    };
  }(Object.keys, Object),
      it = Object.prototype.hasOwnProperty;

  var ct = function (t) {
    if (!at(t)) return ut(t);
    var r = [];

    for (var e in Object(t)) it.call(t, e) && "constructor" != e && r.push(e);

    return r;
  };

  var ft = function (t) {
    return null != t && K(t.length) && !j(t);
  };

  var st = function (t) {
    return ft(t) ? nt(t) : ct(t);
  };

  var pt = function (t, r) {
    return t && B(t, r, st);
  };

  var lt = function () {
    this.__data__ = [], this.size = 0;
  };

  var vt = function (t, r) {
    return t === r || t != t && r != r;
  };

  var yt = function (t, r) {
    for (var e = t.length; e--;) if (vt(t[e][0], r)) return e;

    return -1;
  },
      ht = Array.prototype.splice;

  var bt = function (t) {
    var r = this.__data__,
        e = yt(r, t);
    return !(e < 0) && (e == r.length - 1 ? r.pop() : ht.call(r, e, 1), --this.size, !0);
  };

  var dt = function (t) {
    var r = this.__data__,
        e = yt(r, t);
    return e < 0 ? void 0 : r[e][1];
  };

  var _t = function (t) {
    return yt(this.__data__, t) > -1;
  };

  var jt = function (t, r) {
    var e = this.__data__,
        n = yt(e, t);
    return n < 0 ? (++this.size, e.push([t, r])) : e[n][1] = r, this;
  };

  function gt(t) {
    var r = -1,
        e = null == t ? 0 : t.length;

    for (this.clear(); ++r < e;) {
      var n = t[r];
      this.set(n[0], n[1]);
    }
  }

  gt.prototype.clear = lt, gt.prototype.delete = bt, gt.prototype.get = dt, gt.prototype.has = _t, gt.prototype.set = jt;
  var Ot = gt;

  var mt = function () {
    this.__data__ = new Ot(), this.size = 0;
  };

  var wt = function (t) {
    var r = this.__data__,
        e = r.delete(t);
    return this.size = r.size, e;
  };

  var At = function (t) {
    return this.__data__.get(t);
  };

  var zt = function (t) {
    return this.__data__.has(t);
  },
      Tt = F(u, "Map"),
      kt = F(Object, "create");

  var St = function () {
    this.__data__ = kt ? kt(null) : {}, this.size = 0;
  };

  var Pt = function (t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  },
      xt = Object.prototype.hasOwnProperty;

  var Et = function (t) {
    var r = this.__data__;

    if (kt) {
      var e = r[t];
      return "__lodash_hash_undefined__" === e ? void 0 : e;
    }

    return xt.call(r, t) ? r[t] : void 0;
  },
      $t = Object.prototype.hasOwnProperty;

  var Ft = function (t) {
    var r = this.__data__;
    return kt ? void 0 !== r[t] : $t.call(r, t);
  };

  var Mt = function (t, r) {
    var e = this.__data__;
    return this.size += this.has(t) ? 0 : 1, e[t] = kt && void 0 === r ? "__lodash_hash_undefined__" : r, this;
  };

  function It(t) {
    var r = -1,
        e = null == t ? 0 : t.length;

    for (this.clear(); ++r < e;) {
      var n = t[r];
      this.set(n[0], n[1]);
    }
  }

  It.prototype.clear = St, It.prototype.delete = Pt, It.prototype.get = Et, It.prototype.has = Ft, It.prototype.set = Mt;
  var Bt = It;

  var Dt = function () {
    this.size = 0, this.__data__ = {
      hash: new Bt(),
      map: new (Tt || Ot)(),
      string: new Bt()
    };
  };

  var qt = function (t) {
    var r = typeof t;
    return "string" == r || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== t : null === t;
  };

  var Rt = function (t, r) {
    var e = t.__data__;
    return qt(r) ? e["string" == typeof r ? "string" : "hash"] : e.map;
  };

  var Ut = function (t) {
    var r = Rt(this, t).delete(t);
    return this.size -= r ? 1 : 0, r;
  };

  var Ct = function (t) {
    return Rt(this, t).get(t);
  };

  var Lt = function (t) {
    return Rt(this, t).has(t);
  };

  var Vt = function (t, r) {
    var e = Rt(this, t),
        n = e.size;
    return e.set(t, r), this.size += e.size == n ? 0 : 1, this;
  };

  function Wt(t) {
    var r = -1,
        e = null == t ? 0 : t.length;

    for (this.clear(); ++r < e;) {
      var n = t[r];
      this.set(n[0], n[1]);
    }
  }

  Wt.prototype.clear = Dt, Wt.prototype.delete = Ut, Wt.prototype.get = Ct, Wt.prototype.has = Lt, Wt.prototype.set = Vt;
  var Nt = Wt;

  var Gt = function (t, r) {
    var e = this.__data__;

    if (e instanceof Ot) {
      var n = e.__data__;
      if (!Tt || n.length < 199) return n.push([t, r]), this.size = ++e.size, this;
      e = this.__data__ = new Nt(n);
    }

    return e.set(t, r), this.size = e.size, this;
  };

  function Ht(t) {
    var r = this.__data__ = new Ot(t);
    this.size = r.size;
  }

  Ht.prototype.clear = mt, Ht.prototype.delete = wt, Ht.prototype.get = At, Ht.prototype.has = zt, Ht.prototype.set = Gt;
  var Jt = Ht;

  var Kt = function (t) {
    return this.__data__.set(t, "__lodash_hash_undefined__"), this;
  };

  var Qt = function (t) {
    return this.__data__.has(t);
  };

  function Xt(t) {
    var r = -1,
        e = null == t ? 0 : t.length;

    for (this.__data__ = new Nt(); ++r < e;) this.add(t[r]);
  }

  Xt.prototype.add = Xt.prototype.push = Kt, Xt.prototype.has = Qt;
  var Yt = Xt;

  var Zt = function (t, r) {
    for (var e = -1, n = null == t ? 0 : t.length; ++e < n;) if (r(t[e], e, t)) return !0;

    return !1;
  };

  var tr = function (t, r) {
    return t.has(r);
  };

  var rr = function (t, r, e, n, o, a) {
    var u = 1 & e,
        i = t.length,
        c = r.length;
    if (i != c && !(u && c > i)) return !1;
    var f = a.get(t),
        s = a.get(r);
    if (f && s) return f == r && s == t;
    var p = -1,
        l = !0,
        v = 2 & e ? new Yt() : void 0;

    for (a.set(t, r), a.set(r, t); ++p < i;) {
      var y = t[p],
          h = r[p];
      if (n) var b = u ? n(h, y, p, r, t, a) : n(y, h, p, t, r, a);

      if (void 0 !== b) {
        if (b) continue;
        l = !1;
        break;
      }

      if (v) {
        if (!Zt(r, function (t, r) {
          if (!tr(v, r) && (y === t || o(y, t, e, n, a))) return v.push(r);
        })) {
          l = !1;
          break;
        }
      } else if (y !== h && !o(y, h, e, n, a)) {
        l = !1;
        break;
      }
    }

    return a.delete(t), a.delete(r), l;
  },
      er = u.Uint8Array;

  var nr = function (t) {
    var r = -1,
        e = Array(t.size);
    return t.forEach(function (t, n) {
      e[++r] = [n, t];
    }), e;
  };

  var or = function (t) {
    var r = -1,
        e = Array(t.size);
    return t.forEach(function (t) {
      e[++r] = t;
    }), e;
  },
      ar = i ? i.prototype : void 0,
      ur = ar ? ar.valueOf : void 0;

  var ir = function (t, r, e, n, o, a, u) {
    switch (e) {
      case "[object DataView]":
        if (t.byteLength != r.byteLength || t.byteOffset != r.byteOffset) return !1;
        t = t.buffer, r = r.buffer;

      case "[object ArrayBuffer]":
        return !(t.byteLength != r.byteLength || !a(new er(t), new er(r)));

      case "[object Boolean]":
      case "[object Date]":
      case "[object Number]":
        return vt(+t, +r);

      case "[object Error]":
        return t.name == r.name && t.message == r.message;

      case "[object RegExp]":
      case "[object String]":
        return t == r + "";

      case "[object Map]":
        var i = nr;

      case "[object Set]":
        var c = 1 & n;
        if (i || (i = or), t.size != r.size && !c) return !1;
        var f = u.get(t);
        if (f) return f == r;
        n |= 2, u.set(t, r);
        var s = rr(i(t), i(r), n, o, a, u);
        return u.delete(t), s;

      case "[object Symbol]":
        if (ur) return ur.call(t) == ur.call(r);
    }

    return !1;
  };

  var cr = function (t, r) {
    for (var e = -1, n = r.length, o = t.length; ++e < n;) t[o + e] = r[e];

    return t;
  };

  var fr = function (t, r, e) {
    var n = r(t);
    return W(t) ? n : cr(n, e(t));
  };

  var sr = function (t, r) {
    for (var e = -1, n = null == t ? 0 : t.length, o = 0, a = []; ++e < n;) {
      var u = t[e];
      r(u, e, t) && (a[o++] = u);
    }

    return a;
  };

  var pr = function () {
    return [];
  },
      lr = Object.prototype.propertyIsEnumerable,
      vr = Object.getOwnPropertySymbols,
      yr = vr ? function (t) {
    return null == t ? [] : (t = Object(t), sr(vr(t), function (r) {
      return lr.call(t, r);
    }));
  } : pr;

  var hr = function (t) {
    return fr(t, st, yr);
  },
      br = Object.prototype.hasOwnProperty;

  var dr = function (t, r, e, n, o, a) {
    var u = 1 & e,
        i = hr(t),
        c = i.length;
    if (c != hr(r).length && !u) return !1;

    for (var f = c; f--;) {
      var s = i[f];
      if (!(u ? s in r : br.call(r, s))) return !1;
    }

    var p = a.get(t),
        l = a.get(r);
    if (p && l) return p == r && l == t;
    var v = !0;
    a.set(t, r), a.set(r, t);

    for (var y = u; ++f < c;) {
      var h = t[s = i[f]],
          b = r[s];
      if (n) var d = u ? n(b, h, s, r, t, a) : n(h, b, s, t, r, a);

      if (!(void 0 === d ? h === b || o(h, b, e, n, a) : d)) {
        v = !1;
        break;
      }

      y || (y = "constructor" == s);
    }

    if (v && !y) {
      var _ = t.constructor,
          j = r.constructor;
      _ == j || !("constructor" in t) || !("constructor" in r) || "function" == typeof _ && _ instanceof _ && "function" == typeof j && j instanceof j || (v = !1);
    }

    return a.delete(t), a.delete(r), v;
  },
      _r = F(u, "DataView"),
      jr = F(u, "Promise"),
      gr = F(u, "Set"),
      Or = F(u, "WeakMap"),
      mr = A(_r),
      wr = A(Tt),
      Ar = A(jr),
      zr = A(gr),
      Tr = A(Or),
      kr = b;

  (_r && "[object DataView]" != kr(new _r(new ArrayBuffer(1))) || Tt && "[object Map]" != kr(new Tt()) || jr && "[object Promise]" != kr(jr.resolve()) || gr && "[object Set]" != kr(new gr()) || Or && "[object WeakMap]" != kr(new Or())) && (kr = function (t) {
    var r = b(t),
        e = "[object Object]" == r ? t.constructor : void 0,
        n = e ? A(e) : "";
    if (n) switch (n) {
      case mr:
        return "[object DataView]";

      case wr:
        return "[object Map]";

      case Ar:
        return "[object Promise]";

      case zr:
        return "[object Set]";

      case Tr:
        return "[object WeakMap]";
    }
    return r;
  });
  var Sr = kr,
      Pr = "[object Object]",
      xr = Object.prototype.hasOwnProperty;

  var Er = function (t, r, e, n, o, a) {
    var u = W(t),
        i = W(r),
        c = u ? "[object Array]" : Sr(t),
        f = i ? "[object Array]" : Sr(r),
        s = (c = "[object Arguments]" == c ? Pr : c) == Pr,
        p = (f = "[object Arguments]" == f ? Pr : f) == Pr,
        l = c == f;

    if (l && G(t)) {
      if (!G(r)) return !1;
      u = !0, s = !1;
    }

    if (l && !s) return a || (a = new Jt()), u || rt(t) ? rr(t, r, e, n, o, a) : ir(t, r, c, e, n, o, a);

    if (!(1 & e)) {
      var v = s && xr.call(t, "__wrapped__"),
          y = p && xr.call(r, "__wrapped__");

      if (v || y) {
        var h = v ? t.value() : t,
            b = y ? r.value() : r;
        return a || (a = new Jt()), o(h, b, e, n, a);
      }
    }

    return !!l && (a || (a = new Jt()), dr(t, r, e, n, o, a));
  };

  var $r = function t(r, e, n, o, a) {
    return r === e || (null == r || null == e || !q(r) && !q(e) ? r != r && e != e : Er(r, e, n, o, t, a));
  };

  var Fr = function (t, r, e, n) {
    var o = e.length,
        a = o,
        u = !n;
    if (null == t) return !a;

    for (t = Object(t); o--;) {
      var i = e[o];
      if (u && i[2] ? i[1] !== t[i[0]] : !(i[0] in t)) return !1;
    }

    for (; ++o < a;) {
      var c = (i = e[o])[0],
          f = t[c],
          s = i[1];

      if (u && i[2]) {
        if (void 0 === f && !(c in t)) return !1;
      } else {
        var p = new Jt();
        if (n) var l = n(f, s, c, t, r, p);
        if (!(void 0 === l ? $r(s, f, 3, n, p) : l)) return !1;
      }
    }

    return !0;
  };

  var Mr = function (t) {
    return t == t && !d(t);
  };

  var Ir = function (t) {
    for (var r = st(t), e = r.length; e--;) {
      var n = r[e],
          o = t[n];
      r[e] = [n, o, Mr(o)];
    }

    return r;
  };

  var Br = function (t, r) {
    return function (e) {
      return null != e && e[t] === r && (void 0 !== r || t in Object(e));
    };
  };

  var Dr = function (t) {
    var r = Ir(t);
    return 1 == r.length && r[0][2] ? Br(r[0][0], r[0][1]) : function (e) {
      return e === t || Fr(e, t, r);
    };
  };

  var qr = function (t) {
    return "symbol" == typeof t || q(t) && "[object Symbol]" == b(t);
  },
      Rr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      Ur = /^\w*$/;

  var Cr = function (t, r) {
    if (W(t)) return !1;
    var e = typeof t;
    return !("number" != e && "symbol" != e && "boolean" != e && null != t && !qr(t)) || Ur.test(t) || !Rr.test(t) || null != r && t in Object(r);
  };

  function Lr(t, r) {
    if ("function" != typeof t || null != r && "function" != typeof r) throw new TypeError("Expected a function");

    var e = function () {
      var n = arguments,
          o = r ? r.apply(this, n) : n[0],
          a = e.cache;
      if (a.has(o)) return a.get(o);
      var u = t.apply(this, n);
      return e.cache = a.set(o, u) || a, u;
    };

    return e.cache = new (Lr.Cache || Nt)(), e;
  }

  Lr.Cache = Nt;
  var Vr = Lr;

  var Wr = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      Nr = /\\(\\)?/g,
      Gr = function (t) {
    var r = Vr(t, function (t) {
      return 500 === e.size && e.clear(), t;
    }),
        e = r.cache;
    return r;
  }(function (t) {
    var r = [];
    return 46 === t.charCodeAt(0) && r.push(""), t.replace(Wr, function (t, e, n, o) {
      r.push(n ? o.replace(Nr, "$1") : e || t);
    }), r;
  });

  var Hr = function (t, r) {
    for (var e = -1, n = null == t ? 0 : t.length, o = Array(n); ++e < n;) o[e] = r(t[e], e, t);

    return o;
  },
      Jr = i ? i.prototype : void 0,
      Kr = Jr ? Jr.toString : void 0;

  var Qr = function t(r) {
    if ("string" == typeof r) return r;
    if (W(r)) return Hr(r, t) + "";
    if (qr(r)) return Kr ? Kr.call(r) : "";
    var e = r + "";
    return "0" == e && 1 / r == -Infinity ? "-0" : e;
  };

  var Xr = function (t) {
    return null == t ? "" : Qr(t);
  };

  var Yr = function (t, r) {
    return W(t) ? t : Cr(t, r) ? [t] : Gr(Xr(t));
  };

  var Zr = function (t) {
    if ("string" == typeof t || qr(t)) return t;
    var r = t + "";
    return "0" == r && 1 / t == -Infinity ? "-0" : r;
  };

  var te = function (t, r) {
    for (var e = 0, n = (r = Yr(r, t)).length; null != t && e < n;) t = t[Zr(r[e++])];

    return e && e == n ? t : void 0;
  };

  var re = function (t, r, e) {
    var n = null == t ? void 0 : te(t, r);
    return void 0 === n ? e : n;
  };

  var ee = function (t, r) {
    return null != t && r in Object(t);
  };

  var ne = function (t, r, e) {
    for (var n = -1, o = (r = Yr(r, t)).length, a = !1; ++n < o;) {
      var u = Zr(r[n]);
      if (!(a = null != t && e(t, u))) break;
      t = t[u];
    }

    return a || ++n != o ? a : !!(o = null == t ? 0 : t.length) && K(o) && J(u, o) && (W(t) || V(t));
  };

  var oe = function (t, r) {
    return null != t && ne(t, r, ee);
  };

  var ae = function (t, r) {
    return Cr(t) && Mr(r) ? Br(Zr(t), r) : function (e) {
      var n = re(e, t);
      return void 0 === n && n === r ? oe(e, t) : $r(r, n, 3);
    };
  };

  var ue = function (t) {
    return t;
  };

  var ie = function (t) {
    return function (r) {
      return null == r ? void 0 : r[t];
    };
  };

  var ce = function (t) {
    return function (r) {
      return te(r, t);
    };
  };

  var fe = function (t) {
    return Cr(t) ? ie(Zr(t)) : ce(t);
  };

  var se = function (t) {
    return "function" == typeof t ? t : null == t ? ue : "object" == typeof t ? W(t) ? ae(t[0], t[1]) : Dr(t) : fe(t);
  };

  var pe = function (t, r) {
    var e = {};
    return r = se(r), pt(t, function (t, n, o) {
      I(e, n, r(t, n, o));
    }), e;
  };

  const le = ["any", "array", "bool", "element", "elementType", "func", "node", "number", "object", "string", "symbol"],
        ve = ["arrayOf", "exact", "instanceOf", "objectOf", "oneOf", "oneOfType", "shape"],
        ye = (t, e = !1, n = null) => t.name ? e ? r.default[t.name](n !== null && n !== void 0 ? n : t.params).isRequired : r.default[t.name](n !== null && n !== void 0 ? n : t.params) : e ? r.default[t].isRequired : r.default[t];

  function he(t, e) {
    t.propTypes = {}, t.defaultProps = {}, t.types = e;

    for (let n in e) {
      if ("string" == typeof n.type && !le.includes(n.type)) throw new Error(`${n.type} is not a valid prop-type. See allowed types at https://github.com/facebook/prop-types`);
      if (e[n].type.name && !ve.includes(e[n].type.name)) throw new Error(`${n.type} is not a valid prop-type. See allowed types at https://github.com/facebook/prop-types`);
      if (e[n].default, t.defaultProps[n] = e[n].default, "string" != typeof e[n].type) switch (e[n].type.name) {
        case "arrayOf":
          t.propTypes[n] = r.default.arrayOf(ye(e[n].type.params));
          break;

        case "exact":
          {
            const o = pe(e[n].type.params, t => ye(t));
            t.propTypes[n] = r.default.exact(o);
            break;
          }

        case "instanceOf":
          t.propTypes[n] = r.default.instanceOf(e[n].type.params);
          break;

        case "objectOf":
          t.propTypes[n] = r.default.objectOf(ye(e[n].type.params));
          break;

        case "oneOf":
          t.propTypes[n] = r.default.oneOf(e[n].type.params);
          break;

        case "oneOfType":
          {
            const o = e[n].type.params.map(t => ye(t));
            t.propTypes[n] = r.default.oneOfType(o);
            break;
          }

        case "shape":
          {
            const o = pe(e[n].type.params, t => ye(t));
            t.propTypes[n] = r.default.shape(o);
            break;
          }
      } else t.propTypes[n] = ye(e[n].type, e[n].required);
    }
  }

  le.forEach(t => {
    he[t] = t;
  }), ve.forEach(t => {
    he[t] = r => ({
      name: t,
      params: r
    });
  }), module.exports = he;
});

exports.reactIs = reactIs;
exports.typable_cjs = typable_cjs;
