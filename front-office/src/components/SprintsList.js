import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { format } from "date-fns";
import { fr } from 'date-fns/locale'

class SprintsList extends Component {

    constructor(props){
        super(props);
        this.state = {
            sprintsArray: props.sprintsArray,
        };
    }

    handleRemove = (id) => {
        this.props.handleRemove(id)
    };

    render() {
        return (<tbody>
        {this.state.sprintsArray.map((sprint, index) => (
            <Row handleRemove={this.handleRemove} sprint={sprint}/>
        ))}
        </tbody>);
    }
}

function Row(props) {
    let sprint = props.sprint;

    let start_date = new Date(sprint.start_date);
    start_date = format(start_date, "d MMMM yyyy", {
        locale: fr
    });

    let end_date = new Date(sprint.end_date);
    end_date = format(end_date, "d MMMM yyyy", {
        locale: fr
    });

    return(
        <tr>
            <td>{sprint.title}</td>
            <td style={{ textAlign:'center' }}>{start_date}</td>
            <td style={{ textAlign:'center' }}>{end_date}</td>
            <td style={{ textAlign:'center' }}>
                {sprint.status == 'TO_DO' ? "à faire" : sprint.status == 'IN_PROGRESS' ? "En cours" : "Terminée"  }
            </td>
            <td style={{ textAlign:'center' }}>
                {/*<a className="mr-3" onClick={ () =>  window.location.href='/backlog/' + sprint._id }>*/}
                <a className="mr-3" href={'/backlog/' + sprint._id }>
                    <i className="fas fa-eye txt-blue btn-hover"></i>
                </a>
                <a className="mr-3" onClick={()=>props.handleRemove(sprint._id)}>
                    <i className="fas fa-edit txt-green btn-hover"></i>
                </a>
                <a onClick={()=>props.handleRemove(sprint._id)}>
                    <i className="fas fa-trash-alt txt-red btn-hover"></i>
                </a>
            </td>
        </tr>
    )
}

export default withRouter(SprintsList )
