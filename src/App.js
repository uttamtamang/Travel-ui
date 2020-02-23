import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './components/Dashboard';
import NoMatch from './components/NoMatch';
import UserProfile from './components/UserProfile';
import AddPackage from './components/AddPackage';
import MyPackage from './components/MyPackage';
import AllPackage from './components/ListPackage';
import DetailPackage from './components/DetailPackage';
import EditPackage from './components/EditPackage';


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/profile' component={UserProfile} />
        <PrivateRoute path='/addPackage' component={AddPackage} />
        <PrivateRoute path='/editPackage/:id' component={EditPackage} />
        <PrivateRoute path='/allPackage' component={AllPackage} />
        <PrivateRoute path='/myPackage' component={MyPackage} />
        <PrivateRoute path='/detailPackage/:id' component={DetailPackage} />
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
