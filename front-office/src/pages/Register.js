import React, {Component} from 'react'
import logo from "../assets/img/logo.svg";

class Register extends Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <section className="partregister">
                    <div className="my-container" style={{marginRight: 400}}>
                        <div className="item">
                            <a className="navbar-brand" href="/">
                                <img src={logo} width="137" height="30" className="d-inline-block align-top" alt=""/>
                            </a>
                        </div>

                        <form className="splash-container">
                            <div className="card">
                                <div className="card-header">
                                    <img src={logo} width="137" height="30" className="d-inline-block align-top" alt=""/>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <input className="form-control form-control-lg" type="text" name="nom" required
                                               placeholder="Nom " autoComplete="off"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control form-control-lg" type="text" name="prenom"
                                               required placeholder="Prénom " autoComplete="off"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control form-control-lg" type="email" name="email"
                                               required placeholder="E-mail" autoComplete="off"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control form-control-lg" type="text" name="Siret"
                                               required placeholder="SIRET" autoComplete="off"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control form-control-lg" type="tel" name="phone" required
                                               placeholder="Téléphone" autoComplete="off"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control form-control-lg" id="city" type="city" required
                                               placeholder="Adresse"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control form-control-lg" type="text" name="sociaty"
                                               required placeholder="société " autoComplete="off"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="country">Statut</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="inlineRadio1"
                                                       defaultValue="option1"/>
                                                <label className="form-check-label" htmlFor="inlineRadio1">SAS</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="inlineRadio2"
                                                       defaultValue="option2"/>
                                                <label className="form-check-label" htmlFor="inlineRadio2">SASU</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="inlineRadio2"
                                                       defaultValue="option2"/>
                                                <label className="form-check-label"
                                                       htmlFor="inlineRadio2">Autoentrepreneur</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="inlineRadio2"
                                                       defaultValue="option2"/>
                                                <label className="form-check-label" htmlFor="inlineRadio2">EURL</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="inlineRadio2"
                                                       defaultValue="option2"/>
                                                <label className="form-check-label" htmlFor="inlineRadio2">SARL</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">Profil</label>
                                        <select className="custom-select d-block w-100" id="country" required>
                                            <option value>Développeur...</option>
                                            <option>Front</option>
                                            <option>Back</option>
                                            <option>Data Analyst</option>
                                            <option>QA</option>
                                        </select>
                                    </div>

                                    <div className="form-group pt-2">
                                        <button className="btn btn-block btn-primary" type="submit"> Inscription
                                        </button>
                                    </div>

                                </div>
                                <div className="card-footer bg-white">
                                    <p>Vous avez déjà un compte ? <a href="/" className="text-secondary">Connectez-vous
                                        ici.</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

            </div>
        )
    }
}
export default Register;