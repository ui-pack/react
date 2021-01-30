'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var index = require('../index-9509e7a5.js');
var styledComponents_esm = require('../styled-components.esm-1652735d.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ButtonWrapper = styledComponents_esm.Ye.button`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  color: var(--color);
  background-color: var(--bgcolor);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  font-size: var(--fontSize);
  padding: var(--padding)
`;

const getBy = (property, size) => {
  return {
    small: property === 'font-size' ? '12px' : '10px 16px',
    medium: property === 'font-size' ? '14px' : '11px 20px',
    large: property === 'font-size' ? '16px' : '12px 24px'
  }[size];
};
/**
 * Primary UI component for user interaction
 * only purpose is to guide my usage of other storybook components
 */


const Button = ({
  primary,
  backgroundColor,
  size,
  label,
  ...props
}) => {
  return /*#__PURE__*/React__default['default'].createElement(ButtonWrapper, _extends__default['default']({
    type: "button",
    style: {
      '--color': primary ? '#fff' : '#333',
      '--bgcolor': backgroundColor || primary ? '#1ea7fd' : 'transparent',
      '--fontSize': getBy('font-size', size),
      '--padding': getBy('padding', size)
    }
  }, props), label);
};
Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: index.propTypes.bool,

  /**
   * What background color to use
   */
  backgroundColor: index.propTypes.string,

  /**
   * How large should the button be?
   */
  size: index.propTypes.oneOf(['small', 'medium', 'large']),

  /**
   * Button contents
   */
  label: index.propTypes.string.isRequired,

  /**
   * Optional click handler
   */
  onClick: index.propTypes.func
};
Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined
};

exports.Button = Button;
