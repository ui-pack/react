import * as React from 'react'
import typed from 'typable-react'
import styled from 'styled-components'

const getRatio = ({ ratio }) => {
  const [antecedent, consequent] = ratio.split(":")
  return `${antecedent} / ${consequent}`
}

const getPercentage = ({ ratio }) => {
  const [antecedent, consequent] = ratio.split(":")
  return `${(consequent / antecedent) * 100}%`
}

const Wrapper = styled.div`
  width: ${({ width }) => `${width}px`};
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
`

const AspectRatio = React.forwardRef(
  ({ as = "div", ratio = "1:1", children, ...props }, ref) => {
    return (
      <Wrapper as={as} ratio={ratio} ref={ref} {...props}>
        {children && children}
      </Wrapper>
    )
  }
)

typed(AspectRatio, {
  as: {
    type: typed.oneOfType([typed.string, typed.func]),
    default: 'div'
  },
  ratio: {
    type: typed.string,
    required: true,
    default: '1:1'
  }
})

export default AspectRatio
