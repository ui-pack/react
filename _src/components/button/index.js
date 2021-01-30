import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const ButtonWrapper = styled.button`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  color: var(--color);
  background-color: var(--bgcolor, var(--modeBgcolor));
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  font-size: var(--fontSize);
  padding: var(--padding)
`

const getBy = (property, size) => {
  return ({
    small: property === 'font-size' ? '12px' : '10px 16px',
    medium: property === 'font-size' ? '14px' : '11px 20px',
    large: property === 'font-size' ? '16px' : '12px 24px'
  })[size]
}

/**
 * Primary UI component for user interaction
 * only purpose is to guide my usage of other storybook components
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  return (
    <ButtonWrapper
      type="button"
      style={{
        '--color': primary ? '#fff' : '#333',
        '--bgcolor': backgroundColor,
        '--modeBgcolor': primary ? '#1ea7fd' : 'transparent',
        '--fontSize': getBy('font-size', size),
        '--padding': getBy('padding', size),
      }}
      {...props}
    >
      {label}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
