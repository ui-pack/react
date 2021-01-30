import styled from 'styled-components'
import Masonry from '.'

export default {
  title: 'UI/Masonry',
  component: Masonry,
  argTypes: {
    gap: { control: 'text' },
    columns: { control: 'number' }
  }
}

const places = [
  "brazil/300/300",
  "nigeria/800/700",
  "london/500/300",
  "mexico/400/600",
  "florida/500/600",
  "peru/800/600",
  "germany/800/600",
  "tokyo/600/800",
  "netherlands/300/500"
]

const getPlaceName = place => place.slice(0, -8)

const Image = styled.img`
  display: block;
  width: 100%;
`

const Figure = styled.figure`
  margin: 0
`

const Caption = styled.figcaption`
  padding: 10px 0;
  background: #f7f7f7;
  text-align: center;
  text-transform: capitalize;
  font-family: system-ui;
`

export const Default = args => (
  <Masonry {...args}>
    {places.map(place => (
      <Figure key={place}>
        <Image
          src={`https://picsum.photos/seed/${place}`}
          alt={getPlaceName(places)}
        />
        <Caption>
          {getPlaceName(place)}
        </Caption>
      </Figure>
    ))}
  </Masonry>
)
Default.args = {
  columns: 3,
  gap: '20px'
}