import React, {Component} from 'react'
import Tree from '../../component/Tree';
import axios from "axios";
import ProjectsList from "../../components/ProjectsList";


class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectsArray: [],
            projectsArrayUpdated: false,
        }
    };

    componentDidMount(){
        this.fetchProjects()
    }

    handleRemove = (id) => {
        axios.delete(
            `/api/v1/project/remove/${id}`,
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

    fetchProjects = () => {
        axios.get(
            '/api/v1/project/list',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            if (res.status === 200) {
                this.setState({projectsArray: res.data, projectsArrayUpdated: true})
            }
        }).catch( error => {
            console.log(error);
        });
    };

    render() {
        return (
            <div className="mt-40">
                <Tree label={"Liste des projets"} href={"../pages/Home.js"}/>
                <div className="tab-content border p-4 bg-white rounded">
                    <table className="table table-bordered table-striped" id="dataTable">
                        <THeader />
                        {(this.state.projectsArrayUpdated)
                            ?
                            <ProjectsList handleRemove={this.handleRemove} projectsArray={this.state.projectsArray}/>
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
                <th>Title<br/><small>du projet</small></th>
                <th>Dénomination<br/><small>sociale du client</small></th>
                <th style={{ textAlign:'center' }}>Montant<br/><small>du devis</small></th>
                <th style={{ textAlign:'center' }}>Délais<br/><small>de réalisation</small></th>
                <th style={{ textAlign:'center' }}>Date<br/><small>Début</small></th>
                <th style={{ textAlign:'center' }}>Date<br/><small>Fin</small></th>
                <th>Stacks<br/><small>techniques</small></th>
                <th style={{ textAlign:'center' }}>Status<br/><small>du projet</small></th>
                <th>Action(s)</th>
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

export default List;