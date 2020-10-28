import React, {Component} from 'react'
import Tree from '../../component/Tree';
import Button from "../../component/Button";
import axios from "axios";
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css';


export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            customer : '',
            amount: '',
            cost_day: '',
            deadlines_realization: '',
            start_date: '',
            end_date: '',
            status: '',
            stacks: [],
            defaultStacks: [ "JavaScript", "Python", "Java", "C++", "C", "PHP", "C#", "Shell", "TypeScript", "Ruby", "Swift", "Kotlin", "PowerShell" ],
            errors: {
                title : false,
                customer : false,
                amount: false,
                cost_day: false,
                deadlines_realization: false,
                start_date: false,
                end_date: false,
                status: false,
                stacks: false
            },
            customersArray : [],
        };
    }

    componentDidMount(){
        this.fetchCustomers()
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

    fetchCustomers = () => {
        axios.get(
            '/api/v1/customer/list',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            console.log(res);

            if (res.status === 200) {
                this.setState({
                    customersArray : res.data
                })
            }
        }).catch( error => {
            console.log(error);
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        if(this.validateForm()){
            let data = {
                title: this.state.title,
                customer: this.state.customer,
                amount: this.state.amount,
                cost_day: this.state.cost_day,
                deadlines_realization: this.state.deadlines_realization,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                status: this.state.status,
                stacks: this.state.stacks
            };

            axios.post(
                '/api/v1/project/add',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then( res => {
                if (res.status === 200) {
                    this.props.history.push('/project');
                } else {
                    //const error = new Error(res.error);
                    //throw error;
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
                <Tree label={"Ajouter un projet"} href={"../pages/Home.js"}/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="tab-content border bg-white rounded p-4 px-5">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="lastname">Nom</label>
                                        <input
                                            value={this.state.title}
                                            onChange={this.handleInputChange}
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            id="title"
                                            placeholder="Nom du projet"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            * Champ obligatoire
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="email">Client <a href="/customer/add"><small>( <i className="fas fa-user-plus mr-1 text-success"></i> Ajouter un ? )</small></a></label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupPrepend"><i className="fas fa-chevron-down"></i></span>
                                            </div>
                                            <select
                                                value={this.state.customer}
                                                onChange={this.handleInputChange.bind(this)}
                                                name="customer"
                                                className="custom-select"
                                                id="customer"
                                                required
                                            >
                                                <option value="" selected disabled>-- Veuillez choisir un client --</option>
                                                { this.state.customersArray.map((item) => {
                                                    return(
                                                        <Option value={item._id} label={item.corporate_name}/>
                                                    )
                                                })}
                                            </select>
                                            <div className="invalid-feedback">
                                                * Champ obligatoire
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-7 mb-3">
                                        <label htmlFor="profile">Montant du devis</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupProfil"><i className="fas fa-euro-sign"></i></span>
                                            </div>
                                            <input
                                                value={this.state.amount}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                name="amount"
                                                className="form-control"
                                                id="amount"
                                                placeholder="Montant du devis"
                                                aria-describedby="inputGroupProfil"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                * Champ obligatoire
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <label htmlFor="profile">Coût horaire par jour</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupProfil"><i className="fas fa-euro-sign"></i></span>
                                            </div>
                                            <input
                                                value={this.state.cost_day}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                name="cost_day"
                                                className="form-control"
                                                id="cost_day"
                                                placeholder="Coût horaire par jour"
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
                                        <label htmlFor="lastname">Délais de réalisation <small>(Jour)</small></label>
                                        <input
                                            value={this.state.deadlines_realization}
                                            onChange={this.handleInputChange}
                                            type="text"
                                            name="deadlines_realization"
                                            className="form-control"
                                            id="deadlines_realization"
                                            placeholder="Délais de réalisation"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            * Champ obligatoire
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="email">Date de début</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupEmail"><i className="fas fa-calendar-week"></i></span>
                                            </div>
                                            <input
                                                value={this.state.start_date}
                                                onChange={this.handleInputChange}
                                                type="date"
                                                name="start_date"
                                                className="form-control"
                                                id="start_date"
                                                placeholder="Date de début"
                                                aria-describedby="inputGroupEmail"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                * Champ obligatoire
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="phone">Date de fin</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupPhone"><i className="fas fa-calendar-week"></i></span>
                                            </div>
                                            <input
                                                value={this.state.end_date}
                                                onChange={this.handleInputChange}
                                                type="date"
                                                name="end_date"
                                                className="form-control"
                                                id="end_date"
                                                placeholder="Date de fin"
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
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="email">Statut</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupPrepend"><i className="fas fa-chevron-down"></i></span>
                                            </div>
                                            <select
                                                value={this.state.status}
                                                onChange={this.handleInputChange.bind(this)}
                                                name="status"
                                                className="custom-select"
                                                id="status"
                                                required
                                            >
                                                <option value="" selected disabled>-- Veuillez choisir un statut pour ce projet --</option>
                                                <Option value={'in_progress'} label={'En cours'} selected={this.state.status}/>
                                                <Option value={'realized'} label={'Réalisé'} selected={this.state.status}/>
                                            </select>
                                            <div className="invalid-feedback">
                                                * Champ obligatoire
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="company">Stacks techniques</label>
                                        <Multiselect
                                            data={this.state.defaultStacks}
                                            value={this.state.stacks}
                                            allowCreate="onFilter"
                                            onCreate={stack => this.setState({ stacks: [...this.state.stacks, stack] })}
                                            onChange={stacks => this.setState({ stacks })}
                                            textField="name"
                                            id="stacks"
                                            name="stacks"
                                        />
                                        <div className="invalid-feedback">
                                            * Champ obligatoire
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

function Option(props) {
    return <option value={props.value}>{props.label}</option>
}