import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class CustomersList extends Component {

    constructor(props){
        super(props);
        this.state = {
            customersArray: props.customersArray,
        };
    }

    handleRemove = (id) => {
        this.props.handleRemove(id)
    };

    render() {
        return (<tbody>
            {this.state.customersArray.map((customer, index) => (
                <Row handleRemove={this.handleRemove} customer={customer}/>
            ))}
        </tbody>);
    }
}

function Row(props) {
    let customer = props.customer;

    return(
        <tr>
            <td>{customer.corporate_name}</td>
            <td>{customer.address}</td>
            <td>{customer.contact_firstname}</td>
            <td>{customer.contact_lastname}</td>
            <td style={{ textAlign:'center' }}>{customer.contact_phone}</td>
            <td style={{ textAlign:'center' }}>{customer.contact_email}</td>
            <td style={{ textAlign:'center'}}>
                <button type="button" rel="tooltip" className="btn btn-info btn-icon btn-sm mr-2">
                    <i className="fa fa-user"></i>
                </button>
                <button type="button" rel="tooltip" className="btn btn-success btn-icon btn-sm mr-2">
                    <i className="fa fa-edit"></i>
                </button>
                <button type="button" rel="tooltip" className="btn btn-danger btn-icon btn-sm mr-2" onClick={()=>props.handleRemove(customer._id)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    )
}

export default withRouter(CustomersList)
