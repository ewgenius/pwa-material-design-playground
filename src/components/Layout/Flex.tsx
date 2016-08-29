import * as React from 'react'

interface FlexProps {
  flex?: number
  flow?: string
  alignItems?: string
  alignContent?: string
  children?: any
  className?: string
}

const Flex = (props: FlexProps) => <div style={{
  display: 'flex',
  flex: props.flex || 1,
  flexFlow: props.flow ||'column',
  alignItems: props.alignItems || 'initial',
  alignContent: props.alignContent || 'initial'
}}>
  {props.children}
</div>

export default Flex