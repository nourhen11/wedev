import React, {Component} from 'react'
import Tree from '../../component/Tree';
import Button from "../../component/Button";
import axios from "axios";

export default class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            corporate_name : "",
            address: "",
            contact_firstname: "",
            contact_lastname : "",
            contact_phone : "",
            contact_email : "",
            errors: {
                corporate_name : false,
                address: false,
                contact_firstname: false,
                contact_lastname : false,
                contact_phone : false,
                contact_email : false
            }
        };
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
                corporate_name : this.state.corporate_name,
                address: this.state.address,
                contact_firstname: this.state.contact_firstname,
                contact_lastname : this.state.contact_lastname,
                contact_phone : this.state.contact_phone,
                contact_email : this.state.contact_email,
            };

            axios.post(
                '/api/v1/customer/add',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then( res => {
                if (res.status === 200) {
                    this.props.history.push('/customer');
                }
            }).catch( error => {
                console.log(error);
                alert('Error logging in please try again');
            });
        } else {
            alert('Veuillez remplir tous les champs obligatoires')
        }

    };

    render() {
        return (
            <div className="mt-40">
                <Tree label={"Ajouter un client"} href={"../pages/Home.js"}/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="tab-content border bg-white rounded p-4 px-5">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="lastname">Dénomination sociale</label>
                                        <input
                                            value={this.state.corporate_name}
                                            onChange={this.handleInputChange}
                                            type="text"
                                            name="corporate_name"
                                            className="form-control"
                                            id="corporate_name"
                                            placeholder="Dénomination sociale de votre client"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            * Champ obligatoire
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="lastname">Adresse</label>
                                        <input
                                            value={this.state.address}
                                            onChange={this.handleInputChange}
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            id="address"
                                            placeholder="Adresse de votre client"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            * Champ obligatoire
                                        </div>
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastname">Nom du contact</label>
                                        <input
                                            value={this.state.contact_firstname}
                                            onChange={this.handleInputChange}
                                            type="text"
                                            name="contact_firstname"
                                            className="form-control"
                                            id="contact_firstname"
                                            placeholder="Nom du contact"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            * Champ obligatoire
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstname">Prénom du contact</label>
                                        <input
                                            value={this.state.contact_lastname}
                                            onChange={this.handleInputChange}
                                            type="text"
                                            name="contact_lastname"
                                            className="form-control"
                                            id="contact_lastname"
                                            placeholder="Prénom du contact"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            * Champ obligatoire
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
                                                value={this.state.contact_email}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                name="contact_email"
                                                className="form-control"
                                                id="contact_email"
                                                placeholder="Email de votre client"
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
                                                value={this.state.contact_phone}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                name="contact_phone"
                                                className="form-control"
                                                id="contact_phone"
                                                placeholder="Téléphone de votre client"
                                                aria-describedby="inputGroupPhone"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                * Champ obligatoire
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button type={"submit"} color={"green"} label={"Ajouter"}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
