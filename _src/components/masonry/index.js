import * as React from "react"
import PropTypes from "prop-types"

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

const Masonry = React.forwardRef(({
  as: Component = "div",
  columns,
  gap = "10px",
  children,
  style,
  ...props
}, ref) => {
  const childrenArray = React.Children.toArray(children)
  const transformed = arrayToColumns(childrenArray, Number(columns))
  const styles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    ...style,
  }
  // pass ref if using a DOM element
  const refProp = Component instanceof Function ? {} : { ref }
  return (
    <Component {...props} style={styles} {...refProp}>
      {transformed.map((elements, key) => (
        <div key={key}>
          {React.Children.map(elements, (element, index) => {
            const marginTop = index === 0 ? index : gap
            return <div style={{ marginTop, marginBottom: 0 }}>{element}</div>
          })}
        </div>
      ))}
    </Component>
  )
})

Masonry.propTypes = {
  as: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Masonry
