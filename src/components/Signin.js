import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {deepOrange500,grey800,fullWhite} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import * as API from '../api/API';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../cssfiles/social-buttons.css';
import PropTypes from 'prop-types';
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
class Signin extends Component {
    state = {
        userdata: {
            username: '',
            password: ''
        },
        clickedSignin:false
    };
    // static propTypes = {
    //     handleSignInSubmit: PropTypes.func.isRequired,
    // };
    handleSignInSubmit = (userdata) => {


          if(this.state.userdata.username!='' && this.state.userdata.password!='' ) {

              if (this.state.userdata.username.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
                  && this.state.userdata.password.length >= 6
              && this.state.userdata.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
              ) {

                  API.doLogin(userdata)
                      .then((result) => {

                          console.log(result);
                          if (result.status == 201) {
                              //if(this.state.userdata.username=="Admin@kayak.com" && this.state.userdata.password=="admin123")
                              if (result.isAdmin == 'yes') {

                                  this.props.handleAdmin();
                              }
                              this.handleUserSigned();
                              console.log("in signedin");
                          } else if (result.status == 401) {

                              swal("Fail","Invalid Login", "error");

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


        //console.log(this.state.userdata);
    };

    handleUserSigned=()=>{




      this.props.handleUserSigned();
    };

    handleSignupOpen = () => {
        this.props.handleSignupOpen();
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
                    <h3> or Sign in with KAYAK account</h3>
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
                                   }}></input>





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
                                   }}></input>
                        </div>
                        <div className="form-check">
                            <MuiThemeProvider muiTheme={muiTheme}>
                                <Checkbox
                                    label="Remember me"
                                    style={style.checkbox}
                                    checked={true}
                                />
                            </MuiThemeProvider>
                        </div>
                        <div className="row justify-content-md-center responsive">
                            <RaisedButton label="Sign in" type="button" fullWidth={true}
                                          onClick={() => this.handleSignInSubmit(this.state.userdata)} style={style}
                                          backgroundColor={grey800} labelColor={fullWhite}/>
                        </div><hr/><br/>
                        <div className="row justify-content-md-center">
                            <label>Dont have an account?<RaisedButton className="ml-1" label="Sign up" style={style} onClick={this.handleSignupOpen}/></label>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signin;
