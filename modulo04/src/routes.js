import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

// BrowserRouter = Routing Officer
// Switch = Ensures thath only one address is called
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
