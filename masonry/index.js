'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var typable_cjs = require('../typable.cjs-8aeba85a.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

const arrayToColumns = (arr, cols) => {
  const chunks = new Array(cols);

  for (let i = 0; i < arr.length; ++i) {
    let index = i % cols;

    if (!chunks[index]) {
      chunks[index] = [];
    }

    chunks[index].push(arr[i]);
  }

  return chunks;
};
const Masonry = /*#__PURE__*/React.forwardRef(({
  as: Component = "div",
  columns = 3,
  gap = "10px",
  children,
  style,
  ...props
}, ref) => {
  const childrenArray = React.Children.toArray(children);
  const transformed = arrayToColumns(childrenArray, Number(columns));
  const styles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    ...style
  }; // pass ref if using a DOM element

  const refProp = Component instanceof Function ? {} : {
    ref
  };
  return /*#__PURE__*/React.createElement(Component, _extends__default['default']({}, props, {
    style: styles
  }, refProp), transformed.map((elements, key) => /*#__PURE__*/React.createElement("div", {
    key: key
  }, React.Children.map(elements, (element, index) => {
    const marginTop = index === 0 ? index : gap;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop,
        marginBottom: 0
      }
    }, element);
  }))));
});
typable_cjs.typable_cjs(Masonry, {
  as: {
    type: typable_cjs.typable_cjs.oneOfType([typable_cjs.typable_cjs.string, typable_cjs.typable_cjs.func]),
    default: 'div'
  },
  gap: {
    type: typable_cjs.typable_cjs.oneOfType([typable_cjs.typable_cjs.string, typable_cjs.typable_cjs.number]),
    default: 10
  },
  columns: {
    type: typable_cjs.typable_cjs.oneOfType([typable_cjs.typable_cjs.string, typable_cjs.typable_cjs.number]),
    required: true,
    default: 3
  },
  children: {
    type: typable_cjs.typable_cjs.node,
    required: true
  },
  style: {
    type: typable_cjs.typable_cjs.object,
    description: 'CSS style for container'
  }
});

exports.arrayToColumns = arrayToColumns;
exports.default = Masonry;
