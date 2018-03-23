import React, {Component} from 'react';
import HomePageSearchTabs from "./HomePageSearchTabs";
import {fullWhite,cyan500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import {Table,TableBody,TableFooter,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Edit from 'material-ui/svg-icons/image/edit';
import * as API from '../api/API';
import Delete from 'material-ui/svg-icons/action/delete-forever';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import swal from 'sweetalert';
const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
};
const customContentStyle = {
    width: '30%',
    maxWidth: 'none',
    height: '90%',
};

class AdminListings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            username: '',
            firstname: '',
            lastname: '',
            users: [
                // {username: 'John.woo@g.com', firstname: 'John', lastname: 'Woo'},
                // {username: 'harry.p@g.com', firstname: 'Harry', lastname: 'Potter'},
                // {username: 'ron.w@g.com', firstname: 'Ron', lastname: 'Weasly'},
                // {username: 'Her.g@g.com', firstname: 'Hermoine', lastname: 'Granger'},
            ],
            updateUsername: '',
            updateFirstname: '',
            updateLastname: '',
            updateAddress: '',
            updateCity: '',
            updateState: '',
            updatePhone: '',
            updateCreditCd: '',
            usertoedit:''

        };
    }



    componentWillMount()
    {
        API.getAdminSession()
            .then((data) => {
                //console.log(data.user);
                if(data==401)
                {
                    this.props.history.push("/");
                }

            });

    }










    handleClose = () => {this.setState({open: false});};
    handleUpdate = () => {
        this.setState({open: false});
        var updateDetails={
            username:this.state.updateUsername,
            firstname:this.state.updateFirstname,
            lastname:this.state.updateLastname,
            Address:this.state.updateAddress,
            City:this.state.updateCity,
            State:this.state.updateState,
            phoneNumber:this.state.updatePhone,
            creditcard:this.state.updateCreditCd,
            usertoedit:this.state.usertoedit

        }

        API.AdminUserUpdate(updateDetails)
            .then((status) => {
                if (status == 204) {
                    swal("success","Successfully updated user details", "success");
                } else if (status == 401) {
                    swal("invalid","User Updation Failed", "error");
                }
            });
    };
    // updateUserDetails = () => {
    //
    //     console.log("Updated DEtails to send: "+updateDetails.username+this.state.updateState);
    //
    //
    // };

    EditUser = (userToEdit) => {
        console.log("Edit: "+userToEdit);
        this.setState({open: true});
        API.getUserDetails(userToEdit,'','',1).
        then((data)=>{
            console.log(data)
            this.setState({
                updateUsername:data[0].username,
                updateFirstname:data[0].firstname,
                updateLastname:data[0].lastname,
                updateAddress:data[0].Address,
                updateCity:data[0].City,
                updateState:data[0].State,
                updatePhone:data[0].phoneNumber,
                updateCreditCd:data[0].creditcard,
                usertoedit:userToEdit
            });
        });
    };

    deleteUser = (userToDel) => {
        var res = {
            user:userToDel
        };
        API.AdminUserDelete(res)
            .then((status) => {
                    if (status === 204) {
                        swal("success","Successfully Deleted User", "success");
                    }

                    else {
                        swal("invalid","User Deletion Failed", "error");
                    }
                }
            )};
    componentDidMount(){document.title = `Admin - users`;}
    addUsername = (event) => {this.setState({username: event.target.value});};
    addFirstname = (event) => {this.setState({firstname: event.target.value});};
    addLastname = (event) => {this.setState({lastname: event.target.value});};
    //Operation for Updating user Details
    updateUsername = (event) => {this.setState({updateUsername: event.target.value});};
    updateFirstname = (event) => {this.setState({updateFirstname: event.target.value});};
    updateLastname = (event) => {this.setState({updateLastname: event.target.value});};
    updateAddress = (event) => {this.setState({updateAddress: event.target.value});};
    updateCity = (event) => {this.setState({updateCity: event.target.value});};
    updateState = (event) => {this.setState({updateState: event.target.value});};
    updatePhone = (event) => {this.setState({updatePhone: event.target.value});};
    updateCreditCd = (event) => {this.setState({updateCreditCd: event.target.value});};

    componentWillMount(){
        this.setState({
            users: this.state.users || [],
        });
    }

    componentWillUpdate(){
        //this.updateUserDetails();
    }

    handleOpen=()=>{
        var res = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,

        };
        API.AdminUserCheck(res)
            .then((status) => {
                if (status === 204) {
                    API.getUserDetails(this.state.username,this.state.firstname,this.state.lastname,0).
                    then((data)=>{
                        this.setState({
                            users: data
                        });

                    });
                }
                else {
                    swal("invalid","User May not exist.Please try again", "error");
                }
            });

    };

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
            <FlatButton label="Update" primary={true} onClick={this.handleUpdate} />,
        ];
        return (
            <div className="container-fluid">
                <h4 className="row justify-content-start pt-3">Search Using any of the following options:</h4>
                <div className="row" style={{backgroundColor:'#E9ECEF'}}>
                    <TextField className="Admin-userSearch" underlineShow={false}
                               floatingLabelText="Username"
                               onChange={this.addUsername}/>
                    <TextField className="Admin-userSearch" underlineShow={false}
                               floatingLabelText="First name"
                               onChange={this.addFirstname}/>
                    <TextField className="Admin-userSearch" underlineShow={false}
                               floatingLabelText="Last name"
                               onChange={this.addLastname}/>
                </div>
                <RaisedButton className="mt-4 ml-4"
                              label = "Search"
                              labelColor ={fullWhite}
                              backgroundColor={cyan500}
                              onClick={this.handleOpen}
                />
                <div className="row">
                    <Table height='500px'>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn tooltip="Number Of Users">Index</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Username of the Customer">Username</TableHeaderColumn>
                                <TableHeaderColumn tooltip="First Name Of the Customer">First Name</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Last Name Of the Customer">Last Name</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Manage customers">Options</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            {this.state.users.map( (user, index) => (
                                <TableRow key={index} >
                                    <TableRowColumn>{index+1}</TableRowColumn>
                                    <TableRowColumn>{user.username}</TableRowColumn>
                                    <TableRowColumn>{user.firstname}</TableRowColumn>
                                    <TableRowColumn>{user.lastname}</TableRowColumn>
                                    <TableRowColumn>
                                        <Edit color={cyan500} viewBox="0 0 30 30" className="mr-2" onClick={() => this.EditUser(user.username)}/>
                                        <Delete color={cyan500} viewBox="0 0 30 30" onClick={() => this.deleteUser(user.username)}/>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Dialog title="Update user" actions={actions} modal={true}
                        autoDetectWindowHeight={true}
                        autoScrollBodyContent={true}
                        repositionOnUpdate={true}
                        contentStyle={customContentStyle}
                        open={this.state.open}>
                    <TextField className="mr-4 m1-4"
                               floatingLabelText="Username"
                               value={this.state.updateUsername}
                               errorText={this.state.errorUsername}
                               onChange={this.updateUsername}/>
                    <br/>
                    <TextField className="mr-4 m1-4"
                               floatingLabelText="First Name"
                               value={this.state.updateFirstname}
                               errorText={this.state.errorPassword}
                               onChange={this.updateFirstname}/>
                    <br/>
                    <TextField className="mr-4 m1-4"
                               floatingLabelText="Last Name"
                               value={this.state.updateLastname}
                               errorText={this.state.errorPassword}
                               onChange={this.updateLastname}/>
                    <br/>
                    <TextField className="mr-4 m1-4"
                               floatingLabelText="Address"
                               value={this.state.updateAddress}
                               errorText={this.state.errorPassword}
                               onChange={this.updateAddress}/>
                    <br/>
                    <TextField className="mr-4 m1-4"
                               floatingLabelText="City"
                               value={this.state.updateCity}
                               errorText={this.state.errorPassword}
                               onChange={this.updateCity}/>
                    <br/>
                    <TextField className="mr-4 m1-4"
                               floatingLabelText="State"
                               value={this.state.updateState}
                               errorText={this.state.errorPassword}
                               onChange={this.updateState}/>
                    <br/>
                    <TextField className="mr-4 m1-4"
                               floatingLabelText="Phone Number"
                               value={this.state.updatePhone}
                               errorText={this.state.errorPassword}
                               onChange={this.updatePhone}/>
                    <br/>
                    <TextField className="mr-4 m1-4"
                               floatingLabelText="Credit Card"
                               value={this.state.updateCreditCd}
                               errorText={this.state.errorPassword}
                               onChange={this.updateCreditCd}/>
                    <br/>
                </Dialog>
            </div>
        );
    }
}

export default AdminListings;