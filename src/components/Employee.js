import React, { Component } from 'react';

export default class Employee extends Component{
    onEmployeeClick(e){
        this.props.onEmpClick();
        e.stopPropagation();
    }
    onEmployeeRemove(e){
        this.props.onEmpRemove();
        e.stopPropagation();
    }
    onEmployeeUpdate(e){
        e.stopPropagation();
        this.props.onEmpUpdate();
        e.stopPropagation();
    }
    render(){
        return(
            <tr style={{backgroundColor: this.props.bgc}} onClick={this.onEmployeeClick.bind(this)}>
                <td>{this.props.sl}</td>
                <td>{this.props.empid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.email}</td>
                <td>{this.props.address}</td>
                <td id={this.props.sl} className="pull-center">
                    <span className="glyphicon glyphicon-remove-sign" onClick={this.onEmployeeRemove.bind(this)}></span>  
                    <span className="glyphicon glyphicon-pencil" onClick={this.onEmployeeUpdate.bind(this)}></span>
                    
                </td>
            </tr>
            
        )
    }
}