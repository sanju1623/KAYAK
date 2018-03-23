import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {deepOrange500,fullWhite} from 'material-ui/styles/colors';
import Signin from "./Signin";
import Signup from "./Signup";
import UserProfile from "./UserProfile";
import { Route, withRouter } from 'react-router-dom';
import dp from '../images/dp.jpg';
import '../cssfiles/myacc.css';
import '../cssfiles/social-buttons.css';
import '../App.css';
import * as API from '../api/API';

const style = {
    marginBottom: 20,
    marginTop: 20,
    paddingRight:30,
    paddingLeft:30,
    paddingBottom:15,
    paddingTop:15,
    overflowY: 'auto',
    overflowX: 'auto',
    popup:{
        marginBottom: 20,
        marginTop: 30,
        paddingRight:30,
        paddingLeft:30,
        paddingBottom:15,
        paddingTop:15,
    },
    customContentStyle : {
        width: '30%',
        maxWidth: 'none'
    },
    avatar:{
        fontSize: 20,
        color:fullWhite,
    },
    button1:{
        lineHeight: '40px',
        lineWidth: '120px',
        marginBottom: 7,
        width: '120px',
        backgroundColor:deepOrange500,
    },
    button2:{
        backgroundColor:fullWhite,
        lineHeight: '40px',
        lineWidth: '60px',
        width: '120px',
    }
};
class MyAccountHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            isSigninPage:false,
            isSignupPage:false,
            openPopup:false,
            isGuest:'',
image:null,
        };
    }


    componentWillMount()
    {
        API.getsession()
            .then((data) => {
                //console.log(data.user);
                //alert(data.user);
                if(data.user===undefined)
                {
                    this.setState({
                        isGuest:true
                    })
                }
                else
                {
                    this.setState({
                        isGuest:false
                    })
                }
            });
          API.getImages()
        .then((data) => {
            console.log(data);
            this.setState({
                image: data[0]
            });
        });
    }
    componentDidMount()
    {
        API.getsession()
            .then((data) => {
                //console.log(data.user);
                if(data.user===undefined)
                {
                    this.setState({
                        isGuest:true
                    })
                }
                else
                {
                    this.setState({
                        isGuest:false
                    })
                }
            });
    API.getImages()
        .then((data) => {
            console.log(data);
            this.setState({
                image: data[0]
            });
        });
    }









    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            openPopup: true,
            anchorEl: event.currentTarget,
        });
    };

    handleDialogOpenSignup = () => {
        this.setState({
            openDialog: true,
            openPopup: false,
            isSigninPage:false,
            isSignupPage:true,
        });
    };
    handleDialogOpenSignin = () => {
        this.setState({
            openDialog: true,
            openPopup: false,
            isSigninPage:true,
            isSignupPage:false,
        });
    };

    handleDialogClose = () => {
        this.setState({

            openDialog: false
        });
    };
    handleSignupOpen= () => {
        this.setState({
            openDialog: true,
            isSigninPage:false,
            isSignupPage:true,
        });
    };

    handleUserSigned=()=>{

        alert("in signed");
        this.setState({
            isGuest:false,
            openDialog: false
        });
        this.props.checklogged();
        console.log("IN Hanlde user my account");
    };

    handleSigninOpen= () => {
        this.setState({
            openDialog: true,
            isSigninPage:true,
            isSignupPage:false,
        });
    };
handleFileUpload = (event) => {
    const payload = new FormData();

    payload.append('mypic', event.target.files[0]);

    // API.uploadFile(payload)
    //     .then((status) => {
    //         if (status === 204) {
    //             API.getImages()
    //                 .then((data) => {
    //                     this.setState({
    //                         image: data
    //                     });
    //                 });
    //         }
    //     });

};

    handleSignin = (userdata) => {
        console.log(userdata.username+userdata.password);
    };

    SignOut = () => {
        console.log("Handle log out");
        API.logout()
            .then((status) => {
                if(status === 200){
                    this.setState({
                        isGuest:true,
                        openDialog: false
                    });
                    this.props.checklogout();


                    this.props.history.push("/");
                }
            });
    };




    handleRequestClose = () => {
        this.setState({
            openPopup: false,
        });
    };

    handleAdmin=()=>{
        this.setState({
            openDialog: false,
        });
        this.props.history.push("/Admin");
    };
    viewProfile = () => {this.props.history.push("/UserProfile")};


// changeDP = () => {
//   console.log("upload");
// };


    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                labelStyle={{color:'#558FE6'}}
                primary={true}
                keyboardFocused={true}
                onClick={this.handleDialogClose}
            />,
        ];
        let tripIcon = <svg id="common-layout-suitcase" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="100%" height="100%"><path class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" d="M18.6 9.39H5.4a1.84 1.84 0 0 0-1.9 1.76v6.48a1.84 1.84 0 0 0 1.9 1.76h13.2a1.84 1.84 0 0 0 1.9-1.76v-6.48a1.84 1.84 0 0 0-1.9-1.76zM15.13 9.29v-.65c0-1.18-.67-2.14-1.49-2.14h-3.29c-.82 0-1.49 1-1.49 2.14v.65"></path></svg>;

        let bellIcon = <svg id="common-layout-pricealert" data-name="Layer 5" xmlns="http://www.w3.org/2000/svg" viewBox="0 1 24 24" width="100%" height="100%"><path id="eb78be3c-4940-428e-9ae1-e90c52a81a36" class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" data-name="bell" d="M18.08 17.45H6a1 1 0 0 1-.82-.39.65.65 0 0 1 0-.79c.18-.27.39-.52.57-.79a4.16 4.16 0 0 0 1.11-2.06V9.73c0-2.24 2.21-4.09 4.85-4.09h.86c2.57 0 4.67 1.79 4.67 4v3.79a4 4 0 0 0 1.11 2.06 6.77 6.77 0 0 1 .57.79.65.65 0 0 1 0 .79.88.88 0 0 1-.84.38z"></path><ellipse class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" cx="12" cy="4.09" rx=".93" ry=".91"></ellipse><ellipse class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" cx="12" cy="18" rx="1.4" ry="1.36" clip-path="url(#bell-clip)"></ellipse></svg>;
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-end mt-3">
                    <div className="row " style={style.avatar}><label className="ml-5 mr-5">My Account
                {/*<Avatar onClick={this.handleTouchTap} src={'http://localhost:3001/'+this.state.image} className="ml-2"/>*/}
                        <Avatar onClick={this.handleTouchTap} className="ml-2"/>


                    </label>

                    </div>
                </div>
                <Popover canAutoPosition={true} scrollableContainer="window" style={style.popup}
                         open={this.state.openPopup}
                         anchorEl={this.state.anchorEl}
                         anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                         targetOrigin={{horizontal: 'left', vertical: 'top'}}
                         onRequestClose={this.handleRequestClose}
                         animated={true}
                         animation={PopoverAnimationVertical}
                >
                    {
                        this.state.isGuest
                            ?<RaisedButton label="Sign up" className="popup" fullWidth={true} backgroundColor={deepOrange500} labelColor={fullWhite} style={style.button1} onClick={this.handleDialogOpenSignup} />
                            :"Display Username"
                    }
                    {
                        this.state.isGuest
                            ?<RaisedButton label="Sign in" className="popup" style={style.button2} fullWidth={true} labelColor={deepOrange500} onClick={this.handleDialogOpenSignin}/>
                            :<RaisedButton label="View Profile" className="popup" style={style.button2} fullWidth={true} labelColor={deepOrange500} onClick={this.viewProfile}/>
                    }
                    {
                        this.state.isGuest
                            ?null
            :<span className="btn btn-secondary btn-block">Change Profile Picture<input type="file" className="btn btn-secondary btn-block" name="myfile" onChange={this.handleFileUpload}/></span>
          }
          {
            this.state.isGuest
            ?null
            :<RaisedButton label="Sign Out" className="popup mt-3" style={style.button2} fullWidth={true} labelColor={deepOrange500} onClick={this.SignOut}/>
                    }
                    <div className="row justify-content-start mt-2 mr-4">
                        <a className="dropdown-item">
                            <div className="icon">{tripIcon}</div>
                            <span className="text">Trips</span>
                        </a>
                    </div>
                    <div className="row justify-content-start mr-4">
                        <a className="dropdown-item">
                            <div className="icon">{bellIcon}</div>
                            <span className="text">Price alerts</span>
                        </a>
                    </div>
                </Popover>

                <div>
                    <Dialog
                        actions={actions}
                        modal={true}
                        open={this.state.openDialog}
                        contentStyle={style.customContentStyle}
                        onRequestClose={this.handleDialogOpen}
                    >
                        {
                            this.state.isSignupPage
                                ?<Signup handleSigninOpen={this.handleSigninOpen} handleDialogClose={this.handleDialogClose} />
                                :null
                        }
                        {
                            this.state.isSigninPage
                                ?<Signin handleSignupOpen={this.handleSignupOpen} handleAdmin={this.handleAdmin}  handleUserSigned={this.handleUserSigned} handleSignin={this.handleSignupOpen}/>
                                :null
                        }
                    </Dialog>
                </div>
      </div>
    );
    }
}

export default withRouter(MyAccountHome);
