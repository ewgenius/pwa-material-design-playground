import * as React from 'react'
import {Component} from 'react'
import {AppBar, Card, CardActions, CardHeader, CardText, FlatButton} from 'material-ui'
import Flex from '../components/Layout/Flex.tsx'
import Scroller from '../components/Layout/Scroller.tsx'

export default class App extends Component<{}, {}> {
  render() {
    return <Flex className='app'>
      <AppBar title='Yopta'/>
      <Flex flow='column'>
        <Scroller vertical>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
            <Card key={i} style={{ margin: 8 }}>
              <CardHeader
                title="Without Avatar"
                subtitle="Subtitle"
                actAsExpander={true}
                showExpandableButton={true}
                />
              <CardActions>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa.Aliquam erat volutpat.Nulla facilisi.
                Donec vulputate interdum sollicitudin.Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>
          ) }
        </Scroller>
      </Flex>
    </Flex>
  }
}