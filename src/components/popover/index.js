import React from "react"
import styled, { css } from "styled-components"

// animate option
// placement (top, bottom)
// update clone and popover position on resiz
// https://codesandbox.io/s/flamboyant-sun-jyd1d?file=/src/App.js
const Backdrop = styled.div`
  --opacity: 0;
  ${({ mobileFriendly }) =>
    mobileFriendly &&
    css`
      @media (max-width: 540px) {
        --opacity: 0.1;
      }
    `}
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / var(--opacity));
`

const Dialog = styled.div`
  position: absolute;
  ${({ mobileFriendly, arrow }) =>
    mobileFriendly
      ? css`
          margin-top: ${arrow ? "12px" : 0};
          &::after {
            content: "";
            position: absolute;
            top: -7.5px;
            left: calc(50% - 7.5px);
            width: 15px;
            height: 15px;
            background: #fff;
            border-top: solid thin #ddd;
            border-left: solid thin #ddd;
            transform: rotate(45deg);
          }
          @media (max-width: 540px) {
            width: 100%;
            bottom: 0;
            top: 100px !important;
            left: 0 !important;
            border-radius: 30px 30px 0 0;
            overflow-x: hidden;
            overflow-y: auto;
            > * {
              border: 0;
              box-shadow: none;
              outline: none;
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
          &::after {
            content: "";
            display: ${arrow ? 'block':'none'};
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
        `}
`

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

function Popover({
  rootNodeSelector = "body",
  content,
  toggleFunction,
  trigger,
  arrow,
  raised,
  mobileFriendly
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
      <Backdrop onClick={toggleFunction} mobileFriendly={mobileFriendly} />
      {raised && trigger && (
        <div dangerouslySetInnerHTML={{ __html: triggerClone.outerHTML }} />
      )}
      <Dialog
        style={{ ...position, ...arrowStyles }}
        role="dialog"
        ref={dialogRef}
        arrow={arrow}
        mobileFriendly={mobileFriendly}
      >
        {content}
      </Dialog>
    </div>,
    rootNode
  )
}

const PopoverTrigger = React.forwardRef(
  (
    {
      as: Component = "button",
      content,
      children,
      raised = false,
      mobileFriendly = true,
      arrow = true,
      placement = "bottom",
      ...props
    },
    ref
  ) => {
    const [showPopover, setShowPopover] = React.useState(false)
    const triggerRef = useForwardedRef(ref)

    const handleTriggerClick = () => {
      setShowPopover((current) => !current)
    }

    return (
      <>
        <Component onClick={handleTriggerClick} ref={triggerRef} {...props}>
          {children}
        </Component>
        {showPopover && (
          <Popover
            content={content}
            toggleFunction={handleTriggerClick}
            trigger={triggerRef.current}
            arrow={arrow}
            raised={raised}
            mobileFriendly={mobileFriendly}
          />
        )}
      </>
    )
  }
)

export default PopoverTrigger