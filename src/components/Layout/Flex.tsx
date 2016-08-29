import * as React from 'react'

interface FlexProps {
  flex?: number
  flow?: string
  alignItems?: string
  alignContent?: string
  alignSelf?: string
  width?: number
  children?: any
  className?: string
}

const Flex = (props: FlexProps) => <div style={{
  display: 'flex',
  flex: props.flex || 1,
  flexFlow: props.flow ||'column',
  alignItems: props.alignItems || 'initial',
  alignContent: props.alignContent || 'initial',
  alignSelf: props.alignSelf || 'initial',
  maxWidth: props.width
}}>
  {props.children}
</div>

export default Flex