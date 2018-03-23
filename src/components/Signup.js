import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {deepOrange500,grey800,fullWhite} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../cssfiles/social-buttons.css';
import * as API from '../api/API';
import swal from 'sweetalert';

const muiTheme = getMuiTheme({
    palette: {
      textColor: '#558FE6',
      primary1Color: '#558FE6',
  }
});
const style = {
  marginTop: 5,

  checkbox: {
   marginBottom: 16,

 },
};

class Signup extends Component {

  state = {
    userdata: {
            username: '',
            password: ''
        },
  };
  handleSigninOpen = () => {
    this.props.handleSigninOpen();
  };
  handleSignUpSubmit = () => {
    //API here




      if(this.state.userdata.username!='' && this.state.userdata.password!='' ) {

          if (this.state.userdata.username.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
              && this.state.userdata.password.length >= 6) {


              API.Signup(this.state.userdata)
                  .then((status) => {
                      console.log("IN SIGNUP");
                      if (status == 200) {

                          swal("success","Successfully created account", "success");
                          this.props.handleDialogClose();
                          //   this.props.history.push("/");
                      } else if (status == 401) {

                          swal("Fail","EMAIL Already Exists", "error");

                      }
                  });
          }
          else
              {
                  swal("Enter Valid Email/Password");
              }
      }
      else {

          swal("Please fill the Details");

      }






  };
    render() {
        return (
          <div className="container-fluid">
          <div className="row justify-content-md-center responsive">
          <a className="btn btn-block btn-social btn-lg btn-facebook text-white mb-2">
              <span className="fa fa-facebook text-white" ></span> Continue with Facebook
            </a>
          </div>
          <div className="row justify-content-md-center responsive">
          <a className="btn btn-block btn-social btn-lg btn-google text-white mb-2">
              <span className="fa fa-google text-white" ></span> Continue with Google
            </a>
          </div>
            <div className="row justify-content-md-center responsive">
              <h3>or Create a KAYAK account</h3>
            </div><Divider/><br/>
            <div className="row justify-content-md-center responsive">
                  <form>
                  <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                    value={this.state.userdata.username}
                      onChange={(event) => {
                          this.setState({
                              userdata: {
                                  ...this.state.userdata,
                                  username: event.target.value
                              }
                          });
                      }}
                    ></input>
                    <small id="emailHelp" className="form-text text-muted"></small>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                    value={this.state.userdata.password}
                      onChange={(event) => {
                          this.setState({
                              userdata: {
                                  ...this.state.userdata,
                                  password: event.target.value
                              }
                          });
                      }}>
                    </input>
                  </div>
                  <div className="form-check">
                  <MuiThemeProvider muiTheme={muiTheme}>
                    <Checkbox
                      label="Email me KAYAK's favorite deals"
                      style={style.checkbox}
                      checked={true}
                    />
                  </MuiThemeProvider>
                  </div>
                  <div className="row justify-content-md-center responsive">
                      <RaisedButton label="Sign up"  fullWidth={true}
                      onClick={() => this.handleSignUpSubmit()}
                       style={style}
                     backgroundColor={grey800} labelColor={fullWhite}/>
                  </div><hr/><br/>
                  <div className="row justify-content-md-center">
                    <label>Already have an account?<RaisedButton className="ml-1" label="Sign in" style={style} onClick={this.handleSigninOpen}/></label>
                  </div>
                </form>
            </div>
        </div>
        );
    }
}

export default Signup;
