import React from 'react';
import $ from 'jquery'; 
import Header from './Header';
import AddEmployee from './AddEmployee';
import {Modal,closeButton} from 'react-bootstrap';
//import UpdateEmployee from './UpdateEmployee';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import axios from 'axios';

export default class EmployeeManagement extends React.Component {
    constructor(){
        super();
        this.state = {
            emp:[
                
                {"id":1, "empid":"EMP01","name":"Raju Kumar", "email":"rajukumar468@gmail.com", "address":"India"},
                {"id":2, "empid":"EMP02", "name":"Saurabh Kamble", "email":"Saurabh@gmail.com", "address":"India"},
                {"id":3, "empid":"EMP03","name":"Krishna","email":"Krishna@gmail.com","address":"India"}
            ],
        selectedEmployee:{"empid":"","name":"", "email":"", "address":"India"},
        //button:'ADD',
        showModal:false,
        selecteRowNo:null,
        
        empid: '',
        empName: '',
        email: '',
        address: '',
        formErrors: [{empid: ''}, {empName: ''}, {email: ''}, {address: ''}],
        empidValid: true,
        empNameValid: true,
        emailValid: true,
        addressValid: true,
        formValid: true,
        searchText : ''
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
    
    componentDidMount(){
        /*
        $.ajax({
            //url:'https://api.myjson.com/bins/19x6xt',
            url:'http://localhost:8000/api/v1/get',
            method:'GET',
            data:'',
        }).then((data)=>this.setState({emp:data, selectedEmployee:{}}));
        */
    }
 
    handleAdd(empid,name,email,address){
        let newEmp = {empid:empid,name:name,email:email,address:address};
        
        let emp = this.state.emp;
        emp.unshift(newEmp);
        this.setState({emp});
        
        //this.setState({button:'ADD'});        
    }
    
    handleEmployeeClick(i){
        //let selectedEmployee = this.state.emp[i];
        //this.setState({selectedEmployee:selectedEmployee});
    }
    
    handleRemoveEMployee(i){
        let employees = this.state.emp;
        let data = {id:this.state.emp[i].id};
        employees.splice(i,1);
        let selectedEmployee;
        if(employees.length > 0){
            selectedEmployee = employees[0];
        }else{
            selectedEmployee = {};
        }
        this.setState({emp:employees});
    }
    close(){
        this.setState({ showModal: false });
    }
    
    handleUpdateEmployee(i){
        this.setState({showModal: !this.state.showModal});
        this.setState({selectedEmployee : this.state.emp[i],selecteRowNo:i});
    }
    
    updateEmployee(){
        //debugger;
        let row = this.state.selecteRowNo;
        let employees = this.state.emp;
        //remove selected row
        employees.splice(row,1);
        
        let id = this.state.selectedEmployee.id;
        let empid = this.refs.empid.value;
        let name = this.refs.empName.value;
        let email = this.refs.email.value;
        let address = this.refs.address.value;
        let newEmp = {empid:empid,name:name,email:email,address:address};
        //Add updated row
        employees.splice(row, 0, newEmp);
        
        this.setState({emp:employees});
        this.handleCloseModal();
        
    }
    handleCloseModal(i){
        this.setState({showModal: !this.state.showModal});
    }
    
    validateInput(i){
        console.log('DEv');
    }
    
    handleSearch(event){
        let text = event.target.value;
        this.setState({searchText: text});
    }
    sortEmployee(field){
        //debugger;
        let employees = this.state.emp;
        var sortedEmployees = employees.sort( (a, b) => {
        if (a[field] > b[field]) {
          return 1;
        }
        if (a[field] < b[field]) {
          return -1;
        }
        return 0;
      });

      // Then call setState
      this.setState({emp: sortedEmployees});
    }
    
  render(){
        return(
            <div className="row">
                <Header title="EMPLOYEE MANAGEMENT CONSOLE"/>
            
                    <Modal show={this.state.showModal}>
                        <button className="close">
                          <span className="p-10 pull-right" onClick={this.handleCloseModal.bind(this)}>&times;</span>
                        </button>

                        <div className='panel'>
                            <div className='panel-body'>
                                <div className="col-md-12">
                                    <input type="text" ref='empid' name="empid" defaultValue={this.state.selectedEmployee.empid ?this.state.selectedEmployee.empid:null}  className={"form-control "+this.errorClass(this.state.formErrors[0].empid)} placeholder="Employee ID" onChange={this.handleUserInput.bind(this)}/>
                                    <p className="pull-right text-red">{this.gerErrorMsg(this.state.formErrors[0].empid)}</p>
                                </div>
                                <div className="clearfix"/> 
                                <br/>
                                <div className="col-md-12">
                                    <input type="text" ref='empName' name="empName" defaultValue={this.state.selectedEmployee.name} className={"form-control "+this.errorClass(this.state.formErrors[0].empName)} placeholder="Employee Name" onChange={this.handleUserInput.bind(this)}/>
                                    <p className="pull-right text-red">{this.gerErrorMsg(this.state.formErrors[0].empName)}</p>
                                </div>
                                <div className="clearfix"/> 
                                <br/>

                                <div className="col-md-12">
                                    <input type="text" ref='email' name="email" defaultValue={this.state.selectedEmployee.email} className={"form-control "+this.errorClass(this.state.formErrors[0].email)} placeholder="Email" onChange={this.handleUserInput.bind(this)}/>
                                    <p className="pull-right text-red">{this.gerErrorMsg(this.state.formErrors[0].email)}</p>
                                </div>
                                <div className="clearfix"/> 
                                <br/>
                                <div className="col-md-12">
                                    <textarea ref='address' name="address" defaultValue={this.state.selectedEmployee.address} className={"form-control "+this.errorClass(this.state.formErrors[0].address)} placeholder="Address" onChange={this.handleUserInput.bind(this)}></textarea>
                                    <p className="pull-right text-red">{this.gerErrorMsg(this.state.formErrors[0].address)}</p>
                                </div>
                                <div className="clearfix"/> 
                                <br/>

                                <div className="col-md-12">
                                <button ref="submit" className="btn btn-success" onClick={this.updateEmployee.bind(this)} disabled={!this.state.formValid}>
                                    UPDATE
                                </button>
                                </div>
                            </div>
                        </div>

                    </Modal>
            
                    <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                    
                    

                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                          <h4 className="modal-title">Modal Header</h4>
                        </div>
                        <div className="modal-body">
                          <p>Some text in the modal.</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>

                    </div>
                  </div>
            
                <div className="row">
                    <div className="col-md-4">
                        <AddEmployee onAdd={this.handleAdd.bind(this)} employee={this.state.selectedEmployee} button={this.state.button}/>
                    </div>
                    <br/>
                    
                    <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                            <input type="text" className="form-control" id="search-filter" name="search" onChange={this.handleSearch.bind(this)} placeholder="Search employee.."/><i className="glyphicon glyphicon-search"></i>
                        </div>
                    </div>
                    <br/>
                        <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sl</th>
                                <th onClick={this.sortEmployee.bind(this,'empid')}>EMP ID <span className="glyphicon glyphicon-sort pull-right"></span></th>
                                <th onClick={this.sortEmployee.bind(this,'name')}>Name <span className="glyphicon glyphicon-sort pull-right"></span></th>
                                <th onClick={this.sortEmployee.bind(this,'email')}>Email <span className="glyphicon glyphicon-sort pull-right"></span></th>
                                <th onClick={this.sortEmployee.bind(this,'address')}>Address <span className="glyphicon glyphicon-sort pull-right"></span></th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            
                                <EmployeeList textFilter={this.state.searchText} employees={this.state.emp} onEmployeeClickList={this.handleEmployeeClick.bind(this)} onEmployeeRemove={this.handleRemoveEMployee.bind(this)} onEmployeeEdit={this.handleUpdateEmployee.bind(this)}/>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}