import React, { Component } from 'react';

class Sidebar extends Component {


    toggleSidebar = () => {

        let sidebarCollapse = document.querySelector('#sidebarCollapse');
        sidebarCollapse.classList.toggle('active');

        let sidebar = document.querySelector('#sidebar');
        sidebar.classList.toggle('active')

    };

    render() {
        let path = this.props.pathname;
        return (
            <div>
                <nav id="sidebar" className="active">
                    <button type="button" id="sidebarCollapse" className="navbar-btn active" onClick={this.toggleSidebar}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul className="list-unstyled components">
                        <Li path={'dashboard'} icon={'home'} label={'Accueil'} currentPath={path} />
                        <Li path={'profile'} icon={'user'} label={'Mon profil'} currentPath={path} />
                        <LiDropdown path={'customer'} icon={'users'} label={'Mes Clients'} currentPath={path} />
                        <LiDropdown path={'project'} icon={'briefcase'} label={'Mes Projets'} currentPath={path} />
                        <Li path={'logout'} icon={'sign-out-alt'} label={'Se déconnecter'} currentPath={path} />
                    </ul>
                </nav>
            </div>
        );
    }
}

function Li(props) {
    let isCurrent = false;
    if( (props.currentPath).search(props.path) !== -1 ){
        isCurrent = true;
    }

    return (
        <li className={isCurrent ? "active" : ""}>
            <a href={"/"+ props.path}>
                <i className={"fas fa-" + props.icon + " mr-3"}></i>
                <span className="ul-label">{props.label}</span>
            </a>
        </li>
    )
}

function LiDropdown(props) {
    let isCurrent = false;
    if( (props.currentPath).search(props.path) !== -1 ){
        isCurrent = true;
    }
    return (
        <li className={isCurrent ? "active" : ""}>
            <a href={ '#' + props.path + 'Submenu' } data-toggle="collapse" aria-expanded={isCurrent ? 'true' : 'false'} className={isCurrent ? "dropdown-toggle" : "dropdown-toggle collapsed"}>
                <i className={"fas fa-" + props.icon + " mr-3"}></i>
                <span className="ul-label">{props.label}</span>
            </a>
            <ul className={isCurrent ? "collapse list-unstyled show" : "collapse list-unstyled"} id={ props.path + 'Submenu' }>
                <li>
                    <a href={"/"+ props.path + "/add"} className={ props.currentPath.search(props.path + '/add') !== -1 ? "current-path" : ""}>
                        <i className="fas fa-plus i-icon mr-3"></i>
                        Nouveau
                    </a>
                </li>
                <li>
                    <a href={"/"+ props.path} className={ ( props.currentPath.search('add') === -1 && props.currentPath.search(props.path) === 1 ) ? "current-path" : ""}>
                        <i className="fas fa-list i-icon mr-3"></i>
                        Liste
                    </a>
                </li>
            </ul>
        </li>
    )
}

export default Sidebar;

