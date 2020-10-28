import React, {Component} from 'react'
import Tree from '../../component/Tree';
import axios from "axios";
import SprintsList from "../../components/SprintsList";
import { format } from "date-fns";
import { fr } from 'date-fns/locale'

class Show extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId : this.props.match.params.id,
            project : '',
            projectUpdated: false,
            sprintsArray: false,
            sprintsArrayUpdated: false,
        }
    };

    componentDidMount(){
        this.fetchProject();
        this.fetchSprints();
    }

    handleRemove = (id) => {
        axios.delete(
            `/api/v1/sprint/remove/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            this.props.history.push("/project")
        }).catch( error => {
            console.log(error);
        });
    };

    fetchProject = () => {
        axios.get(
            `/api/v1/project/${this.state.projectId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            if (res.status === 200) {
                let start_date = new Date(res.data.start_date);
                start_date = format(start_date, "d MMMM yyyy", {
                    locale: fr
                });

                let end_date = new Date(res.data.end_date);
                end_date = format(end_date, "d MMMM yyyy", {
                    locale: fr
                });

                res.data.start_date = start_date;
                res.data.end_date = end_date;

                this.setState({project: res.data, projectUpdated: true})
            }
        }).catch( error => {
            console.log(error);
        });
    };

    fetchSprints = () => {
        axios.post(
            '/api/v1/sprint/list',
            JSON.stringify({ projectId : this.state.projectId}),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            if (res.status === 200) {
                this.setState({sprintsArray: res.data, sprintsArrayUpdated: true})
            }
        }).catch( error => {
            console.log(error);
        });
    };

    render() {
        return (
            <div className="mt-40">
                <Tree label={"Détails du projet"} href={"../pages/Home.js"}/>
                <div className="">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-primary card-outline border-top">
                                {(this.state.projectUpdated)
                                    ?
                                    <div className="card-body box-profile">
                                        <h2 className="profile-username text-center">{this.state.project.title}</h2>
                                        <p className="text-muted text-center">
                                            <span className="badge badge-secondary mr-2" style={{fontSize : '0.9rem', background : '#ECF0F1', color:'#34495E'}}>
                                                {this.state.project.status == 'TO_DO' ? "à faire" : this.state.project.status == 'IN_PROGRESS' ? "En cours" : "Terminée"  }
                                            </span>
                                        </p>

                                        <ul className="list-group list-group-unbordered mt-3">
                                            <li className="list-group-item border-0" style={{padding : '.1rem 1.250rem'}}>
                                                <b style={{fontSize : '0.9rem'}}>Client: {this.state.project.customer.corporate_name}</b>
                                            </li>
                                            <li className="list-group-item border-0" style={{padding : '.1rem 1.250rem'}}>
                                                <b style={{fontSize : '0.9rem'}}>Montant du devis : {this.state.project.amount} </b>
                                            </li>
                                            <li className="list-group-item border-0" style={{padding : '.1rem 1.250rem'}}>
                                                <b style={{fontSize : '0.9rem'}}>Coût horaire par jour : {this.state.project.cost_day} </b>
                                            </li>
                                            <li className="list-group-item border-0" style={{padding : '.1rem 1.250rem'}}>
                                                <b style={{fontSize : '0.9rem'}}>Délais de réalisation : {this.state.project.deadlines_realization}</b>
                                            </li>
                                            <li className="list-group-item border-0" style={{padding : '.1rem 1.250rem'}}>
                                                <b style={{fontSize : '0.9rem'}}>Date de début : {this.state.project.start_date}</b>
                                            </li>
                                            <li className="list-group-item border-0" style={{padding : '.1rem 1.250rem'}}>
                                                <b style={{fontSize : '0.9rem'}}>Date de fin : {this.state.project.end_date}</b>
                                            </li>
                                            <li className="list-group-item border-0" style={{padding : '.1rem 1.250rem'}}>
                                                <b style={{fontSize : '0.9rem'}}>Stacks techniques :
                                                    {this.state.project.stacks.map((item, index) => {
                                                        return (<span className="badge badge-secondary mr-2 mb-2" style={{fontSize : '0.9rem'}}>{item}</span>)
                                                    })}
                                                </b>
                                            </li>
                                        </ul>
                                    </div>
                                    :
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content border p-4 bg-white rounded border-top">
                                <table className="table table-bordered table-striped" id="dataTable">
                                    <THeader />
                                    {(this.state.sprintsArrayUpdated)
                                        ?
                                        <SprintsList handleRemove={this.handleRemove} sprintsArray={this.state.sprintsArray}/>
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
                    </div>
                </div>
            </div>
        )
    }
}

function THeader() {
    return (
        <thead>
        <tr>
            <th>Title<br/><small>du sprint</small></th>
            <th style={{ textAlign:'center' }}>Date<br/><small>Début</small></th>
            <th style={{ textAlign:'center' }}>Date<br/><small>Fin</small></th>
            <th style={{ textAlign:'center' }}>Status<br/><small>du sprint</small></th>
            <th style={{ textAlign:'center' }}>Action(s)<br/><small>&nbsp;</small></th>
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

export default Show;