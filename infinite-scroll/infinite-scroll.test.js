import * as React from 'react'
import { screen, render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import fetch from "node-fetch"
import { rest } from "msw"
import { setupServer } from "msw/node"
import InfiniteScroll from '.'

const InfiniteScrollComponent = ({ requestPath, usePage, ...props}) => {
  const fetchImages = React.useMemo(() => page => {
    // use page # if provided, if set as boolean true, use the current page passed to callback
    const path = !usePage ? requestPath : typeof usePage === 'number' ? `${requestPath}?page=${usePage}` : `${requestPath}?page=${page}`
    return fetch(path).then(res => res.json())
  }, [requestPath, usePage])

  return (
    <InfiniteScroll {...props} loadFunction={fetchImages}>
      {item => <div key={item.id} data-testid="note">{item.name}</div>}
    </InfiniteScroll>
  )
}

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
    rest.get('/elves?page=1', (req, res, ctx) => res(ctx.json([])))
  )

  beforeAll(() => server.listen())
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers())
  // clean up once the tests are done
  afterAll(() => server.close())

  it('loads container into the document', async () => {
    render(
      <InfiniteScrollComponent
        requestPath="/reindeers"
        data-testid="infinite"
        pageLimit={2}
        usePage
      />
    )
    const infiniteFeed = await screen.findByTestId('infinite')
    expect(infiniteFeed).toBeInTheDocument()
  })

  xit('loads initial container items into the document', async () => {
    render(
      <InfiniteScrollComponent
        requestPath="/reindeers"
        data-testid="infinite"
        pageLimit={2}
        usePage
      />
    )
    const infiniteFeed = await screen.findAllByTestId('note')
    return expect(infiniteFeed).toHaveLength(5)
  })

  xit('displays empty message when there are no results', async () => {
    render(
      <InfiniteScrollComponent
        requestPath="/elves"
        data-testid="infinite"
        emptyMessage={<h1 aria-label="empty">Empty</h1>}
      />
    )
    const emptyMessage = await screen.findByRole('heading', { name: 'empty' })
    expect(emptyMessage).toBeInTheDocument()
    expect(emptyMessage).toHaveTextContent('Empty')
  })

  xit('shows error message on failed requests', async () => {
    render(
      <InfiniteScrollComponent
        requestPath="/santa"
        data-testid="infinite"
        errorMessage={<h1 aria-label="error">Broken</h1>}
      />
    )
    const errorMessage = await screen.findByRole('heading', { name: 'error' })
    const emptyMessage = await screen.queryByRole('heading', { name: 'empty' })
    expect(errorMessage).toBeInTheDocument()
    expect(emptyMessage).not.toBeInTheDocument()
    expect(errorMessage).toHaveTextContent('Broken')
  })

  xit('calls onError for failed requests', async () => {
    const fn = jest.fn()
    render(
      <InfiniteScrollComponent
        requestPath="/santa"
        data-testid="infinite"
        onError={fn}
        errorMessage={<h1 aria-label="error">Broken</h1>}
      />
    )
    const errorMessage = await screen.findByRole('heading', { name: 'error' })
    expect(errorMessage).toBeInTheDocument()
    expect(fn).toHaveBeenCalled()
  })

  // Would love to test this more (scroll behavior) but due to limitations of jsdom as stated here:
  // https://github.com/testing-library/react-testing-library/issues/671#issuecomment-629468376
  // my options are quite limited. If these limitations get lifted in the future, revisit!
})
