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
  gap = "1",
  children,
  className = "",
  style,
  ...props
}, ref) => {
  const childrenArray = React.Children.toArray(children)
  const transformed = arrayToColumns(childrenArray, Number(columns))
  const classes = `grid gap-${gap} ${className}`
  const styles = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    ...style,
  }
  const refProp = Component instanceof Function ? {} : { ref }
  return (
    <Component {...props} className={classes} style={styles} {...refProp}>
      {transformed.map((elements, key) => (
        <div key={key}>
          {React.Children.map(elements, (element, index) => {
            const topMargin = index === 0 ? index : gap
            return <div className={`mb-0 mt-${topMargin}`}>{element}</div>
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
