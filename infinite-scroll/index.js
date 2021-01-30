'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var index = require('../index-9509e7a5.js');

const getIsEnded = (currentPage, pageLimit, isLoading, error) => pageLimit && pageLimit === currentPage && !isLoading && !error;

const isEmpty = (items, isLoading, error) => !items.length && !isLoading && !error;

const InfiniteScroll = ({
  as: Component = "div",
  loadingMessage = /*#__PURE__*/React.createElement("div", null, "Loading..."),
  completionMessage = null,
  emptyMessage = null,
  errorMessage = null,
  initialPage = 1,
  loadFunction = () => Promise.resolve([]),
  onError,
  children: mapCallback,
  threshold = 500,
  // 500px from the end of page
  innerProps = null,
  // For when component's prop clashes with infinite scroll's
  pageLimit = 1000,
  scrollParentSelector,
  scrollContentSelector,
  ...props
}) => {
  const [page, setPage] = React.useState(initialPage);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const position = React.useRef(0);
  const thresholdReached = React.useRef(false);
  const abortRequest = React.useRef(false);
  const parentProps = innerProps ?? props;
  const isEnded = getIsEnded(page, pageLimit, isLoading, error);
  const scrollCb = React.useCallback(event => {
    const {
      target
    } = event;
    const scrollArea = scrollParentSelector ? document.querySelector(scrollParentSelector) : target.scrollingElement;
    const scrollContent = scrollContentSelector ? document.querySelector(scrollContentSelector) : scrollArea;
    const scrollContentHeight = scrollContent.offsetHeight;
    const scrollPosition = scrollArea.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollDifference = scrollContentHeight - threshold - scrollPosition;

    if (scrollDifference <= windowHeight && !thresholdReached.current) {
      thresholdReached.current = true; // if scrolling down

      if (position.current < scrollPosition) {
        // Increase page number if below limit
        setPage(currentPage => pageLimit && pageLimit > currentPage ? currentPage + 1 : currentPage);
      }
    }

    if (scrollDifference + threshold === windowHeight) {
      // End reached
      thresholdReached.current = false;
    }

    position.current = scrollPosition;
  }, [threshold, pageLimit, scrollParentSelector, scrollContentSelector]); // Page changes Effect

  React.useEffect(() => {
    // This should only load if page limit is not reached
    // and if it should not load for the initial page as
    // the loadfunction effect handles that.
    if (pageLimit && pageLimit >= page && page !== initialPage) {
      abortRequest.current = false;
      setIsLoading(true);
      loadFunction(page).then(newItems => {
        thresholdReached.current = false;

        if (!abortRequest.current) {
          setItems(currentItems => [...currentItems, ...newItems]);
          setIsLoading(false);
        }
      }).catch(error => {
        if (!abortRequest.current) {
          setError(error);
          setIsLoading(false);

          if (onError) {
            onError(error);
          }
        }
      });
    }

    return () => {
      abortRequest.current = true;
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageLimit, abortRequest]); // LoadFunction's dependency effect

  React.useEffect(() => {
    abortRequest.current = false;
    setIsLoading(true);
    loadFunction(page).then(newItems => {
      if (!abortRequest.current) {
        setItems(newItems);
        setIsLoading(false);
      }
    }).catch(error => {
      if (!abortRequest.current) {
        setError(error);
        setIsLoading(false);

        if (onError) {
          onError(error);
        }
      }
    });
    return () => {
      abortRequest.current = true;
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadFunction]); // Scroll Effect

  React.useEffect(() => {
    const scroller = scrollParentSelector ? document.querySelector(scrollParentSelector) : window;

    if (scroller) {
      scroller.addEventListener("scroll", scrollCb);
    }

    return () => {
      if (scroller) {
        scroller.removeEventListener("scroll", scrollCb);
      }
    };
  }, [scrollCb, scrollParentSelector]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Component, parentProps, items.map(mapCallback)), isLoading && loadingMessage, isEmpty(items, isLoading, error) && emptyMessage, isEnded && completionMessage, error && errorMessage);
};

InfiniteScroll.propTypes = {
  as: index.propTypes.oneOfType([index.propTypes.string, index.propTypes.func]),
  loadingMessage: index.propTypes.node,
  completionMessage: index.propTypes.node,
  emptyMessage: index.propTypes.node,
  errorMessage: index.propTypes.node,
  initialPage: index.propTypes.number,
  loadFunction: index.propTypes.func.isRequired,
  children: index.propTypes.func.isRequired,
  onError: index.propTypes.func,
  threshold: index.propTypes.number,
  innerProps: index.propTypes.object,
  pageLimit: index.propTypes.number,
  scrollParentSelector: index.propTypes.string,
  scrollContentSelector: index.propTypes.string
};

exports.default = InfiniteScroll;
