import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { LandingPage, GameCardPage} from './page';
import React from 'react';

import './App.css';

function App({history}) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          {/* <Route exact path='/tutorial' component={TutorialCardPage} /> */}
          <Route exact path='/game/:language' 
            component={({ match }) => (
              <GameCardPage history={history} language={match.params.language} />
            )} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
