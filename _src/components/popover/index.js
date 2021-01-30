import * as React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useTransition, animated } from 'react-spring'
import styled, { css } from 'styled-components'

// probably skip on handling resize because of light dismiss
// as described here by open-ui https://open-ui.org/components/select#light-dismiss
// and here by MsEdge https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Popup/explainer.md#light-dismiss
// Light dismiss requires that
// 1. Esc closes the dialog ✅
// 2. On blur of the window closes the dialog
// 3. On resize closes the dialog (even though blur should before resize can happen, this handles orientation change too) ✅
// https://codesandbox.io/s/flamboyant-sun-jyd1d?file=/src/App.js
// KNOWN-ISSUES
// 1. Default border color gets applied for arrow -> rgb(0,0,0) when none is set
// 2. Firefox not grabbing computed border radius

// raised: sending focus to the anchor does not close the popup
// autofocus?
// bring back handling ids
// will the anchor attribute be any useful for non <popup> elements for library authors that try to implement this
// with generic elements like <div>
// test it works in modals
// i.e it has context also of its modal parent container rather than just the window
const Backdrop = styled.div`
  --opacity: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(0 0 0 / var(--opacity));
  ${({ mobileBreakpoint }) =>
    mobileBreakpoint &&
    css`
      @media (max-width: ${mobileBreakpoint}px) {
        --opacity: 0.1;
      }
    `}
`

const dialogPseudoAfter = (arrow) => `
  &::after {
    content: "";
    display: ${arrow ? "block" : "none"};
    position: absolute;
    top: -7.5px;
    left: var(--left);
    width: 15px;
    height: 15px;
    background: var(--arrowBg, #fff);
    border-top: solid thin var(--arrowBorder, #ddd);
    border-left: solid thin var(--arrowBorder, #ddd);
    border-top-left-radius: var(--arrowRadius, 0);
    transform: rotate(45deg);
  }
`
const Dialog = styled.div`
  position: absolute;
  transform: var(--transform);
  ${({ mobileBreakpoint, arrow }) =>
    mobileBreakpoint
      ? css`
          margin-top: ${arrow ? "12px" : 0};
          ${dialogPseudoAfter(arrow)}
          @media (max-width: ${mobileBreakpoint}px) {
            width: 100%;
            bottom: 0;
            top: 200px !important;
            left: 0 !important;
            border-radius: 40px 40px 0 0;
            overflow-x: hidden;
            overflow-y: auto;
            transform: var(--mobile-transform);
            > * {
              border: 0 !important;
              box-shadow: none !important;
              outline: none !important;
              height: 100%;
            }
            &::before {
              content: "";
              display: block;
              z-index: 10;
              position: absolute;
              top: 10px;
              left: 0;
              right: 0%;
              width: 80px;
              height: 7px;
              margin: 0 auto 20px;
              background: rgba(50 50 50/0.2);
              border-radius: 20px;
            }
            &::after {
              display: none !important;
            }
          }
        `
      : css`
          margin-top: ${arrow ? "12px" : 0};
          ${dialogPseudoAfter(arrow)}
        `}
`
const AnimatedDialog = animated(Dialog)

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

function getDialogPosition(triggerRect, dialog) {
  if (!dialog || !triggerRect) {
    return {
      top: 0,
      left: 0
    }
  }
  const top = triggerRect.top + triggerRect.height
  const left =
    triggerRect.left +
    triggerRect.width / 2 -
    dialog.getBoundingClientRect().width / 2
  return { top, left }
}

export function Popover({
  rootNodeSelector = "body",
  content,
  contentId,
  toggleFunction,
  trigger,
  arrow,
  raised,
  mobileBreakpoint,
  anchor,
  style
}) {
  const rootNode = document.querySelector(rootNodeSelector)
  const triggerRect = React.useRef({})
  const triggerClone = trigger.cloneNode(true)
  const dialogRef = React.useRef()
  const [arrowStyles, setArrowStyles] = React.useState({})
  const [position, setPosition] = React.useState(() =>
    getDialogPosition(triggerRect, dialogRef.current)
  )
  const { left, top, right, height } = triggerRect.current
  triggerClone.style.position = "absolute"
  triggerClone.style.top = `${top}px`
  triggerClone.style.left = `${left}px`
  triggerClone.style.right = `${right}px`
  triggerClone.style.height = `${height}px`
  // Place dialog based on position of trigger

  React.useEffect(() => {
    triggerRect.current = trigger.getBoundingClientRect()
    if (dialogRef.current && triggerRect.current) {
      setArrowStyles({
        "--arrowBg": window.getComputedStyle(dialogRef.current.firstChild)
          .backgroundColor,
        "--arrowBorder": window.getComputedStyle(dialogRef.current.firstChild)
          .borderColor,
        "--arrowRadius": window.getComputedStyle(dialogRef.current.firstChild)
          .borderRadius,
        "--left": "calc(50% - 7.5px)"
      })
    }
    setPosition(getDialogPosition(triggerRect.current, dialogRef.current))
  }, [trigger])

  return ReactDOM.createPortal(
    <div>
      <Backdrop
        onClick={() => toggleFunction(false)}
        mobileBreakpoint={mobileBreakpoint}
      />
      {raised && trigger && (
        <div dangerouslySetInnerHTML={{ __html: triggerClone.outerHTML }} />
      )}
      <AnimatedDialog
        style={{ ...position, ...arrowStyles, ...style }}
        role="dialog"
        id={contentId}
        ref={dialogRef}
        arrow={arrow}
        anchor={anchor}
        mobileBreakpoint={mobileBreakpoint}
      >
        {content}
      </AnimatedDialog>
    </div>,
    rootNode
  )
}

const PopoverAnchor = React.forwardRef(
  (
    {
      as: Component = "button",
      content,
      children,
      raised = false,
      mobileBreakpoint = 520,
      arrow = true,
      placement = "bottom",
      contentId = "popover",
      ...props
    },
    ref
  ) => {
    const [showPopover, setShowPopover] = React.useState(false)
    const transitions = useTransition(showPopover, null, {
      from: {
        "--transform": "translateY(-20px)",
        "--mobile-transform": "translateY(100vh)",
        opacity: 0
      },
      enter: {
        "--transform": "translateY(0px)",
        "--mobile-transform": "translateY(0px)",
        opacity: 1
      },
      leave: {
        "--transform": "translateY(-20px)",
        "--mobile-transform": "translateY(100vh)",
        opacity: 0
      },
      config: { mass: 1, tension: 280, friction: 30 }
    })
    const triggerRef = useForwardedRef(ref)

    const handleTriggerClick = () => {
      if (!showPopover) {
        setShowPopover(true)
      }
    }

    // Handle Esc key
    const escCb = React.useCallback(
      (event) => {
        if (event.key === "Escape" && showPopover) {
          setShowPopover(false)
        }
      },
      [showPopover]
    )
    // Handle light dismissal resize
    const resizeCb = React.useCallback(() => {
      setShowPopover(false)
    }, [])

    React.useEffect(() => {
      window.addEventListener("keydown", escCb)
      window.addEventListener("resize", resizeCb)
      return () => {
        window.removeEventListener("keydown", escCb)
        window.removeEventListener("resize", resizeCb)
      }
    }, [escCb, resizeCb])

    return (
      <>
        <Component
          onClick={handleTriggerClick}
          ref={triggerRef}
          aria-controls={contentId}
          aria-haspopup="dialog"
          aria-expanded={showPopover}
          {...props}
        >
          {children}
        </Component>
        {transitions.map(({ item, key, props }) => {
          return (
            item && (
              <Popover
                content={content}
                contentId={contentId}
                toggleFunction={setShowPopover}
                trigger={triggerRef.current}
                arrow={arrow}
                raised={raised}
                mobileBreakpoint={mobileBreakpoint}
                key={key}
                style={props}
              />
            )
          )
        })}
      </>
    )
  }
)

PopoverAnchor.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  raised: PropTypes.bool,
  arrow: PropTypes.bool,
  mobileBreakpoint: PropTypes.number,
  placement: PropTypes.string,
  contentId: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
}

export default PopoverAnchor
