import * as React from "react"
import typed from "typable-react"

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
  columns = 3,
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

typed(Masonry, {
  as: {
    type: typed.oneOfType([typed.string, typed.func]),
    default: 'div',
  },
  gap: {
    type: typed.oneOfType([typed.string, typed.number]),
    default: 10,
  },
  columns: {
    type: typed.oneOfType([typed.string, typed.number]),
    required: true,
    default: 3,
  },
  children: {
    type: typed.node,
    required: true
  },
  style: {
    type: typed.object,
    description: 'CSS style for container'
  }
})

export default Masonry
