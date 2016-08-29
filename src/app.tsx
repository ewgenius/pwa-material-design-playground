import * as React from 'react'
import {render} from 'react-dom'
import * as configure from 'react-tap-event-plugin'
import './styles/main.scss'

import App from './components/App.tsx'

configure()

const container = document.querySelector('#root')

render(<App />, container)