import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import * as API from '../api/API';
import swal from 'sweetalert';
import validator from 'validator';

const states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];
class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminID:'',
            firstname:'',
            lastname:'',
            phoneNumber:'',
            streetAddress:'',
            email:'',
            Userstate:'',
            city:'',
            zipcode:'',
        }};
    submitDetails = () => {
        console.log(" Admin Profile AdminID: " + this.state.adminID);
        console.log(" Admin Profile AdminID: " + this.state.adminID);
        if(!validator.isEmail(this.state.email) && this.state.email.length >0 ){
            swal("invalid","Please enter a valid email!", "error");
        }
        else if(this.state.phoneNumber.length != 10 && this.state.phoneNumber.length >0 ){
            swal("invalid","Please enter a valid Phone Number!", "error");
        }
        else if(!states.includes(this.state.Userstate) && this.state.Userstate.length >0){
            swal("invalid","Please enter valid State!", "error");
        }
        else if(!validator.isPostalCode(this.state.zipcode,'any')&& this.state.zipcode.length >0){
            swal("invalid","Please enter valid Zipcode!", "error");
        }
        else if(!validator.isAlpha(this.state.firstname)&& this.state.firstname.length >0){
            swal("invalid","Please enter valid First name!", "error");
        }
        else if(!validator.isAlpha(this.state.lastname)&& this.state.lastname.length >0){
            swal("invalid","Please enter valid Last name!", "error");
        }
        else
        API.UpdateUserInfo(this.state)
            .then((status) => {
                if (status === 204) {
                    //alert("profile updated");
                console.log("profile updated");
                }
            });
    };
    componentWillMount(){
        API.getUserProfile()
            .then((results) => {
                console.log(results[0].firstname);
                this.setState({
                    adminID: results[0].username,
                    firstname:results[0].firstname,
                    lastname:results[0].lastname,
                    phoneNumber:results[0].phoneNumber,
                    streetAddress:results[0].Address,
                    email:results[0].username,
                    Userstate:results[0].State,
                    city:results[0].City,
                    zipcode:results[0].zipcode
                })
            });


        API.getAdminSession()
            .then((data) => {
                //console.log(data.user);
                if(data==401)
                {
                    this.props.history.push("/");
                }

            });
    }



    render() {
        return (
            <div className="container-fluid p-3" style={{backgroundColor:'#E9ECEF',height: '100vh'}}>

              <div className=" row col-md-6 justify-content-start Text-big Text-bold"><h4>Please Fill your Details: </h4>
              </div> <hr/>
              <form>

                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Username"
                         value={this.state.email}
                         onChange={(event) => {this.setState({email: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="First Name"
                         value={this.state.firstname}
                         onChange={(event) => {this.setState({firstname: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Last Name"
                         value={this.state.lastname}
                         onChange={(event) => {this.setState({lastname: event.target.value});}}/>
                </div>

                <div className="form-group">
                  <input type="number" className="form-control" placeholder="Phone Number"
                         value={this.state.phoneNumber}
                         onChange={(event) => {this.setState({phoneNumber: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Street Address"
                         value={this.state.streetAddress}
                         onChange={(event) => {this.setState({streetAddress: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="City"
                         value={this.state.city}
                         onChange={(event) => {this.setState({city: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <AutoComplete
                      floatingLabelText={"State: "+this.state.Userstate}
                      filter={AutoComplete.fuzzyFilter}
                      value={this.state.Statestate}
                      dataSource={states}
                      fullWidth={true}
                      maxSearchResults={10}
                  />
                </div>
                <div className="form-group">
                  <input type="number" className="form-control" placeholder="Zipcode"
                         value={this.state.zipcode}
                         onChange={(event) => {this.setState({zipcode: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <RaisedButton
                      label="Make Payment"
                      backgroundColor={'#FF690F'}
                      label={<span style={{color:'#FFFFFF'}} >Submit Details</span>}
                      onClick={this.submitDetails}
                  />
                </div>
              </form>

            </div>
        );
    }
}

export default AdminProfile;