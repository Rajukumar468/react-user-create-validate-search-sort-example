import React, { Component } from 'react';
import Employee from './Employee';

function searchingFor(term){
    return function(x){
        return x.name.toLowerCase().includes(term.toLowerCase()) || x.email.toLowerCase().includes(term.toLowerCase()) || x.empid.toLowerCase().includes(term.toLowerCase()) || x.address.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}
export default class EmployeeList extends Component{
    
    onEmployeeClick(i){
        this.props.onEmployeeClickList(i);
        
    }
    onEmployeeRemove(i,id){
        this.props.onEmployeeRemove(i,id);
    }
    onEmployeeUpdate(i){
        this.props.onEmployeeEdit(i);
    }
    
    render(){
        
        let employees = this.props.employees;
        let textSearch = this.props.textFilter;
        return(
            <tbody>
            {employees.filter(searchingFor(textSearch)).map(function(emp, i){   
                return <Employee sl={i+1} key={i} name={emp.name} empid={emp.empid} email={emp.email} address={emp.address} bgc={emp.bgc} id={emp.id} onEmpClick={this.onEmployeeClick.bind(this,i)} onEmpRemove={this.onEmployeeRemove.bind(this,i,emp.id)} onEmpUpdate={this.onEmployeeUpdate.bind(this,i)}/>
            },this)}
            </tbody>
        );
    }
}