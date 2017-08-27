import React, { Component } from 'react';
export default class AddEmployee extends Component {
    constructor() {
        super();
        this.state = {
            empid: '',
            empName: '',
            email: '',
            address: '',
            formErrors: [{empid: ''}, {empName: ''}, {email: ''}, {address: ''}],
            empidValid: false,
            empNameValid: false,
            emailValid: false,
            addressValid: false,
            formValid: false
        };

    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () =>{
            this.validateField(name, value)
        });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let empidValid = this.state.empidValid;
        let empNameValid = this.state.empNameValid;
        let emailValid = this.state.emailValid;
        let addressValid = this.state.addressValid;
        
        switch (fieldName) {
            case 'empid':
                empidValid = value.match(/^[a-z0-9]+$/i) && value.length >= 5;
                fieldValidationErrors[0].empid = empidValid ? '' : 'Employee id is invalid (min 5 digits)';
                break;
            case 'empName':
                empNameValid = value.length >= 2;
                fieldValidationErrors[0].empName = empNameValid ? '' : 'Employee name is too short (min 2 characters)';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors[0].email = emailValid ? '' : 'Email is invalid';
                break;
            case 'address':
                addressValid = value.length >= 6;
                fieldValidationErrors[0].address = addressValid ? '' : 'Addres is too short';
                break;
            default:
                break;
        }
        
        this.setState({formErrors: fieldValidationErrors,
            empidValid: empidValid,
            empNameValid: empNameValid,
            emailValid: emailValid,
            addressValid: addressValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.empidValid && this.state.empNameValid && this.state.emailValid && this.state.addressValid});
    }
    
    errorClass(error) {
        console.log(this.state);
        if(error){
            return(error.length === 0 ? '' : 'has-error');
        }else{
            return '';
        }
    }
    
    gerErrorMsg(error) {
        if(error){
            return error;
        }else{
            return '';
        }
    }

    add(i) {
        i.preventDefault();
        this.props.onAdd(this.refs.empid.value, this.refs.empName.value, this.refs.email.value, this.refs.address.value);
        this.refs.empid.value = '';
        this.refs.empName.value = '';
        this.refs.email.value = '';
        this.refs.address.value = '';
        this.setState({formValid: false});
        //this.setState({button:"ADD"});
        
    }

    reset() {
        this.refs.empid.value = '';
        this.refs.empName.value = '';
        this.refs.email.value = '';
        this.refs.address.value = '';
        //this.setState({"button":"UPDATE"});
    }

    render() {
        return(
                <div className='row'>
                    <div className='panel'>
                        <div className='panel-body'>
                            <div className="col-md-12">
                                <input type="text" ref='empid' name="empid"  className={"form-control "+this.errorClass(this.state.formErrors[0].empid)} placeholder="Employee ID" onChange={this.handleUserInput.bind(this)}/>
                                <p className="pull-right text-red">{this.gerErrorMsg(this.state.formErrors[0].empid)}</p>
                            </div>
                            <div className="clearfix"/> 
                            <br/>
                
                            <div className="col-md-12">
                                <input type="text" ref='empName' name="empName" className={"form-control "+this.errorClass(this.state.formErrors[0].empName)} placeholder="Employee Name" onChange={this.handleUserInput.bind(this)}/>
                                <p className="pull-right text-red">{this.gerErrorMsg(this.state.formErrors[0].empName)}</p>
                            </div>
                            <div className="clearfix"/> 
                            <br/>
                
                            <div className="col-md-12">
                                <input type="text" ref='email' name="email" className={"form-control "+this.errorClass(this.state.formErrors[0].email)} placeholder="Email" onChange={this.handleUserInput.bind(this)}/>
                                <p className="pull-right text-red">{this.gerErrorMsg(this.state.formErrors[0].email)}</p>
                            </div>
                            <div className="clearfix"/> 
                            <br/>
                
                            <div className="col-md-12">
                                <textarea ref='address' name="address" className={"form-control "+this.errorClass(this.state.formErrors[0].address)} placeholder="Address" onChange={this.handleUserInput.bind(this)}></textarea>
                                <p className="pull-right text-red">{this.gerErrorMsg(this.state.formErrors[0].address)}</p>
                            </div>
                            <div className="clearfix"/> 
                            <br/>
                
                            <div className="col-md-12">
                                <button ref="submit" className="btn btn-success" onClick={this.add.bind(this)} disabled={!this.state.formValid}>
                                    ADD
                                </button>
                
                                <button className="btn btn-success m-10" onClick={this.reset.bind(this)}>
                                    RESET
                                </button>                
                            </div>
                        </div>
                    </div>
                </div>
                )
    }
}