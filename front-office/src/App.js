import React from 'react';
import { useLocation } from "react-router-dom";

import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Routes from './Routes';

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <HeaderComponent />
                <SidebarComponent />
                <RoutesComponent />
            </div>
        </div>
    );
}

function HeaderComponent() {
    let location = useLocation();
    if( location.pathname !== '/' && location.pathname !== '/register' ){
        return <Header />;
    }
    return null;
}

function SidebarComponent() {
    let location = useLocation();
    if( location.pathname !== '/' && location.pathname !== '/register' ){
        return <Sidebar pathname={location.pathname} />;
    }
    return null;
}

function RoutesComponent() {
    let location = useLocation();
    return <Routes pathname={location.pathname} />;
}

export default App;
