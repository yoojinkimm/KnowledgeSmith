import logo from './logo.svg';
import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { LandingPage } from './pages';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
