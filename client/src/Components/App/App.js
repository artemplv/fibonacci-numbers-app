import React from 'react';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Landing } from '../Landing/Landing';
import DbHistory from '../DbHistory/DbHistory';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <p>Fibonacci numbers</p>
          </Link>
        </header>
        <Route exact path="/" component={Landing} />
        <Route path="/history" component={DbHistory} />
      </div>
    </Router>
  );
}

export default App;
