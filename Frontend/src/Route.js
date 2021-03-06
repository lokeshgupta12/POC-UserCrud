import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { HashRouter, Switch } from 'react-router-dom';
import SideBarTitleBar from './components/Sidebar';
import Login from './components/Login';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import PrivateRoute from './PrivateRoute';
import { Redirect } from 'react-router-dom';
import { login } from './actions/loginLogoutActions';
import { getToken } from './utility/localStorageUtility';


// defiend admin route
const AdminRoute = (props) => 
<div>
    <SideBarTitleBar {...props} />
    <Switch>
            <Route path={props.match.url + '/adduser'} exact component={AddUser} />   
            <Route path={props.match.url + '/adduser/:id'} exact component={AddUser} />
            <Route path={props.match.url + '/home'} exact component={UserList} />
            <Redirect to={props.match.url + '/home'} />
    </Switch>
</div>;

// defined root route
const RootApp = ({ login}) => {
    // set redux state for login detail from localstorage
    var token = getToken();    
    if(token && token != null)
    login({token});

    return (
        <HashRouter>
            <Switch>
                <Route path='/login' exact component={Login} />
                <PrivateRoute path='/admin' component={AdminRoute} />  
                <Redirect to={'/login'} />              
            </Switch>
        </HashRouter>
    );
}

export default connect(null, { login })(RootApp);