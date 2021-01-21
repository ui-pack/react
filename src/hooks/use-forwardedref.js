/*
* useForwardedRef allows a forwarded ref within
* React.forwardRef to be made available at the
* component applying the ref.
*/
import * as React from 'react'

function useForwardedRef(ref) {
  const innerRef = React.useRef(null)

  React.useEffect(() => {
    if (!ref) return
    // Handle function refs
    if (ref instanceof Function) {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
  })
  return innerRef
}

export default useForwardedRef
