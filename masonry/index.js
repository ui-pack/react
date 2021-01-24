'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var index = require('../index-9509e7a5.js');

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
  columns,
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
Masonry.propTypes = {
  as: index.propTypes.string,
  gap: index.propTypes.oneOfType([index.propTypes.string, index.propTypes.number]),
  columns: index.propTypes.oneOfType([index.propTypes.string, index.propTypes.number]).isRequired,
  children: index.propTypes.node.isRequired,
  className: index.propTypes.string,
  style: index.propTypes.object
};

exports.arrayToColumns = arrayToColumns;
exports.default = Masonry;
