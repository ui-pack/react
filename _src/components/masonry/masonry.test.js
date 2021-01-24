import * as React from 'react'
import { render, screen } from '@testing-library/react'
import Masonry, { arrayToColumns } from '.'

describe('Array to columns', () => {
  /*
  It should go in a sinistrodextral flow (Woo! big word, I just learned it)
  */
  it("splits array into equal columns in zigzag flow", () => {
    const initial = [1, 2, 3, 4, 5, 6]
    const expected = [
      [1, 3, 5],
      [2, 4, 6],
    ]
    expect(arrayToColumns(initial, 2)).toEqual(expected)
  })
  /*
   What's excess in this context?
   They are the remainders from array-length / columns
   For a given array of 11 items, if we request 3 columns
   we should get 11 / 3 items in each column. That gives 
   a floored approximation of 3 items per column.
   3x3 = 9 so the excess is the 2 left to make up 11
  */
  it("places excesses in correct columns", () => {
    const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const expected1 = [
      [1, 4, 7, 10],
      [2, 5, 8, 11],
      [3, 6, 9],
    ]
    const array2 = [1, 2, 3, 4]
    const expected2 = [[1, 4], [2], [3]]
    const array3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const expected3 = [
      [1, 9, 17],
      [2, 10, 18],
      [3, 11, 19],
      [4, 12, 20],
      [5, 13],
      [6, 14],
      [7, 15],
      [8, 16]
    ]
    expect(arrayToColumns(array1, 3)).toEqual(expected1)
    expect(arrayToColumns(array2, 3)).toEqual(expected2)
    expect(arrayToColumns(array3, 8)).toEqual(expected3)
  })
})

describe("Masonry grid", () => {
  it("renders custom components as children", () => {
    const items = [1, 2, 3, 4]
    const GridItem = ({ num }) => <div>Item {num}</div>
    render(
      <Masonry columns="2" gap="4">
        {items.map(item => (
          <GridItem key={item} num={item} />
        ))}
      </Masonry>
    )
    expect(screen.getByText("Item 1")).toBeInTheDocument()
  })

  it("renders custom components with forwarded refs as children", () => {
    const items = [1, 2, 3, 4]
    const GridItem = React.forwardRef(({ num, ...props }, ref) => (
      <div ref={ref} {...props}>
        Item {num}
      </div>
    ))
    render(
      <Masonry columns="2" gap="4">
        {items.map(item => (
          <GridItem key={item} num={item} />
        ))}
      </Masonry>
    )
    expect(screen.getByText("Item 2")).toBeInTheDocument()
  })
})
