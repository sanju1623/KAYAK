import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as API from '../api/API';
import swal from 'sweetalert';
class UpdatedProfile extends Component {
  constructor(props) {
  super(props);
  this.state = {
    profileResults :[],
      initialusername:''
  };
  }


    componentWillMount()
    {
        API.getsession()
            .then((data) => {
               // alert(data.user);
                if(data.user===undefined)
                {
                    this.setState({
                        profileResults :[]
                    })
                }
                else
                {
                    API.getUserDetails(data.user,'','',1)
                        .then((data1) => {
                            this.setState({
                                profileResults :data1,
                                initialusername:data1.username
                            })
                        });
                }
            });
    }

    updateDetails = () => {
        var userdetails={
            initialusername:this.state.initialusername,
            username:this.state.profileResults.username,
            firstname:this.state.profileResults.firstname,
            lastname: this.state.profileResults.lastname,
            phoneNumber:this.state.profileResults.phoneNumber,
            Address:this.state.profileResults.Address,
            City:this.state.profileResults.City,
            State:this.state.profileResults.State,
            creditcard:this.state.profileResults.creditcard,
            zipcode:this.state.profileResults.zipcode

        }
        API.UpdateUserInfo(userdetails)
            .then((status) => {
                if (status === 204) {
                   swal('update succcess')
                }
                else {
                    swal('update failed')
                }
            });

    };

    render() {
        return (
          <div className="container-fluid p-3" style={{backgroundColor:'#E9ECEF',height: '100vh'}}>

            <div className="justify-content-start Text-big Text-bold"><h4>Profile Details: </h4>
            </div> <hr/>
            <form>
              <div className="form-group">
                Username : {this.state.profileResults.username}
              </div>
              <div className="form-group">
                First Name : {this.state.profileResults.firstname}
              </div>
              <div className="form-group">
                Last Name : {this.state.profileResults.lastname}
              </div>
              <div className="form-group">
                Phone Number : {this.state.profileResults.phoneNumber}
              </div>
              <div className="form-group">
                Street Address : {this.state.profileResults.Address}
              </div>
              <div className="form-group">
                City : {this.state.profileResults.City}
              </div>
              <div className="form-group">
                Zipcode : {this.state.profileResults.zipcode}
              </div>
              <div className="form-group">
              <RaisedButton
                backgroundColor={'#FF690F'}
                label={<span style={{color:'#FFFFFF'}} >Update Details</span>}
                onClick={this.updateDetails}
                />
              </div>
            </form>

          </div>
        );
    }
}

export default UpdatedProfile;
