'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var typable_cjs = require('../typable.cjs-d152a7e7.js');
var styledComponents_esm = require('../styled-components.esm-80f941ab.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

const getRatio = ({
  ratio
}) => {
  const [antecedent, consequent] = ratio.split(":");
  return `${antecedent} / ${consequent}`;
};

const getPercentage = ({
  ratio
}) => {
  const [antecedent, consequent] = ratio.split(":");
  return `${consequent / antecedent * 100}%`;
};

const Wrapper = styledComponents_esm.Ye.div`
  width: ${({
  width
}) => `${width}px`};
  aspect-ratio: ${getRatio};
  @supports not (aspect-ratio: 1 / 1) {
    &::before,
    &::after {
      content: "";
    }
    &::before {
      float: left;
      padding-bottom: ${getPercentage};
    }
    &::after {
      display: block;
      clear: both;
    }
  }
`;
const AspectRatio = /*#__PURE__*/React.forwardRef(({
  as = "div",
  ratio = "1:1",
  children,
  ...props
}, ref) => {
  return /*#__PURE__*/React.createElement(Wrapper, _extends__default['default']({
    as: as,
    ratio: ratio,
    ref: ref
  }, props), children && children);
});
typable_cjs.typable_cjs(AspectRatio, {
  as: {
    type: typable_cjs.typable_cjs.oneOfType([typable_cjs.typable_cjs.string, typable_cjs.typable_cjs.func]),
    default: 'div'
  },
  ratio: {
    type: typable_cjs.typable_cjs.string,
    required: true,
    default: '1:1'
  }
});

exports.default = AspectRatio;
