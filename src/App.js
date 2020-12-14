import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { LandingPage, GameCardPage, ResultPage, LoginPage, MyPage, LeaderBoardPage, TutorialPage } from './page';
import React from 'react';
import { firestore } from "./firebase";
import UserProvider from './providers/UserProvider';
import './App.css';



function App({history}) {
  return (
    <UserProvider 
    render={
      <div className="App">
        <div className="frame">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            {/* <Route exact path='/tutorial' component={TutorialCardPage} /> */}
            <Route exact path='/game/:language' 
              component={({ match }) => (
                <GameCardPage history={history} language={match.params.language} />
              )} />
            <Route exact path='/result' component={ResultPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/mypage' component={MyPage} />
            <Route exact path='/board' component={LeaderBoardPage} />
            <Route exact path='/tutorial' component={TutorialPage} />
          </Switch>
        </Router>
        </div>
      </div>
    } />
  );
}

export default App;
