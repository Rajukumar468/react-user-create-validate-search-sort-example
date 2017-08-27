import React, { Component } from 'react';

export default class UpdateEmployee extends Component{
    constructor(){
        super();
        this.state = {button:"ADD"};
        
    }


    render(){
        console.log(this.props.employee);
        console.log(this.props.employee.event);

    }
}