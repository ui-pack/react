import * as React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

export const arrayToColumns = (arr, cols) => {
  const chunks = new Array(cols)
  for (let i = 0; i < arr.length; ++i) {
    let index = i % cols
    if (!chunks[index]) {
      chunks[index] = []
    }
    chunks[index].push(arr[i])
  }
  return chunks
}

const GridItem = styled.div`
  margin-bottom: 0;
  ${({ gap, index }) => css`
    margin-top: ${index === 0 ? index : gap}
  `}
`

function Masonry({
  as: Component = 'div',
  columns,
  gap = "10px",
  children,
  style,
  ...props
}) {
  const childrenArray = React.Children.toArray(children)
  const transformed = arrayToColumns(childrenArray, Number(columns))
  const styles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap,
    ...style,
  }
  return (
    <Component {...props} style={styles}>
      {transformed.map((elements, key) => (
        <div key={key}>
          {React.Children.map(elements, (element, index) => {
            return <GridItem gap={gap} index={index}>{element}</GridItem>
          })}
        </div>
      ))}
    </Component>
  )
}

Masonry.propTypes = {
  as: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Masonry