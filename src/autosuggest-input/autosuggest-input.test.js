import React from 'react'
import { screen, render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import userEvent from '@testing-library/user-event'
import AutosuggestInput from '.'

describe('AutosuggestInput', () => {
  it('suggests values that have been previously entered', () => {
    render(<AutosuggestInput aria-label="myInput" />)
    const input = screen.getByRole('textbox', { name: 'myInput' })
    const suggestion = screen.getByTestId('suggestion')
    userEvent.type(input, 'Spaghetti')
    userEvent.tab()
    userEvent.clear(input)
    expect(input).toHaveValue('')
    userEvent.type(input, 'Spag')
    expect(suggestion).toHaveTextContent('Spaghetti')
  })

  it('shows no suggestion when input matches no stored suggestions', () => {
    render(<AutosuggestInput aria-label="myInput" />)
    const input = screen.getByRole('textbox', { name: 'myInput' })
    const suggestion = screen.getByTestId('suggestion')
    userEvent.type(input, 'Lasagna')
    expect(suggestion).toHaveTextContent('')
  })

  it('uses case sensitive suggestions', () => {
    render(<AutosuggestInput aria-label="myInput" />)
    const input = screen.getByRole('textbox', { name: 'myInput' })
    const suggestion = screen.getByTestId('suggestion')
    userEvent.type(input, 'FETTUCCINE')
    userEvent.tab()
    userEvent.clear(input)
    expect(input).toHaveValue('')
    userEvent.type(input, 'fett')
    expect(suggestion).toHaveTextContent('')
  })

  it('uses right arrow key to complete input with matching suggestion', () => {
    render(<AutosuggestInput aria-label="myInput" />)
    const input = screen.getByRole('textbox', { name: 'myInput' })
    userEvent.type(input, 'Linguine')
    userEvent.tab()
    userEvent.clear(input)
    expect(input).toHaveValue('')
    userEvent.type(input, 'Ling{arrowright}')
    expect(input).toHaveValue('Linguine')
  })

  it('updates onChange callback when right arrow key changes input', () => {
    const onChangeCallback = jest.fn()
    render(<AutosuggestInput aria-label="myInput" onChange={onChangeCallback} />)
    const input = screen.getByRole('textbox', { name: 'myInput' })
    userEvent.type(input, 'Gnocchi') // calls onchange 7x -> length of string
    userEvent.tab()
    userEvent.clear(input) // calls onchange once -> 1 + 7  = 8
    userEvent.type(input, 'G{arrowright}') // calls onchange 2x -> G and arrow right key -> 2 + 8 = 10
    expect(onChangeCallback).toHaveBeenCalledTimes(10)
  })

  it('does not fill empty suggestion to input', () => {
    render(<AutosuggestInput aria-label="myInput" />)
    const input = screen.getByRole('textbox', { name: 'myInput' })
    const suggestion = screen.getByTestId('suggestion')
    userEvent.type(input, 'Orzo{arrowright}')
    expect(input).toHaveValue('Orzo')
    expect(suggestion).toHaveTextContent('')
  })
})