import React, {Component} from 'react'
import Tree from '../../component/Tree';
import axios from "axios";
import CustomersList from "../../components/CustomersList";


class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customersArray: [],
            customersArrayUpdated: false,
        }
    };

    componentDidMount(){
        this.fetchCustomers()
    }

    handleRemove = (id) => {
        axios.delete(
            `/api/v1/customer/remove/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            this.props.history.push("/customer")
        }).catch( error => {
            console.log(error);
        });
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
            if (res.status === 200) {
                this.setState({customersArray: res.data, customersArrayUpdated: true})
            }
        }).catch( error => {
            console.log(error);
        });
    };

    render() {
        return (
            <div className="mt-40">
                <Tree label={"Liste des clients"} href={"../pages/Home.js"}/>
                <div className="tab-content border p-4 bg-white rounded">
                    <table className="table table-bordered table-striped" id="dataTable">
                        <THeader />
                        {(this.state.customersArrayUpdated)
                            ?
                            <CustomersList handleRemove={this.handleRemove} customersArray={this.state.customersArray}/>
                            :
                            <tr style={{textAlign: "center"}}>
                                <th colSpan={9}>
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        }
                    </table>
                    <Navigation />
                </div>
            </div>
        )
    }
}

function THeader() {
    return (
        <thead>
            <tr>
                <th>Dénomination <br/><small>sociale</small></th>
                <th>Adresse</th>
                <th>Nom<br/><small>du contact</small></th>
                <th>Prénom<br/><small>du contact</small></th>
                <th style={{ textAlign:'center' }}>Téléphone<br/></th>
                <th style={{ textAlign:'center' }}>Email</th>
                <th style={{ textAlign:'center' }}>Action(s)</th>
            </tr>
        </thead>
    );
}

function Navigation() {
    return (
        <div className="d-flex bd-highlight">
            <div className="p-2 w-100 bd-highlight">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item disabled">
                            <a className="page-link" href="/">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="/">1</a></li>
                        <li className="page-item"><a className="page-link" href="/">2</a></li>
                        <li className="page-item"><a className="page-link" href="/">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="/">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Customer;