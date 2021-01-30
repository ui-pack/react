import * as React from 'react'
import styled from 'styled-components'
import InfiniteScroll from '.'

export default {
  title: 'UI/InfiniteScroll',
  component: InfiniteScroll,
  argTypes: {
    loadingMessage: { control: { disable: true } },
    emptyMessage: { control: { disable: true } },
    errorMessage: { control: { disable: true } },
    completionMessage: { control: { disable: true } },
    scrollParentSelector: { control: { disable: true } },
    scrollContentSelector: { control: { disable: true } },
    innerProps: { control: { disable: true } },
  }
}

const Image = styled.img`
  width: 100%;
`

const Template = args => {
  const fetchImages = React.useMemo(() => page => {
    return fetch(`https://picsum.photos/v2/list?page=${page}&limit=3`).then(res => res.json())
  }, [])
  return (
    <InfiniteScroll {...args} loadFunction={fetchImages}>
      {item => <div key={item.id}><Image src={item.download_url} alt={item.author} /></div>}
    </InfiniteScroll>
  )
}

export const Default = Template.bind({})
Default.args = {
  pageLimit: 2,
  loadingMessage: <div>Loading...</div>,
  completionMessage: <div style={{ textAlign: 'center' }}>You have reached the end!!!</div>
}