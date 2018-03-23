import React, {Component} from 'react';
import AdminListingsAdd from "./AdminListingsAdd";
import AdminListingsUpdate from "./AdminListingsUpdate";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {fullWhite,cyan500} from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import { Route, withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import * as API from '../api/API';
import swal from 'sweetalert';

const customContentStyle = {
  width: '50%',
  maxWidth: 'none',
};
const styles = {
  customWidth: {
    width: 200,
  },
};
class AdminListingsMain extends Component {
  constructor(props) {
  super(props);
  this.state = {
      isListingsUpdate:false,
      isListingsAdd:false,
       hotelUpdate:false,
      flightUpdate:false,
      carUpdate:false,
      open: false,
      value: 'Hotel',
      IdToSearch:'',
      fetchedListing:[],
      FlightDetails:{},
      CarDetails:{},
      HotelDetails:{}

      // FlightDetails : {'flightPrice':'455','Origin':'SFO','Destination':'DAL','DepartureTime':'4:00 pm','ArrivalTime':'2:00 am',
      //                   'DepartureDate':'8-19-2017','ArrivalDate':'8-20-2017','type':'nonstop','Operator':'United','FlightID':'SEO456','cabinType':'Business'},
      // CarDetails : {'carPrice':'455','CarType':'Economy','doors':'4','people':'4','bags':'2','Place':'OAK','carID':'1'},
      // HotelDetails : {'HotelID':'SO456','City':'San Jose','Name':'Hotel Indigo','Rooms':{'singleRoomPrice':'354','doubleRoomPrice':'777','suitRoomPrice':'985',},
      //                 'Address':'6057 Gary Drive','State':'Texas','Ratings':'2','Availability':'yes','hotelsDateFrom':'8-20-2018','hotelsDateTo':'8-20-2018', },
  };
  }
  handleOpen = () => {
   this.setState({open: true,isListingsAdd:false});
 };


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
    handleChange = (event, index, value) => this.setState({value});
 handleClose = () => {
   this.setState({open: false});
 };
  handleOpenAdd = () => {this.setState({
    isListingsUpdate:false,
    isListingsAdd:true,
  });};
  handleOpenUpdate = () => {this.setState({
    isListingsUpdate:true,
    isListingsAdd:false
  });};
  AddSearchID = (event) => {this.setState({IdToSearch: event.target.value});};
 submitIdSearch = () => {

    console.log("Type: "+this.state.value);
    console.log("ID to search: "+this.state.IdToSearch);
     var IdtoSearch = {
      'Type': this.state.value,
      'ID':this.state.IdToSearch,
    };
    console.log(IdtoSearch);

      if(this.state.value=='Flight') {
          API.CheckListingIdExists(IdtoSearch)
              .then((status) => {
                  if (status == 204) {
                      API.GetListingDetails(this.state.value, this.state.IdToSearch)
                          .then((data) => {
                              this.setState({
                                  FlightDetails: data[0], open: false, isListingsUpdate: true
                              });

                              console.log(this.state.FlightDetails)

                          });
                  }
                  else {
                      swal("No such ID","There is no Flight listing with the provided ID", "error");
                  }
              });
      }

     if(this.state.value=='Car') {
         API.CheckListingIdExists(IdtoSearch)
             .then((status) => {
                 if (status == 204) {
                     API.GetListingDetails(this.state.value, this.state.IdToSearch)
                         .then((data) => {
                             this.setState({
                                 CarDetails: data[0], open: false, isListingsUpdate: true
                             });

                             console.log(this.state.CarDetails)

                         });
                 }
                 else {
                     swal("No such ID","There is no Car listing with the provided ID", "error");
                 }
             });
     }

     if(this.state.value=='Hotel') {
         API.CheckListingIdExists(IdtoSearch)
             .then((status) => {
                 if (status == 204) {
                     API.GetListingDetails(this.state.value, this.state.IdToSearch)
                         .then((data) => {

                             this.setState({
                                 HotelDetails: data[0], open: false, isListingsUpdate: true
                             });

                         });
                 }
                 else {
                    swal("No such ID","There is no Hotel listing with the provided ID", "error");
                 }
             });
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
    label="Update"
    primary={true}
    onClick={this.submitIdSearch}
  />,
];
        return (
            <div className="container-fluid">
              <div className="row form-inline p-3" style={{backgroundColor:'#E9ECEF'}}>
              <div className="mt-3 ml-5 mb-3"><h4>Manage Listings</h4></div><br/>
                <RaisedButton className="mt-3 ml-5 mb-3"
                    label = "Add a Listing"
                    labelColor ={fullWhite}
                    backgroundColor={cyan500}
                    onClick={this.handleOpenAdd}
                />
                <RaisedButton className="mt-3 ml-5 mb-3"
                    label = "Update a Listing"
                    labelColor ={fullWhite}
                    backgroundColor={cyan500}
                    onClick={this.handleOpen}
                />
                <Dialog
                  title="Update Listing"
                  actions={actions}
                  modal={true}
                  contentStyle={customContentStyle}
                  open={this.state.open}
              >
              <div className="form-inline">
                <h5 className="mt-4">Select the Type of listing: </h5>
                <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                  <MenuItem value={'Hotel'} primaryText="Hotel" />
                  <MenuItem value={'Flight'} primaryText="Flight" />
                  <MenuItem value={'Car'} primaryText="Car" />
                </DropDownMenu><br/>
              </div>
                <TextField
                    floatingLabelText="ID"
                    //onChange={this.AddHotelID}
                    onChange={this.AddSearchID}/><br/>
              </Dialog>
              </div>
                <div className="row pt-3 ">
                {
                  this.state.isListingsUpdate
                  ?<AdminListingsUpdate  value={this.state.value} FlightDetails={this.state.FlightDetails} CarDetails={this.state.CarDetails} HotelDetails={this.state.HotelDetails}/>
                  :null
                }
                {
                  this.state.isListingsAdd
                  ?<AdminListingsAdd />
                  :null
                }
                </div>
                <Route exact path="/"/>
            </div>

        );
    }
}

export default withRouter(AdminListingsMain);
