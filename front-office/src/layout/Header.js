import React, {Component} from 'react';
import logo from '../assets/img/logo.svg';

class Header extends Component {
    render() {

        return (
            <div className="fixed-top">
                <nav className="main-header navbar navbar-expand navbar-white navbar-light bg-light p-0 pl-3 mb-0">
                    <a className="navbar-brand" href="/">
                        <img src={logo} width="137" height="30" className="d-inline-block align-top" alt=""/>
                    </a>
                </nav>
            </div>
        );
    }
}

export default Header;