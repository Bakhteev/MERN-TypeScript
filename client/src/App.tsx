import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import { AdminTop } from './pages/Admin'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/admin" component={AdminTop} />
      </Switch>
    </Router>
  )
}

export default App
