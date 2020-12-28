import React from 'react'
import { screen, render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import { rest } from "msw"
import { setupServer } from "msw/node"
import InfiniteScroll from '.'

describe('InfiniteScroll', () => {
  const server = setupServer(
    rest.get("/reindeers?page=1", (req, res, ctx) => {
      return res(ctx.json([
        {id: 1, name: 'Dasher', skill: 'Sewing'},
        {id: 2, name: 'Dancer', skill: 'Dancing'},
        {id: 3, name: 'Prancer', skill: 'Prancing'},
        {id: 4, name: 'Vixen', skill: 'Magic'},
        {id: 5, name: 'Comet', skill: 'Good with kids'},
      ]))
    }),
    rest.get("/reindeers?page=2", (req, res, ctx) => {
      return res(ctx.json([
        {id: 6, name: 'Cupid', skill: 'Bringing people together'},
        {id: 7, name: 'Donner', skill: 'Singing'},
        {id: 8, name: 'Blitzen', skill: 'Can electrify others'},
        {id: 9, name: 'Rudolph', skill: 'Glowing nose'},
        {id: 10, name: 'Olive', skill: 'Good at hide-and-seek'},
      ]))
    }),
  )

  beforeAll(() => server.listen())
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers())
  // clean up once the tests are done
  afterAll(() => server.close())

  it('loads container into the document', () => {
    const fetchImages = page => {
      return fetch(`/reindeers?page=${page}`).then(res => res.json())
    }
    render(
      <InfiniteScroll loadFunction={fetchImages} pageLimit={2} data-testid="infinite">
        {item => <div key={item.id}>{item.name}</div>}
      </InfiniteScroll>
    )
    const infiniteFeed = screen.getByTestId('infinite')
    expect(infiniteFeed).toBeInTheDocument()
  })

  it('loads initial container items into the document', async () => {
    const fetchImages = page => {
      return fetch(`/reindeers?page=${page}`).then(res => res.json())
    }
    render(
      <InfiniteScroll loadFunction={fetchImages} pageLimit={2} data-testid="infinite">
        {item => <div key={item.id} data-testid="note">{item.name}</div>}
      </InfiniteScroll>
    )
    const infiniteFeed = await screen.findAllByTestId('note')
    return expect(infiniteFeed).toHaveLength(5)
  })

  // Would love to test this more (scroll behavior) but due to limitations of jsdom as stated here:
  // https://github.com/testing-library/react-testing-library/issues/671#issuecomment-629468376
  // my options are quite limited. If these limitations get lifted in the future, revisit!
})
