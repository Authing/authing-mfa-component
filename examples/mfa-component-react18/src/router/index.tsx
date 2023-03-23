import * as React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MFA from '../pages/MFA'

export default function RouterComponent() {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/">
          <MFA />
        </Route>
      </Switch>
    </Router>
  )
}
