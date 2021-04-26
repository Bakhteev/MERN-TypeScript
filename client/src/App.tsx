import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom'
import { AdminTop } from './pages/Admin'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin" component={AdminTop} />
      </Switch>
    </Router>
  )
}

export default App
