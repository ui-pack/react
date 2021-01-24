import * as React from 'react'
import { screen, render } from '@testing-library/react'
import PopoverAnchor from '.'

describe('PopoverAnchor', () => {
  it('renders a default button as anchor', () => {
    render(
      <PopoverAnchor
        content={<h1>Hello</h1>}
        contentId="test-content"
      >
        Click me
      </PopoverAnchor>
    )
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('can be any DOM element', () => {
    render(
      <PopoverAnchor
        as="h1"
        content={<h1>Hello</h1>}
        contentId="test-content"
      >
      Click me
      </PopoverAnchor>
    )
    expect(screen.getByRole('heading', { name: /click me/i, level: 1 })).toBeInTheDocument()
  })
})
