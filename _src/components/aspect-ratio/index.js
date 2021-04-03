import * as React from 'react'
import styled from "styled-components"

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
        {children}
      </Wrapper>
    )
  }
)

export default AspectRatio
