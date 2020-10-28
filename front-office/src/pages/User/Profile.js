import React, {Component} from 'react'
import Tree from '../../component/Tree';
import Button from '../../component/Button';
import axios from "axios";


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname : '',
            firstname : '',
            profile: '',
            email: '',
            phone: '',
            company: '',
            siret: '',
            company_status: '',
            errors: {
                lastname : false,
                firstname : false,
                profile: false,
                email: false,
                phone: false,
                company: false,
                siret: false,
                company_status: false
            },
            profileUpdated: false,
        };
    }

    componentDidMount(){
        this.fetchUser()
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });

        let target = document.querySelector(`#${name}`);
        if( value === '' ){
            if (target.classList.contains('is-valid')){
                target.classList.toggle('is-valid');
            }
            if ( !target.classList.contains('is-invalid')){
                target.classList.toggle('is-invalid');
            }

            let errors = this.state.errors;
            let error = { [name] : true };
            Object.assign(errors, error);

        } else {
            if (target.classList.contains('is-invalid')){
                target.classList.toggle('is-invalid');
            }
            if ( !target.classList.contains('is-valid')){
                target.classList.toggle('is-valid');
            }
            let errors = this.state.errors;
            let error = { [name] : false };
            Object.assign(errors, error);
        }

    };

    validateForm = () => {
        for (let [key, value] of Object.entries(this.state.errors)) {
            if(value === true || value === '' ){
                let target = document.querySelector(`#${key}`);
                if ( !target.classList.contains('is-invalid')){
                    target.classList.toggle('is-invalid');
                }
                return false
            }
        }
        return true;
    };

    onSubmit = (event) => {
        event.preventDefault();
        if(this.validateForm()){
            let data = {
                lastname: this.state.lastname,
                firstname: this.state.firstname,
                profile: this.state.profile,
                phone: this.state.phone,
                company: this.state.company,
                siret: this.state.siret,
                company_status: this.state.company_status
            };

            axios.post(
                '/api/v1/user/edit',
                JSON.stringify(data),
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
        } else {
            alert('Veuillez remplir tous les champs obligatoires')
        }

    };

    fetchUser = () => {
        axios.get(
            '/api/v1/user/',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            if (res.status === 200) {
                console.log(res.data);
                this.setState({
                    lastname : res.data.lastname,
                    firstname : res.data.firstname,
                    profile: res.data.profile,
                    email: res.data.email,
                    phone: res.data.phone,
                    company: res.data.company,
                    siret: res.data.siret,
                    company_status: res.data.company_status,
                    profileUpdated: true
                })
            }
        }).catch( error => {
            console.log(error);
        });
    };

    render() {
        console.log(this.state.company_status);
        return (
            <div className="mt-40">
                <Tree label={"Profile"} href={"../pages/Home.js"}/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="tab-content border bg-white rounded p-4 px-5">
                            {(this.state.profileUpdated)
                                ?
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="lastname">Nom</label>
                                            <input
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                name="lastname"
                                                className="form-control"
                                                id="lastname"
                                                placeholder="Votre nom"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                * Champ obligatoire
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="firstname">Prénom</label>
                                            <input
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                name="firstname"
                                                className="form-control"
                                                id="firstname"
                                                placeholder="Votre prénom"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                * Champ obligatoire
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="profile">Profil</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="inputGroupProfil"><i className="fas fa-user"></i></span>
                                                </div>
                                                <input
                                                    value={this.state.profile}
                                                    onChange={this.handleInputChange}
                                                    type="text"
                                                    name="profile"
                                                    className="form-control"
                                                    id="profile"
                                                    placeholder="Votre profil"
                                                    aria-describedby="inputGroupProfil"
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    * Champ obligatoire
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="email">Email</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="inputGroupEmail"><i className="fas fa-envelope"></i></span>
                                                </div>
                                                <input
                                                    value={this.state.email}
                                                    onChange={this.handleInputChange}
                                                    type="text"
                                                    name="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Votre email"
                                                    aria-describedby="inputGroupEmail"
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    * Champ obligatoire
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="phone">Téléphone</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="inputGroupPhone"><i className="fas fa-phone-volume"></i></span>
                                                </div>
                                                <input
                                                    value={this.state.phone}
                                                    onChange={this.handleInputChange}
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    id="phone"
                                                    placeholder="Votre téléphone"
                                                    aria-describedby="inputGroupPhone"
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    * Champ obligatoire
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="company">Nom de votre société</label>
                                            <input
                                                value={this.state.company}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                name="company"
                                                className="form-control"
                                                id="company"
                                                placeholder="Nom de votre société"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                * Champ obligatoire
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="siret">Numéro SIRET</label>
                                            <input
                                                value={this.state.siret}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                name="siret"
                                                className="form-control"
                                                id="siret"
                                                placeholder="SIRET de votre société"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                * Champ obligatoire
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="email">Statut de votre société</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="inputGroupPrepend"><i className="fas fa-chevron-down"></i></span>
                                                </div>
                                                <select
                                                    value={this.state.company_status}
                                                    onChange={this.handleInputChange.bind(this)}
                                                    name="company_status"
                                                    className="custom-select"
                                                    id="company_status"
                                                    required
                                                >
                                                    <option value="" selected disabled>-- Veuillez choisir un statut --</option>

                                                    <Option value={'SAS'} selected={this.state.company_status}/>
                                                    <Option value={'SASU'} selected={this.state.company_status}/>
                                                    <Option value={'autoentrepreneur'} selected={this.state.company_status}/>
                                                    <Option value={'EURL'} selected={this.state.company_status}/>
                                                    <Option value={'SARL'} selected={this.state.company_status}/>
                                                </select>
                                                <div className="invalid-feedback">
                                                    * Champ obligatoire
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button type={"submit"} color={"green"} label={"Mettre à jour mes coordonnées"}/>
                                </form>
                                :
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Option(props) {
    let selected = props.selected === props.value ? true : false;
    return <option value={props.value} selected={ selected }>{props.value}</option>
}
