import * as React from 'react'
import PropTypes from 'prop-types'

const getIsEnded = (currentPage, pageLimit, isLoading) => (
  pageLimit && pageLimit === currentPage && !isLoading
)

const InfiniteScroll = ({
  as: Component = "div",
  loader = <div>Loading...</div>,
  loadEnd = null,
  initialPage = 1,
  loadFunction = () => Promise.resolve([]),
  children: mapCallback,
  threshold = 500, // 500px from the end of page
  innerProps = null, // For when component's prop clashes with infinite scroll's
  pageLimit,
  ...props
}) => {
  const [page, setPage] = React.useState(initialPage)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const position = React.useRef(0)
  const thresholdReached = React.useRef(false)
  const abortRequest = React.useRef(false)
  const parentProps = innerProps ?? props
  const isEnded = getIsEnded(page, pageLimit, isLoading)

  const scrollCb = React.useCallback(event => {
    const { target } = event
    const scrollAreaHeight = target.scrollingElement.offsetHeight
    const scrollPosition = target.scrollingElement.scrollTop
    const windowHeight = window.innerHeight
    const scrollDifference = scrollAreaHeight - threshold - scrollPosition
    if (scrollDifference <= windowHeight && !thresholdReached.current) {
      thresholdReached.current = true
      // if scrolling down
      if (position.current < scrollPosition) {
        // Increase page number if below limit
        setPage((currentPage) => pageLimit && pageLimit > currentPage ? currentPage + 1 : currentPage)
      }
    }
    if (scrollDifference + threshold === windowHeight) {
      // End reached
      thresholdReached.current = false
    }
    position.current = scrollPosition
  }, [threshold, pageLimit])

  // Request Effect
  React.useEffect(() => {
    abortRequest.current = false
    if (pageLimit && pageLimit >= page) {
      setIsLoading(true)
      loadFunction(page).then((newItems) => {
        thresholdReached.current = false

        if(!abortRequest.current) {
          setItems((currentItems) => [...currentItems, ...newItems])
          setIsLoading(false)
        }
      })
    }
    return () => {
      abortRequest.current = true
    }
  }, [loadFunction, page, pageLimit, abortRequest])

  // Scroll Effect
  React.useEffect(() => {
    window.addEventListener("scroll", scrollCb)
    return () => {
      window.removeEventListener("scroll", scrollCb)
    }
  }, [scrollCb])

  return (
    <>
      <Component {...parentProps}>{items.map(mapCallback)}</Component>
      {isLoading && loader}
      {isEnded && loadEnd}
    </>
  )
}

InfiniteScroll.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  loader: PropTypes.node,
  loadEnd: PropTypes.node,
  initialPage: PropTypes.number,
  loadFunction: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  threshold: PropTypes.number,
  innerProps: PropTypes.object,
  pageLimit: PropTypes.number
}

export default InfiniteScroll
