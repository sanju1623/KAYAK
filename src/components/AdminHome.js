import React, {Component} from 'react';
import {fullWhite,cyan500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import * as API from '../api/API';
import TextField from 'material-ui/TextField';
const emailRegex = /^\S+@\S+\.\S+$/;
class AdminHome extends Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        isDisabled:false,
        AdminUsername:'',
        AdminPassword:'',
        AdminPassword:'',
        errorUsername:'',
        errorPassword:'',
      };
    }
  state = {

  };
  componentDidMount(){
      document.title = `Admin - Home`;
  }

    // componentWillMount()
    // {
    //     API.getAdminSession()
    //         .then((data) => {
    //             //console.log(data.user);
    //             if(data==401)
    //             {
    //                 this.props.history.push("/");
    //             }
    //
    //         });
    //
    // }


  handleOpen = () => {this.setState({
    open: true,
  });};
  handleClose = () => {this.setState({
    open: false,
    AdminUsername:'',
    AdminPassword:'',
    AdminPassword:'',
    errorUsername:'',
    errorPassword:'',
  });};
  AddAdminUsername = (event) => {this.setState({AdminUsername: event.target.value});};
  AddAdminPassword = (event) => {this.setState({AdminPassword: event.target.value});};
  handleAddminAdd = () => {
    console.log("username: "+this.state.AdminUsername + this.state.AdminPassword);
    if(this.state.AdminUsername ==='' || this.state.AdminPassword ===''){
      if(this.state.AdminUsername ===''){this.setState({open: true,errorUsername:"This field is required" });}
      if(this.state.AdminPassword ===''){this.setState({open: true,errorPassword:"This field is required" });}
    }
    else{
      this.setState({open: false,errorReq:''});
      var AdminToAdd={
        username : this.state.AdminUsername,
        password: this.state.AdminPassword
      }
      // API.addAdmin(AdminToAdd)
      // .then((status) => {
      //   if (status === 201) {
      //     console.log("admin add  - successful");
      //
      // } else{
      //     this.setState({
      //       message1: "Admin add failed"
      //     });
      //   }
      // });
      //this.props.addAdmin(AdminToAdd);
      console.log(AdminToAdd);
    }
  };
    render() {
      const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.isDisabled}
        onClick={this.handleAddminAdd}
      />,
    ];
        return (
            <div className="container-fluid">
            <div className="jumbotron jumbotron-fluid">
                <h1 className="display-1">Hello, Admin!</h1>
                <p className="lead">Click the icon on the left for more options.</p>
                <hr className="my-4"></hr>
                <p className="lead"></p>
                {/*<RaisedButton className="mt-4"*/}
                {/*label = "Add Another Admin"*/}
                {/*labelColor ={fullWhite}*/}
                {/*backgroundColor={cyan500}*/}
                {/*onClick={this.handleOpen}*/}
                {/*/>*/}

              </div>
              <Dialog
                title="Enter the Details"
                actions={actions}
                modal={false}
                onRequestClose={this.handleClose}
                open={this.state.open}>
                <Divider/>
                <TextField className="mr-4 m1-4"
                    floatingLabelText="Username"
                    errorText={this.state.errorUsername}
                    onChange={this.AddAdminUsername}/>
                <br/>
                <TextField className="mr-4 m1-4"
                    floatingLabelText="Password"
                    errorText={this.state.errorPassword}
                    onChange={this.AddAdminPassword}/>
                <br/>

              </Dialog>
            </div>
        );
    }
}

export default AdminHome;
