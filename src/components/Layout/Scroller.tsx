import * as React from 'react'

interface ScrollerProps {
  horizontal?: boolean
  vertical?: boolean
  children?: any
  className?: string
}

const Scroller = (props: ScrollerProps) => <div style={{
  flex: 1,
  overflowX: props.horizontal ? 'auto' : 'hidden',
  overflowY: props.vertical ? 'auto' : 'hidden'
}}>
  {props.children}
</div>

export default Scroller