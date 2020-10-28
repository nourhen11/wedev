import React, { Component } from 'react';
import TasksList from '../../components/TasksList';
import { withRouter } from 'react-router-dom';
import axios from "axios";

class SprinXXX extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {"project_id" :"5e7dd109cdd88d28b8511df0"},
            taskArray: [],
            taskArrayUpdated: false,
        }
    };

    componentDidMount(){
        this.fetchProjects()
    }

    fetchProjects = () => {
        axios.post(
            '/api/v1/sprint/list',
            JSON.stringify(this.state.project),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( res => {
            if (res.status === 200) {
                this.setState({taskArray: res.data, taskArrayUpdated: true})
            }
        }).catch( error => {
            console.log(error);
        });
    };

    removeFavorite = (projectId) => {
        const userId = localStorage.userid;
        const url = `/api/v1/project/remove/${projectId}`;
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: userId, project_id: projectId})
        };
        fetch(url, headers)
            .then(res=>res.json())
            .then(json => {
                if(json.error){
                    alert(`Could not remove project: ${json["error"]}`)
                } else{
                    alert(json["message"])
                    this.fetchProjects()
                }
            })
    };

    render() {
        return(
            <div className="mt-40">
                {(this.state.taskArrayUpdated)
                    ? <TasksList removeFavorite={this.removeFavorite} taskArray={this.state.taskArray}/>
                    :
                    <div style={{padding: "30px" }}>
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Date de début</th>
                                <th>Date de fin</th>
                                <th>Statut</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr style={{textAlign: "center"}}>
                                    <th colSpan={5}>Pas de tickets</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(SprinXXX)
