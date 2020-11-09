import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { LandingPage, GameCardPage, TutorialCardPage } from './pages';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/tutorial' component={TutorialCardPage} />
          <Route exact path='/game' component={GameCardPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
