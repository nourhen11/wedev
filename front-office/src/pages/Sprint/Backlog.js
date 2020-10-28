import React, {Component} from 'react'
import Tree from '../../component/Tree';
import axios from "axios";
import TasksList from "../../components/TasksList";
import { format } from "date-fns";
import { fr } from 'date-fns/locale'
import Button from "../../component/Button";

class Backlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sprintId : this.props.match.params.id,
            sprint : '',
            sprintUpdated: false,
            tasksArray: false,
            tasksArrayUpdated: false,
            task : '',
            taskUpdated: false,
        };
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        let task = this.state.task;
        task[name] = value;
        this.setState({task : task});
    };

    componentDidMount(){
        this.fetchSprint();
        this.fetchTasks();
    }

    handleRemove = (id) => {
        axios.delete(
            `/api/v1/task/remove/${id}`,
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

    fetchSprint = () => {
        axios.get(
            `/api/v1/sprint/${this.state.sprintId}`,
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

                this.setState({sprint: res.data, sprintUpdated: true})
            }
        }).catch( error => {
            console.log(error);
        });
    };

    fetchTasks = () => {
        axios.post(
            '/api/v1/task/list',
            JSON.stringify({ sprintId : this.state.sprintId}),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            if (res.status === 200) {
                this.setState({tasksArray: res.data, tasksArrayUpdated: true})
            }
        }).catch( error => {
            console.log(error);
        });
    };

    fetchTask = (taskID) => {
        axios.get(
            `/api/v1/task/${taskID}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            if (res.status === 200) {
                this.setState({task: res.data, taskUpdated: true})
            }
        }).catch( error => {
            console.log(error);
        });
    };

    toggleEdit = (taskID) => {
        if(taskID !== undefined){
            this.fetchTask(taskID);
        }
        let loginPopover = document.querySelector('#task-content');
        loginPopover.classList.toggle('hide-task');
        loginPopover.classList.toggle('is-open-task-content');
    };

    onSubmit = (event) => {
        console.log(this.state.task)
        event.preventDefault();
        axios.put(
            `/api/v1/task/edit/${this.state.task._id}`,
            JSON.stringify(this.state.task),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(res => {
            this.props.history.push(`/backlog/${this.state.task.sprint}`);
            this.fetchTasks()
        }).catch(error => {
            console.log(error);
            alert('Error logging in please try again');
        });
    }

    render() {
        return (
            <div className="mt-40">
                <Tree label={"Backlog"} href={"../pages/Home.js"}/>
                <TaskContent handleInputChange={this.handleInputChange} task={this.state.task} taskUpdated={this.state.taskUpdated} onSubmit={this.onSubmit}  toggleEdit={this.toggleEdit} />
                <div className="">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-primary card-outline border-top">
                                {(this.state.sprintUpdated)
                                    ?
                                    <div className="card-body box-profile">
                                        <h2 className="profile-username text-center">{this.state.sprint.title}</h2>
                                        <p className="text-muted text-center">
                                            <span className="badge badge-secondary mr-2" style={{fontSize : '0.9rem', background : '#ECF0F1', color:'#34495E'}}>
                                                {this.state.sprint.status == 'TO_DO' ? "à faire" : this.state.sprint.status == 'IN_PROGRESS' ? "En cours" : "Terminée"  }
                                            </span>
                                        </p>

                                        <ul className="list-group list-group-unbordered mt-3">
                                            <li className="list-group-item border-0" style={{padding : '.1rem 1.250rem'}}>
                                                <b style={{fontSize : '0.9rem'}}>Date de début : {this.state.sprint.start_date}</b>
                                            </li>
                                            <li className="list-group-item border-0" style={{padding : '.1rem 1.250rem'}}>
                                                <b style={{fontSize : '0.9rem'}}>Date de fin : {this.state.sprint.end_date}</b>
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
                            <div className="tab-content border px-4 pt-2 pb-4 bg-white rounded border-top">
                                <div className="row">
                                    <div className="col-md-8 d-flex align-items-center">
                                        <small className='txt-blue' style={{fontSize: '.7rem'}}>
                                            <i className="fas fa-lightbulb mr-2 txt-green" style={{fontSize: '.7rem'}}></i>
                                            Pour changer la priorité de vos tickets utiliser le Drap&Drop
                                        </small>
                                    </div>
                                    <div className="col-md-4 d-flex flex-row-reverse">
                                        <Button type={"button"} color={"green"} label={"Ajouter un ticket"}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-hover mt-2" id="dataTable">
                                            {(this.state.tasksArrayUpdated)
                                                ?
                                                <TasksList toggleEdit={this.toggleEdit} handleRemove={this.handleRemove} tasksArray={this.state.tasksArray}/>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function TaskContent(props) {
    return(
        <div id="task-content" className="hide-task p-4">
            <span
                style={{
                    background: '#34495E',
                    display: 'inline-block',
                    width: '40px',
                    height: '40px',
                    borderRadius: '40px',
                    textAlign: 'center',
                    position: 'absolute',
                    top: 'calc( 50vh - 20px)',
                    right: '530px',
                    cursor: 'pointer'
                }}
                onClick={() => props.toggleEdit()}>
                <i className="fas fa-angle-right text-white" style={{fontSize: '35px', paddingTop: '5px'}}></i>
            </span>

            {(props.taskUpdated)
                ?
                <form onSubmit={props.onSubmit}>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="company">Titre</label>
                            <input
                                value={props.task.title}
                                onChange={props.handleInputChange}
                                type="text"
                                name="title"
                                className="form-control"
                                id="title"
                                placeholder="Le nom de la tâche"
                                required
                            />
                            <div className="invalid-feedback">
                                * Champ obligatoire
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="company">Description</label>
                            <textarea
                                value={props.task.description}
                                onChange={props.handleInputChange}
                                name="description"
                                className="form-control"
                                id="description"
                                placeholder="Description"
                                required
                            >
                        </textarea>
                            <div className="invalid-feedback">
                                * Champ obligatoire
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="company">Temps de réalisation (heure)</label>
                            <input
                                value={props.task.time_realization}
                                onChange={props.handleInputChange}
                                type="text"
                                name="time_realization"
                                className="form-control"
                                id="time_realization"
                                placeholder="Temps de réalisation (heure)"
                                required
                            />
                            <div className="invalid-feedback">
                                * Champ obligatoire
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="email">Priorité</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend"><i
                                    className="fas fa-chevron-down"></i></span>
                                </div>
                                <select
                                    value={props.task.priority}
                                    onChange={props.handleInputChange.bind(this)}
                                    name="priority"
                                    className="custom-select"
                                    id="priority"
                                    required
                                >
                                    <option value="" selected disabled>-- Veuillez choisir la priorité de ce ticket--
                                    </option>
                                    <Option value={'HIGH'} label={'Elevée'} selected={props.task.status}/>
                                    <Option value={'MEDIUM'} label={'Moyenne'} selected={props.task.status}/>
                                    <Option value={'LOW'} label={'Faible'} selected={props.task.status}/>
                                </select>
                                <div className="invalid-feedback">
                                    * Champ obligatoire
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="email">Statut</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend"><i
                                    className="fas fa-chevron-down"></i></span>
                                </div>
                                <select
                                    value={props.task.status}
                                    onChange={props.handleInputChange.bind(this)}
                                    name="status"
                                    className="custom-select"
                                    id="status"
                                    required
                                >
                                    <option value="" selected disabled>-- Veuillez choisir un statut pour ce ticket --
                                    </option>
                                    <Option value={'TO_DO'} label={'A faire'} selected={props.task.status}/>
                                    <Option value={'IN_PROGRESS'} label={'En cours'} selected={props.task.status}/>
                                    <Option value={'DONE'} label={'Terminée'} selected={props.task.status}/>
                                </select>
                                <div className="invalid-feedback">
                                    * Champ obligatoire
                                </div>
                            </div>
                        </div>

                    </div>
                    <Button type={"submit"} color={"green"} label={"Sauvegarder"}/>
                </form>
                :
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }

        </div>
    )
}

function Option(props) {
    return <option value={props.value}>{props.label}</option>
}

export default Backlog;