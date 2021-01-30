import PopoverAnchor from '.'

export default {
  title: 'UI/Popover',
  component: PopoverAnchor,
  argTypes: {
    content: { control: { disable: true } },
    contentId: { control: { disable: true } },
    as: { control: { disable: true } },
  }
}

const PopoverContent = () => (
  <div style={{
    padding: '10px',
    border: 'solid thin #ddd',
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 5px rgb(0 0 0 /.1)'
    }}>
    <h3>Well hello there!</h3>
    <p>Go on about your business</p>
  </div>
)

const Template = args => {
  return (
    <p style={{ textAlign: 'center' }}>
      <PopoverAnchor {...args}>
        Click to show popover
      </PopoverAnchor>
    </p>
  )
}

export const Default = Template.bind({})
Default.args = {
  arrow: true,
  placement: 'bottom',
  align: 'center',
  content: <PopoverContent />
}