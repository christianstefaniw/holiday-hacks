import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Instructions from "./components/Instructions/Instructions";
import ImageSearch from "./components/ImageSearch/ImageSearch"
import './App.css';

function App() {
  return (
      <Router>
          <div className="App">
              <Navbar/>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/instructions" component={Instructions} />
                  <Route path="/imagesearch" component={ImageSearch} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
