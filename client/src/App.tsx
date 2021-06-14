import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom'
import { AdminPage } from './pages/admin/Admin'
import HomePage from './pages/home/HomePage'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/admin" component={AdminPage} /> */}
        <Route path="/admin/:page" component={AdminPage} />
        <Route exact path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
