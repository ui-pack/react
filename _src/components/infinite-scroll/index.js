import * as React from 'react'
import typed from "typable-react"

const getIsEnded = (currentPage, pageLimit, isLoading, error) => (
  pageLimit && pageLimit === currentPage && !isLoading && !error
)

const isEmpty = (items, isLoading, error) => !items.length && !isLoading && !error

const InfiniteScroll = ({
  as: Component = "div",
  loadingMessage = <div>Loading...</div>,
  completionMessage = null,
  emptyMessage = null,
  errorMessage = null,
  initialPage = 1,
  loadFunction = () => Promise.resolve([]),
  onError,
  children: mapCallback,
  threshold = 500, // 500px from the end of page
  innerProps = null, // For when component's prop clashes with infinite scroll's
  pageLimit = 1000,
  scrollParentSelector,
  scrollContentSelector,
  ...props
}) => {
  const [page, setPage] = React.useState(initialPage)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const position = React.useRef(0)
  const thresholdReached = React.useRef(false)
  const abortRequest = React.useRef(false)
  const parentProps = innerProps ?? props
  const isEnded = getIsEnded(page, pageLimit, isLoading, error)

  const scrollCb = React.useCallback(event => {
    const { target } = event
    const scrollArea = scrollParentSelector ?  document.querySelector(scrollParentSelector) : target.scrollingElement
    const scrollContent = scrollContentSelector ? document.querySelector(scrollContentSelector) : scrollArea
    const scrollContentHeight = scrollContent.offsetHeight
    const scrollPosition = scrollArea.scrollTop
    const windowHeight = window.innerHeight
    const scrollDifference = scrollContentHeight - threshold - scrollPosition
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
  }, [threshold, pageLimit, scrollParentSelector, scrollContentSelector])

  // Page changes Effect
  React.useEffect(() => {
    // This should only load if page limit is not reached
    // and if it should not load for the initial page as
    // the loadfunction effect handles that.
    if (pageLimit && pageLimit >= page && page !== initialPage) {
      abortRequest.current = false
      setIsLoading(true)
      loadFunction(page).then((newItems) => {
        thresholdReached.current = false

        if(!abortRequest.current) {
          setItems((currentItems) => [...currentItems, ...newItems])
          setIsLoading(false)
        }
      }).catch(error => {
        if(!abortRequest.current) {
          setError(error)
          setIsLoading(false)
          if(onError) {
            onError(error)
          }
        }
      })
    }
    return () => {
      abortRequest.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageLimit, abortRequest])

  // LoadFunction's dependency effect
  React.useEffect(() => {
    abortRequest.current = false
    setIsLoading(true)
    loadFunction(page).then((newItems) => {
      if(!abortRequest.current) {
        setItems(newItems)
        setIsLoading(false)
      }
    }).catch(error => {
      if(!abortRequest.current) {
        setError(error)
        setIsLoading(false)
        if(onError) {
          onError(error)
        }
      }
    })
    return () => {
      abortRequest.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadFunction])

  // Scroll Effect
  React.useEffect(() => {
    const scroller = scrollParentSelector ? document.querySelector(scrollParentSelector) : window
    if(scroller){
      scroller.addEventListener("scroll", scrollCb)
    }
    return () => {
      if(scroller){
        scroller.removeEventListener("scroll", scrollCb)
      }
    }
  }, [scrollCb, scrollParentSelector])


  return (
    <>
      <Component {...parentProps}>{items.map(mapCallback)}</Component>
      {isLoading && loadingMessage}
      {isEmpty(items, isLoading, error) && emptyMessage}
      {isEnded && completionMessage}
      {error && errorMessage}
    </>
  )
}

typed(InfiniteScroll, {
  as: {
    type: typed.oneOfType([typed.string, typed.func]),
    default: 'div'
  },
  loadingMessage: {
    type: typed.node,
    default: <div>Loading...</div>
  },
  completionMessage: {
    type: typed.node
  },
  emptyMessage: {
    type: typed.node
  },
  errorMessage: {
    type: typed.node
  },
  initialPage: {
    type: typed.number,
    default: 1,
  },
  loadFunction: {
    type: typed.func,
    required: true
  },
  children: {
    type: typed.func,
    required: true
  },
  onError: {
    type: typed.func
  },
  threshold: {
    type: typed.number,
    default: 500,
  },
  innerProps: {
    type: typed.object
  },
  pageLimit: {
    type: typed.number,
    default: 1000
  },
  scrollParentSelector: {
    type: typed.string
  },
  scrollContentSelector: {
    type: typed.string
  },
})

export default InfiniteScroll
