import React, { Component } from 'react';
import axios from 'axios';
import logo from "../assets/img/logo.svg";
import logoFooter from "../assets/img/logo-footer.svg";
import logo1 from '../assets/img/icon1.svg';
import logo2 from '../assets/img/icon2.svg';
import logo3 from '../assets/img/icon3.svg';
import logo4 from '../assets/img/icon4.svg';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: ''
        };
    }

    toggleLogin = () => {
        let loginPopover = document.querySelector('#popover-content');
        loginPopover.classList.toggle('hide-popover');
        loginPopover.classList.toggle('is-open-popover-content');
    };

    closeLogin = () => {
        let loginPopover = document.querySelector('#popover-content');
        loginPopover.classList.toggle('hide-popover');
        loginPopover.classList.toggle('is-open-popover-content');
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        axios.post(
            '/api/v1/user/login',
            JSON.stringify(this.state),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            if (res.status === 200) {
                this.props.history.push('/dashboard');
            } else {
                //const error = new Error(res.error);
                //throw error;
            }
        }).catch( error => {
            alert('Error logging in please try again');
        });
    };

    render() {
        return (
            <div className="container-fluid p-0">
                <section className="part-1">
                    <div className="my-container">
                        <div className="item">
                            <a className="navbar-brand" href="/dashboard">
                                <img src={logo} width="137" height="30" className="d-inline-block align-top" alt="" />
                            </a>
                        </div>
                        <div className="item">
                            <button type="button" className="btn btn-outline-login" onClick={this.toggleLogin}>LOGIN</button>

                            <div id="popover-content" className="hide-popover p-4">
                                <div className="arrow_box"></div>
                                <span style={{ position: 'absolute',top: '5px',right: '10px', cursor: 'pointer'}} onClick={this.closeLogin}>X</span>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                            className="form-control"
                                            id="email"
                                            placeholder="Votre email"
                                            required
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Mot de passe</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                            className="form-control"
                                            id="password"
                                            placeholder="Votre mot de passe"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="button button-purple mt-4" style={{ padding:'5px'}}>Se connecter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{height: "75vh", paddingTop:'20vh'}}>
                        <div>
                            <h1 className="pt-5" style={{color: "#34495E", fontFamily:"Arial", fontWeight:'regular', lineHeight:"55px",fontSize: "42px"}}>
                                Où que vous soyez
                                <br/>
                                Restez <b>Freelance</b>
                            </h1>
                            <a className="button button-purple mt-4" href="/register">INSCRIVEZ-VOUS</a>
                        </div>
                    </div>
                    <div>
                        <div className="my-container">
                            <div className="item">
                                <a className="mr-3 social" href="/">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="mr-3 social" href="/">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="social" href="/">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                            <div className="item">
                                <button type="button" className="btn btn-outline-explore">
                                    EXPLORE
                                    <i className="fas fa-angle-down ml-3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="part-2">
                    <div className="container">
                        <div style={{ display: "flex",justifyContent: "center",alignItems: "center", flexDirection: "column"}}>
                            <p className="mt-5">
                                Voici WeDev
                            </p>
                            <p className="mt-4">
                                APPLICATION DE GESTION
                                <br/>
                                DE PROJET POUR LES DEV
                            </p>
                            <p className="mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <div className="mt-5" style={{ display:'flex', justifyContent:'space-between'}}>
                                <div className="option" style={{width: "18rem"}}>
                                    <img className="card-img-top" src={logo1} alt="" />
                                    <p>
                                        Vos reporting
                                        <br/>
                                        centralisés
                                    </p>
                                </div>
                                <div className="option" style={{width: "18rem"}}>
                                    <img className="card-img-top" src={logo2} alt="" />
                                    <p>
                                        Le suivi de vos activités
                                        <br/>
                                        en temps réel
                                    </p>
                                </div>
                                <div className="option" style={{width: "18rem"}}>
                                    <img className="card-img-top" src={logo3} alt="" />
                                    <p>
                                        Un gain de temps
                                        <br/>
                                        pour le pilotage
                                    </p>
                                </div>
                                <div className="option" style={{width: "18rem"}}>
                                    <img className="card-img-top" src={logo4} alt="" />
                                    <p>
                                        Des  utilitaires
                                        <br/>
                                        pour votre dev
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="part-3 d-flex align-items-center">
                    <div className="container" style={{height: '80%' ,maxHeight:'80%'}}>
                        <div className="d-flex justify-content-center" style={{padding: '0 90px'}}>
                            <div className="option">
                                <p>COMMENT ÇA MARCHE ?</p>
                                <p>Tous vos outils de dev réuni sur une
                                    seule application
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className="option">
                                <div className="step d-inline-flex mb-5">
                                    <div className="number position-relative">
                                        <span>1</span>
                                    </div>
                                    <div style={{ marginLeft:"30px" }}>
                                        <h1>Créer vos projets</h1>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                                <div className="step d-inline-flex mb-5">
                                    <div className="number position-relative">
                                        <span>2</span>
                                    </div>
                                    <div style={{ marginLeft:"30px" }}>
                                        <h1>Ajouter vos sprints</h1>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                                <div className="step d-inline-flex mb-5">
                                    <div className="number position-relative">
                                        <span>3</span>
                                    </div>
                                    <div style={{ marginLeft:"30px" }}>
                                        <h1>Affecter vos tâches</h1>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="part-4 d-flex align-items-center">
                    <div style={{width:'100%'}}>
                        <div className="d-flex justify-content-center" >
                            <div style={{ display: "flex",justifyContent: "center",alignItems: "center", flexDirection: "column", width: '70%', height:'354px', maxHeight:'354px', background:'#FFFFFF', boxShadow:'5px 13px 26px 6px rgba(88,88,88,0.5)'}}>
                                <h1>OFFRE DE LANCEMENT</h1>
                                <p>
                                    inscrivez-vous et recevez prochainement
                                    <br/>
                                    un accès premium à l’application WeAreData
                                </p>
                                <button type="button" className="button button-purple px-4" style={{background:'#2ECC71', color:'#fff', marginTop: '15px'}}>JE M’INSCRIS</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="part-5 d-flex justify-content-between">
                    <div className="my-container d-flex justify-content-between align-items-center">
                        <div>
                            <a className="navbar-brand" href="/">
                                <img src={logoFooter} width="137" height="30" className="d-inline-block align-top" alt="" />
                            </a>
                        </div>
                        <div>
                            <p>
                                COPYRIGHT 2020
                            </p>
                        </div>
                        <div className="item">
                            <a className="mr-3 social" href="/">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="mr-3 social" href="/">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="social" href="/">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Index;