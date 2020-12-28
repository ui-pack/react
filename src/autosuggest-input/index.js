import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _uniq from 'lodash/uniq'
import _pick from 'lodash/pick'
import _mapKeys from 'lodash/mapKeys'
import _camelCase from 'lodash/camelCase'
import useForwardedRef from '../hooks/use-forwardedref'
import useLocalStorage from '../hooks/use-localstorage'

const AutosuggestInput = React.forwardRef(({
  as: Component = "input",
  type = "text",
  name = "autosuggest",
  onBlur,
  onChange,
  onKeyDown,
  ...props
}, ref) => {
  const [suggestionList, setSuggestionList] = useLocalStorage(name, [])
  const [suggestion, setSuggestion] = useState("")
  const [inputStyles, setInputStyles] = useState({})
  const inputRef = useForwardedRef(ref)

  const handleBlur = event => {
    const { value } = event.target
    // only store searches with over 3 characters
    if(value && value.length > 3) {
      setSuggestionList(currentList => {
        // Always cap at 10 items in suggestions
        // Then avoid duplicates
        return _uniq([value, ...currentList.slice(0, 9)])
      })
    }
    if (onBlur) {
      onBlur(event)
    }
  }

  const handleChange = event => {
    const { value } = event.target
    if(suggestionList?.length) {
      // Intentionally a case-sensitive match as its complex to visually clone
      const match = value ? suggestionList.find(phrase => new RegExp(`^${value}`).test(phrase)) : value
      if(match) {
        setSuggestion(match)
      } else {
        // Show no suggestion when no match
        setSuggestion("")
      }
    }
    if(onChange) {
      onChange(event)
    }
  }

  const handleKeyDown = event => {
    if(event.key === 'ArrowRight' && suggestion) {
      // Simulate change event on input while copying suggestion into it
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      nativeInputValueSetter.call(inputRef.current, suggestion);

      var changeEvent = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(changeEvent);
    }
    if(onKeyDown) {
      onKeyDown(event)
    }
  }  

  useEffect(() => {
    /*
    * Get properties that define box model and text formatting
    */
   // Enter ful property names for FF
   const computedStyles = _pick(window.getComputedStyle(inputRef.current), [
     'width',
     'height',
     "margin-top",
     "margin-left",
     "margin-right",
     "margin-bottom",
     "padding-top",
     "padding-left",
     "padding-right",
     "padding-bottom",
     "border-top-width",
     "border-top-style",
     "border-left-width",
     "border-left-style",
     "border-right-width",
     "border-right-style",
     "border-bottom-width",
     "border-bottom-style",
     "font-family",
     "font-size",
     "line-height",
     "text-align",
     "text-transform",
     "color"
   ])
   // Only clone input styles to autosuggest if none are set yet
   if(!Object.keys(inputStyles).length) {
     setInputStyles({
       position: 'absolute',
       top: 0,
       left: 0,
       borderColor: 'transparent',
       opacity: 0.3,
       pointerEvents: 'none',
       // kebab-cased property names won't work as JSX inline styles so we camelCase them
       ..._mapKeys(computedStyles, (v, key) => _camelCase(key))
     })
   }
  }, [inputStyles, inputRef])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Component
        {...props}
        ref={inputRef}
        type={type}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <span className="absolute" style={inputStyles} data-testid="suggestion">{suggestion}</span>
    </div>
  )
})

AutosuggestInput.propTypes = {
  as: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
  name: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
}

export default AutosuggestInput
