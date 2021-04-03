import AspectRatio from '.'

export default {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  argTypes: {
    as: { control: { disable: true } },
  }
}

const Template = ({ text, ...args }) => {
  return (
    <p>
      <AspectRatio
        {...args}
        style={{
          background: '#eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {text}
      </AspectRatio>
    </p>
  )
}

export const Square = Template.bind({})
Square.args = {
  width: 200,
  ratio: '1:1',
  text: 'square'
}

export const Portrait = Template.bind({})
Portrait.args = {
  width: 200,
  ratio: '1:1',
  text: 'portrait'
}

export const Landscape = Template.bind({})
Landscape.args = {
  width: 200,
  ratio: '1:1',
  text: 'Landscape - YouTube'
}
