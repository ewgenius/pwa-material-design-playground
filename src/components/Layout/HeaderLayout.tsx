import * as React from 'react'
import {Component, ReactElement} from 'react'
import {AppBar} from 'material-ui'
import Flex from './Flex.tsx'
import Scroller from './Scroller.tsx'

interface HeaderLayoutProps {
  className?: string
  appBar?: ReactElement<any>
}

export default class HeaderLayout extends Component<HeaderLayoutProps, {}> {
  render() {
    return <Flex className={this.props.className}>
      {this.props.appBar}
      <Flex flow='column'>
        {this.props.children}
      </Flex>
    </Flex>
  }
}