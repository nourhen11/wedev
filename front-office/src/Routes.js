import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import withAuth from './withAuth';

/* Public Routes */
import Index from './pages/Index';
import Register from './pages/Register';

/* Project Routes */
import ListProject from './pages/Project/List';
import AddProject from './pages/Project/Add';
import ShowProject from './pages/Project/Show';

/* Customer Routes */
import Customer from './pages/Customer/Customer';
import AddCustomer from './pages/Customer/AddCustomer';

/* User Routes */
import Dashboard from './pages/User/Dashboard';
import Profile from './pages/User/Profile'

/* User Routes */
import Backlog from './pages/Sprint/Backlog';
//import Sprint from './pages/Sprint/Sprint';

export class Routes extends Component{
    render(){

        let padding_0 = '';
        let path = this.props.pathname;
        if ( path === '/' || path === '/register' ) {
            padding_0 = 'padding_0';
        }

        return (
            <div id="content" className={padding_0}>
                <Switch>
                    <Route path="/" component={Index} exact />
                    <Route path="/register" component={Register}/>
                    
                    <Route path="/dashboard" component={withAuth(Dashboard)} />
                    <Route path="/profile" component={withAuth(Profile)}/>

                    <Route path="/project/add" component={withAuth(AddProject)} />
                    <Route path="/project/show/:id" component={withAuth(ShowProject)} />
                    <Route path="/project" component={withAuth(ListProject)}/>

                    <Route path="/customer/add" component={withAuth(AddCustomer)}/>
                    <Route path="/customer" component={withAuth(Customer)} />

                    <Route path="/backlog/:id" component={withAuth(Backlog)}/>
                    {/*<Route path="/sprint" component={Sprint}/>*/}

                    { /* Catch all route */ }
                    {/*<Route path="*" component={NotFound} status={404} />*/}
                </Switch>
            </div>
        )
    }
}

export default withRouter(Routes);