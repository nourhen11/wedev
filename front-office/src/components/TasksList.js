import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from "axios";

class TasksList extends Component {

    constructor(props){
        super(props);
        this.state = {
            starredTasks: props.tasksArray,
            draggingRowId: null
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    getItemStyle = (isDragging, draggableStyle) => ({
        background: isDragging && ("lightblue"),
        ...draggableStyle,
    });

    onDragEnd = result => {
        const { destination, source, reason } = result;

        if (!destination || reason === 'CANCEL') {
            this.setState({
                draggingRowId: null,
            });
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const starredTasks = Object.assign([], this.state.starredTasks);
        const task = this.state.starredTasks[source.index];
        starredTasks.splice(source.index, 1);
        starredTasks.splice(destination.index, 0, task);
        this.handleSetOrder(starredTasks);
        this.setState({
            starredTasks
        });
    };

    handleSetOrder = (tasks) => {
        axios.post(
            "/api/v1/task/order",
            JSON.stringify(tasks),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).catch( error => {
            console.log(error);
        });
    };

    handleRemove = () => {
        //this.props.handleRemove(task._id)
    };

    toggleEdit = (taskID) => {
        this.props.toggleEdit(taskID);
    };

    render(){

        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="table">
                    {(provided, snapshot) => (
                        <tbody {...provided.droppableProps} ref={provided.innerRef} style={{border: "1px solid #dee2e6"}}>
                            {this.state.starredTasks.map((task, index) => {
                                return(
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                    {(provided, snapshot) => (
                                        <tr
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={this.getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                            key={task._id}
                                        >
                                            <td>
                                                {task.title}
                                            </td>
                                            <td style={{ textAlign:'center', width:'100px' }}>
                                                {task.status == 'TO_DO' ? "à faire" : task.status == 'IN_PROGRESS' ? "En cours" : "Terminée"  }
                                            </td>
                                            <td style={{ textAlign:'center', width:'20px' }}>
                                                {task.priority == 'HIGH' ? <i className="fas fa-arrow-up txt-red"></i> : task.priority == 'LOW' ? <i className="fas fa-arrow-down txt-green"></i> : <i className="fas fa-arrow-up text-warning"></i>  }
                                            </td>
                                            <td style={{ textAlign:'center', width:'150px' }}>
                                                {/*<a className="mr-3" onClick={ () =>  window.location.href='/backlog/' + sprint._id }>*/}
                                                <a className="mr-3">
                                                    <i className="fas fa-eye txt-blue btn-hover"></i>
                                                </a>
                                                <a className="mr-3" onClick={()=>this.toggleEdit(task._id)}>
                                                    <i className="fas fa-edit txt-green btn-hover"></i>
                                                </a>
                                                <a onClick={()=>this.handleRemove(task._id)}>
                                                    <i className="fas fa-trash-alt txt-red btn-hover"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    )}

                                    </Draggable>
                                )

                            })}
                            {provided.placeholder}
                        </tbody>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default withRouter(TasksList)
