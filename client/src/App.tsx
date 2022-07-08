import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from 'react-router-dom'
// import loadable from '@loadable/component'
import QaPage from './pages/qa'

// const QaPage = loadable(() => import('./pages/qa'))

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/qa" component={QaPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
