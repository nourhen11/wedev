import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { format } from "date-fns";
import { fr } from 'date-fns/locale'

class ProjectsList extends Component {

    constructor(props){
        super(props);
        this.state = {
            projectsArray: props.projectsArray,
        };
    }

    handleRemove = (id) => {
        this.props.handleRemove(id)
    };

    render() {
        return (<tbody>
            {this.state.projectsArray.map((project, index) => (
                <Row handleRemove={this.handleRemove} project={project}/>
            ))}
        </tbody>);
    }
}

function Row(props) {
    let project = props.project;

    let start_date = new Date(project.start_date);
    start_date = format(start_date, "d MMMM yyyy", {
        locale: fr
    });

    let end_date = new Date(project.end_date);
    end_date = format(end_date, "d MMMM yyyy", {
        locale: fr
    });

    return(
        <tr>
            <td>{project.title}</td>
            <td>{project.customer.corporate_name}</td>
            <td>{project.amount} $</td>
            <td style={{ textAlign:'center', width:'150px' }}>{project.deadlines_realization} <small>jour(s)</small></td>
            <td style={{ textAlign:'center' }}>{start_date}</td>
            <td style={{ textAlign:'center' }}>{end_date}</td>
            <td>
                {project.stacks.map((item, index) => {
                    return (<span className="badge badge-secondary mr-2">{item}</span>)
                })}
            </td>
            <td style={{ textAlign:'center' }}>
                {project.status == 'TO_DO' ? "à faire" : project.status == 'IN_PROGRESS' ? "En cours" : "Terminée"  }
            </td>
            <td style={{ textAlign:'center' }}>
                <a className="mr-3" onClick={ () =>  window.location.href='/project/show/' + project._id }>
                    <i className="fas fa-eye txt-blue btn-hover"></i>
                </a>
                <a className="mr-3" onClick={()=>props.handleRemove(project._id)}>
                    <i className="fas fa-edit txt-green btn-hover"></i>
                </a>
                <a onClick={()=>props.handleRemove(project._id)}>
                    <i className="fas fa-trash-alt txt-red btn-hover"></i>
                </a>
            </td>
        </tr>
    )
}

export default withRouter(ProjectsList)
