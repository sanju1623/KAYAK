import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {deepOrange500,deepOrange300,fullWhite,red200} from 'material-ui/styles/colors';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import Car from 'material-ui/svg-icons/maps/directions-car';
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward';
import Hotel from 'material-ui/svg-icons/maps/hotel';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import swal from 'sweetalert';
import Snackbar from 'material-ui/Snackbar';
import validator from 'validator';
import '../App.css';
const today = new Date();
const customContentStyle = {
    width: '20%',
    maxWidth: 'none',
};
const styles = {
    marginLeft: 20,
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
    },
    display: 'inline-block',
    customWidth: {
        width: 200,
    },
};
const stylesDrop = {
  customWidth: {
    width: 200,
  },
};




const muiTheme = getMuiTheme({
    flatButton: {
        primaryTextColor: deepOrange500,
    },
    datePicker: {
        selectColor: deepOrange500,
        headerColor: deepOrange500,
    },
    timePicker: {
        selectColor: deepOrange500,
        headerColor: deepOrange500,
    },
    palette: {
        accent1Color: deepOrange500,
        selectedTextColor: fullWhite,
        canvasColor: fullWhite
    }
});

const color ={
    color:deepOrange500,
};

const button ={
    marginLeft: 20,
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
    },
    display: 'inline-block',
    backgroundColor:deepOrange500,
    lineHeight: '65px',
    lineWidth: '20px',
};

const tabBackground ={
    backgroundColor:fullWhite,
    color:fullWhite,
};


class HomePageSearchTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelPlace:'',
            hotelsDateFrom: null,
            hotelsDateTo: null,
            hotelsRooms:1,
            carPickupPlace:'',
            flightNumberOfAdults: 1,
            flightsDateFrom:null,
            flightsDateTo:null,
            carsDatePickUp:null,
            carsDateDropOff:null,
            carsTimePickUp:null,
            carsTimeDropOff:null,
            flightsFrom:'',
            flightsTo:null,
            carListings:[],
            hotelListings:[],
            flightListings:[],
            hotelsRoomType:'Single',
            flightOptions:false,
            fromTime:'',
            flightCabin:'Economy',
            CarType: "Small",
            flightAdultsCount:0,
            flightSeniorsCount:0,
            flightChildCount:0,
            flightsTotalCount:0,
            fDesc:'Options',
            hotelOptions:false,
            hotelAdultsCount:0,
            hotelRoomsCount:0,
            hotelChildCount:0,
            hDesc:'Options',
            HAdultMinusButton:false,
            HChildMinusButton:false,
            HRoomsMinusButton:false,
            FAdultMinusButton:false,
            FSeniorMinusButton:false,
            FChildMinusButton:false,
      checkinDate:null,
      pickUpDate:null,
      autoHideDuration: 4000,
      messagePickup: 'Please select a future time for Pick-up',
      CarPickUpSnackBar: false,
        };
    }

    CarSearch=(event)=>{
        var res = {
            place: this.state.carPickupPlace,
            pickupdate: this.state.carsDatePickUp,
            dropoffdate: this.state.carsDateDropOff,

        };
        if(this.state.carPickupPlace.length === 0 || this.state.carsDatePickUp == null || this.state.carsDateDropOff == null
        || this.state.carsTimePickUp == null || this.state.carsTimeDropOff == null  ){
          swal("Required" ,"Please enter all the values!", "error");
        }

        // else if(!validator.isAlpha(this.state.flightsTo)){
        //   swal("invalid","Please enter valid Destination!", "warning");
        // }
        //
        else if(!validator.isAlpha(this.state.carPickupPlace)){
            swal("invalid","Please enter valid City!", "warning");
        }



        else{







        API.carAvailabilityCheck(res)
            .then((status) => {
                if (status == 204) {

                    // alert("IN CARS");
                    API.carDetails(this.state.carPickupPlace,this.state.carsDateDropOff,this.state.carsDatePickUp)
                        .then((data) => {
//                 alert("IN SEARCh");
                            this.setState({
                                carListings: data
                            });
                            var carDetails={};
                            carDetails.carPickupPlace=this.state.carPickupPlace;
                            carDetails.carsDatePickUp=this.state.carsDatePickUp;
                            carDetails.carsDateDropOff=this.state.carsDateDropOff;
                            carDetails.carsTimePickUp=this.state.carsTimePickUp;
                            carDetails.carsTimeDropOff=this.state.carsTimeDropOff;
                            carDetails.Company=this.state.Company;
                            this.props.handleCarDetails(carDetails);
                            this.props.handleCars(this.state.carListings);
                            //
                            // console.log(this.state.carListings)
                        });

                }
                else
                {
                    swal("No Results","Please try entering different values", "info");
                }
            });
          }
    };

    FlightSearch=(event)=>{

        var res = {
            placefrom: this.state.flightsFrom,
            placeto: this.state.flightsTo,
            departdate: this.state.flightsDateFrom
        };
        if(this.state.flightsFrom.length == 0 || this.state.flightsTo == null || this.state.flightsDateFrom == null  ){
          swal("Required" ,"Please enter all the values!", "error");
        }
        else if(this.state.flightAdultsCount === 0 && this.state.flightSeniorsCount === 0 && this.state.flightChildCount === 0){
          swal("Options empty","Please select atleast one traveller", "warning");
        }
        else if(!validator.isAlpha(this.state.flightsFrom)){
          swal("invalid","Please enter valid Origin!", "warning");
        }
        else if(!validator.isAlpha(this.state.flightsTo)){
          swal("invalid","Please enter valid Destination!", "warning");
        }
        else{
        API.FlightAvailabilityCheck(res)
            .then((status) => {
                if (status ==204) {
                    alert("FLIGHT");
                    API.flightDetails(this.state.flightsFrom,this.state.flightsTo,this.state.flightsDateFrom,this.state.flightsDateTo,this.state.flightAdultsCount,this.state.flightChildCount,this.state.flightSeniorsCount,this.state.flightCabin)
                        .then((data) => {
                            this.setState({
                                flightListings: data,
                                flightsTotalCount:this.state.flightSeniorsCount+this.state.flightAdultsCount+this.state.flightChildCount
                            });
                            this.props.handleFlights(this.state.flightListings,this.state.flightsTotalCount,this.state.flightsDateFrom);
                           // console.log(this.state.flightListings)
                        });
                }
                else
                    swal("No Results","Please try entering different values", "info");
            });
          }
    };



    hotelSearch=(event)=>{
        var details={
            hotelPlace:this.state.hotelPlace,
            hotelsDateTo:this.state.hotelsDateTo,
            hotelsDateFrom:this.state.hotelsDateFrom,
            hotelsRooms:this.state.hotelsRooms
        };
        if(this.state.hotelPlace.length === 0 || this.state.hotelsDateTo == null || this.state.hotelsDateFrom == null  ){
          swal("Required" ,"Please enter all the values!", "error");
        }
        else if(this.state.hotelRoomsCount === 0){
          swal("Required","Please enter the number of rooms under options!", "warning");
        }
        else if(this.state.hotelAdultsCount === 0){
          swal("Required","Please enter valid occupancy values", "warning");
        }
        else if(!validator.isAlpha(this.state.hotelPlace)){
          swal("invalid","Please enter valid city!", "warning");
        }
        else{
                API.hotelDetails(details)
            .then((status) => {

                if(status===201)
                {

                    API.getHotelDetails(this.state.hotelPlace,this.state.hotelsDateTo,this.state.hotelsDateFrom,this.state.hotelsRooms,this.state.hotelsRoomType).
                    then((data)=>{

                        data.from=this.state.hotelsDateFrom;
                        data.to=this.state.hotelsDateTo;
                        data.hotelsRoomsCount=this.state.hotelRoomsCount;
                        data.hotelAdultsCount=this.state.hotelAdultsCount;
                        data.hotelChildCount=this.state.hotelChildCount;
                        data.hotelsRoomType=this.state.hotelsRoomType;

                      //  console.log('-------------indide hotem--------');
                        //console.log(data);

                        //console.log('-------------indide hotem--------');

                        this.setState({
                            hotelListings: data
                        });

                        this.props.handleHotels(this.state.hotelListings);
                    })
                }
                else if(status===401) {
                      swal("No Results","Please try entering different values", "info");
                }
            });
          }
    };



    handleCarType = (event, index, CarType) => this.setState({CarType});
    handleChangeTab = (value) => {
        this.setState({ value: value,});
    };
    handleChangeHotelsDateFrom = (event, date) => {
        this.setState({hotelsDateFrom: date,
    checkinDate:date});
    };

    handleChangeHotelsDateTo = (event, date) => {
        this.setState({hotelsDateTo: date});
    };
    handleChangeHotelRooms = (event, index, hotelsRooms) => {
        this.setState({hotelsRooms});
    };
    handleChangeFlightsDateFrom = (event, date) => {
        this.setState({flightsDateFrom: date});
    };
    handleChangeFlightsDateTo = (event, date) => {
        this.setState({flightsDateTo: date,});
    };

    handleChangeFlightsFrom = (event, value) => {
        this.setState({flightsFrom: value});
    };
    handleChangeFlightsTo = (event, value) => {
        this.setState({flightsTo: value});
    };
    handleChangeFlightNumberOfAdults = (event, index, flightNumberOfAdults) => {
        this.setState({flightNumberOfAdults});
    };
    handleChangeCarsDatePickUp = (event, date) => {
        this.setState({carsDatePickUp: date,
    pickUpDate:date});
    };
    handleChangeCarsDateDropOff = (event, value) => {
        this.setState({carsDateDropOff: value,
        });
    };
    handleChangecarsTimePickUp = (event, date) => {
      if(Date.parse(today) === Date.parse(date) ){
        if(Date.parse(today) > Date.parse(date)) {
       this.setState({carsTimePickUp:'',CarPickUpSnackBar: true,});
         }else{
       this.setState({carsTimePickUp: date});
         }
      }
      else{
        this.setState({carsTimePickUp: date});
      }

    };







    handleChangecarsTimeDropOff = (event, date) => {
         if(Date.parse(this.state.carsTimePickUp) > Date.parse(date)) {
       this.setState({
         carsTimeDropOff:'',
         CarPickUpSnackBar: true,
         messagePickup: 'Please select a valid time for Drop-off'});
         }else{
       this.setState({carsTimeDropOff: date});
         }
    };
    flightOptionsOpen = () => {this.setState({flightOptions: true});};
    flightOptionsClose = () => {this.setState({flightOptions: false});};
    handleFlightCabin = (event, index, flightCabin) => this.setState({flightCabin});
    minusSeniors = (event) => {
      if(this.state.flightSeniorsCount>0){
                var mSenior=this.state.flightSeniorsCount-1;
                this.setState({flightSeniorsCount: mSenior});
            }
      else{
            this.setState({
                  flightSeniorsCount: 0,
                FSeniorMinusButton:true,
                });
          }

    };
    plusSeniors = (event) => {
        var pSenior=this.state.flightSeniorsCount+1;
        this.setState({flightSeniorsCount: pSenior});
    };
    minusAdults = (event) => {
      if(this.state.flightAdultsCount>0){
                var madult=this.state.flightAdultsCount-1;
                this.setState({flightAdultsCount: madult});
            }
      else{
            this.setState({
                  flightAdultsCount: 0,
                FAdultMinusButton:true,
                });
          }
    };
    plusAdults = (event) => {
        var pAdult=this.state.flightAdultsCount+1;
        this.setState({flightAdultsCount: pAdult});
    };
    minusChildren = (event) => {
      if(this.state.flightChildCount>0){
        var mChild=this.state.flightChildCount-1;
        this.setState({flightChildCount: mChild});
            }
      else{
            this.setState({
                  flightChildCount: 0,
                FChildMinusButton:true,
                });
          }

    };
    plusChildren = (event) => {
        var pChild=this.state.flightChildCount+1;
        this.setState({flightChildCount: pChild});
    };

    HotelOptionsOpen = () => {this.setState({hotelOptions: true});};
    hotelOptionsClose = () => {this.setState({hotelOptions: false});};
    handleHotelRoomType = (event, index, hotelsRoomType) => this.setState({hotelsRoomType});
    minusHotelRooms = (event) => {
      if(this.state.hotelAdultsCount>0){
        var hotelRoomsCount=this.state.hotelRoomsCount-1;
        this.setState({hotelRoomsCount: hotelRoomsCount});
            }
      else{
            this.setState({
                  hotelRoomsCount: 0,
                HRoomsMinusButton:true,
                });
          }


    };
    plusHotelRooms = (event) => {
        var hotelRoomsP=this.state.hotelRoomsCount+1;
        this.setState({hotelRoomsCount: hotelRoomsP});
    };
    minusHotelAdults = (event) => {
        if(this.state.hotelAdultsCount>0){
                var mhAdult=this.state.hotelAdultsCount-1;
                this.setState({hotelAdultsCount: mhAdult});
              }
        else{
              this.setState({
                    hotelAdultsCount: 0,
                  HAdultMinusButton:true,
                  });
            }

    };
    plusHotelAdults = (event) => {
        var phAdult=this.state.hotelAdultsCount+1;
        this.setState({hotelAdultsCount: phAdult});
    };
   minusHotelChildren = (event) => {

  if(this.state.hotelChildCount>0){
    var mhotelChildCount=this.state.hotelChildCount-1;
    this.setState({hotelChildCount: mhotelChildCount});
  }
else{
  this.setState({
    hotelAdultsCount: 0,
  HChildMinusButton:true,
  });
}

};
    plusHotelChildren = (event) => {
        var photelChildCount=this.state.hotelChildCount+1;
        this.setState({hotelChildCount: photelChildCount});
    };
    flightOptionsSave = () => {
        let adultCount = this.state.flightAdultsCount,
        seniorCount = this.state.flightSeniorsCount,
        childCount = this.state.flightChildCount,
            flightCabin = this.state.flightCabin;
        this.setState({flightOptions: false,
            fDesc:(adultCount+seniorCount+childCount) + ' ' + 'traveler(s)'+ ', ' + flightCabin,
        });
    };
    hotelOptionsSave = () => {
        let roomCount = this.state.hotelRoomsCount,
            roomType = this.state.hotelsRoomType;
        this.setState({hotelOptions: false,
            hDesc:roomCount + ' ' + 'Room(s)'+ ', ' + roomType,
        });
    };
    componentWillMount(){
        // API.getUserDetails().
        // then((data)=>{
        //     alert("Users Data");
        //    // alert(data);
        //     console.log(data);
        // })
        API.GetPageStats()
            .then((data) => {
                //To initialse winston

            });

        var fromTime = new Date();
        this.setState({
            fromTime: fromTime,
        });
    }


    componentWillUnmount()
    {

        var next = new Date();
        var data={};
        data.fromTime=this.state.fromTime.toString();
        data.toTime=next.toString();
        data.page='Home Page';
            API.trackHotel(data)
                .then((data) => {
                    //console.log(data.user);
            console.log('--------------');
                    console.log("successfully tracked Homepage");
                    console.log('--------------');
            });
    }

    render() {
        const actions_Flight = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.flightOptionsClose}
            />,
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.flightOptionsSave}
            />,
        ];
        const actions_Hotel = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.hotelOptionsClose}
            />,
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.hotelOptionsSave}
            />,];
        return (
            <div className="container-fluid">
                <Tabs
                    inkBarStyle={{backgroundColor:deepOrange500}}
                    tabItemContainerStyle={tabBackground}
                    value={this.state.value}
                    onChange={this.handleChangeTab}>
                    <Tab
                        label={<span style={color}>HOTELS</span>}
                        icon={<Hotel color={deepOrange500}/>} value="Hotels">
                        <div style={{backgroundColor: '#E4E5EA'}}>

                         <span className="mr-4 ml-5 mt-5 mb-5">
                            <TextField hintText="Where" style={styles} underlineShow={false} className="Text-Field"
                                       value={this.state.hotelPlace}
                                       onChange={(event) => {
                                           this.setState({
                                               hotelPlace: event.target.value
                                           });
                                       }}/>
                                        </span>
                            <MuiThemeProvider muiTheme={muiTheme}>
                              <span className="mr-4 mt-5 mb-5">
                            <DatePicker style={styles}
                                        hintText="Check-in"
                                        value={this.state.hotelsDateFrom}
                                        onChange={this.handleChangeHotelsDateFrom}
                                        minDate={today}
                                        className="Text-Area"
                                        underlineShow={false}
                            />
                             </span>
                            </MuiThemeProvider>
                            <MuiThemeProvider muiTheme={muiTheme}>
                              <span className="mr-4 mt-5 mb-5">
                            <DatePicker style={styles}
                                        hintText="Check-out"
                                        value={this.state.hotelsDateTo}
                                        onChange={this.handleChangeHotelsDateTo}
                                        minDate={this.state.checkinDate}
                                        className="Text-Area"
                                        underlineShow={false}
                            />
                          </span>
                            </MuiThemeProvider>
                            <RaisedButton label={this.state.hDesc} className="Text-Field" onClick={this.HotelOptionsOpen} />
                            <MuiThemeProvider muiTheme={muiTheme}>
                                <Dialog
                                    actions={actions_Hotel}
                                    modal={true}
                                    contentStyle={customContentStyle}
                                    open={this.state.hotelOptions}>
                                    <div><h3>Room Type</h3></div>
                                    <DropDownMenu value={this.state.hotelsRoomType}
                                                  onChange={this.handleHotelRoomType}>
                                        <MenuItem value={"Single"} primaryText="Single" />
                                        <MenuItem value={"Double"} primaryText="Double" />
                                        <MenuItem value={"Suite"} primaryText="Suite" />
                                    </DropDownMenu>
                                    <div><h3>Occupancy</h3></div><hr/>
                                    <div>
                                        <label className="mr-2" >Adults
                                              <button onClick={this.minusHotelAdults} disabled={this.state.HAdultMinusButton} className="btn btn-outline-secondary btn-xs ml-4 mr-2">-</button>
                                            {this.state.hotelAdultsCount}
                                            <button onClick={this.plusHotelAdults} className="btn btn-outline-secondary btn-xs ml-2 mr-4">+</button>
                                        </label>
                                        <br/>
                                        <label className="mr-1">Rooms
                                            <button onClick={this.minusHotelRooms} disabled={this.state.HRoomsMinusButton} className="btn btn-outline-secondary btn-xs ml-4 mr-2">-</button>
                                            {this.state.hotelRoomsCount}
                                            <button onClick={this.plusHotelRooms} className="btn btn-outline-secondary btn-xs ml-2 mr-5">+</button>
                                        </label>
                                        <br/>
                                        <label className="mr-1">Children
                                            <button onClick={this.minusHotelChildren} disabled={this.state.HChildMinusButton} className="btn btn-outline-secondary btn-xs ml-3 mr-2">-</button>
                                            {this.state.hotelChildCount}
                                            <button onClick={this.plusHotelChildren} className="btn btn-outline-secondary btn-xs ml-2 mr-5">+</button>
                                        </label>

                                    </div>
                                </Dialog>
                            </MuiThemeProvider>
                            <span className="mr-4 mt-5 mb-5">
                              <RaisedButton
                                  backgroundColor={deepOrange500}
                                  color={fullWhite}
                                  style = {{height: '100px'}}
                                  icon={<Arrow color={fullWhite}/>}
                                  style={button}
                                  onClick={this.hotelSearch}/>
                            </span>
                        </div>
                    </Tab>
                    <Tab
                        label={<span style={color}>FLIGHTS</span>}
                        icon={<ActionFlightTakeoff color={deepOrange500} />} value="Flights">
                        <div style={{backgroundColor: '#E4E5EA'}}>
                          <span className="mr-4 ml-5 mt-5 mb-5">
                            <TextField hintText="From Where?" style={styles}
                                       underlineShow={false}
                                       value={this.state.flightsFrom}
                                       onChange={this.handleChangeFlightsFrom}
                                       className="Text-Field"/>
                          </span>
                            <span className="mr-4 mt-5 mb-5">
                          <TextField hintText="To Where?" style={styles}
                                     underlineShow={false}
                                     value={this.state.flightsTo}
                                     onChange={this.handleChangeFlightsTo}
                                     className="Text-Field"/>
                          </span>
                            <MuiThemeProvider muiTheme={muiTheme}>
                            <span className="mr-4 mt-5 mb-5">
                              <DatePicker style={styles}
                                          hintText="Depart"
                                          value={this.state.flightsDateFrom}
                                          onChange={this.handleChangeFlightsDateFrom}
                                          className="Text-Area"
                                          minDate={today}
                                          underlineShow={false}/>
                            </span>
                            </MuiThemeProvider>
                            <RaisedButton label={this.state.fDesc} className="Text-Field" onClick={this.flightOptionsOpen} />
                            <MuiThemeProvider muiTheme={muiTheme}>
                                <Dialog
                                    actions={actions_Flight}
                                    modal={true}
                                    contentStyle={customContentStyle}
                                    open={this.state.flightOptions}>
                                    <div><h3>Cabin Class</h3></div>
                                    <DropDownMenu className="mb-3"
                                                  value={this.state.flightCabin}
                                                  onChange={this.handleFlightCabin}
                                                  style={styles.customWidth}
                                                  autoWidth={false}>
                                        <MenuItem value={"Economy"} primaryText="Economy" />
                                        <MenuItem value={"Business"} primaryText="Business" />
                                        <MenuItem value={"First"} primaryText="First" />
                                    </DropDownMenu>
                                    <div><h3>Travelers</h3></div><hr/>
                                    <div>
                                        <label className="mr-2" >Adults
                                            <button onClick={this.minusAdults} disabled={this.state.FAdultMinusButton} className="btn btn-outline-secondary btn-xs ml-4 mr-2">-</button>
                                            {this.state.flightAdultsCount}
                                            <button onClick={this.plusAdults} className="btn btn-outline-secondary btn-xs ml-2 mr-4">+</button>
                                        </label>
                                        <br/>
                                        <label className="mr-1">Seniors
                                            <button onClick={this.minusSeniors} disabled={this.state.FSeniorMinusButton} className="btn btn-outline-secondary btn-xs ml-4 mr-2">-</button>
                                            {this.state.flightSeniorsCount}
                                            <button onClick={this.plusSeniors} className="btn btn-outline-secondary btn-xs ml-2 mr-5">+</button>
                                        </label>
                                        <br/>
                                        <label className="mr-1">Children
                                            <button onClick={this.minusChildren} disabled={this.state.FChildMinusButton} className="btn btn-outline-secondary btn-xs ml-3 mr-2">-</button>
                                            {this.state.flightChildCount}
                                            <button onClick={this.plusChildren} className="btn btn-outline-secondary btn-xs ml-2 mr-5">+</button>
                                        </label>
                                    </div>
                                </Dialog>
                            </MuiThemeProvider>
                            <span className="mr-4 mt-5 mb-5">
                            <RaisedButton className="m-2"
                                          backgroundColor={deepOrange500}
                                          color={fullWhite}
                                          style = {{height: '100px'}}
                                          icon={<Arrow color={fullWhite} />}
                                          style={button}
                                          onClick={this.FlightSearch}
                            />
                          </span>
                        </div>
                    </Tab>
                    <Tab label="CARS" value="Cars"
                         label={<span style={color}>CARS</span>}
                         icon={<Car color={deepOrange500} />} >
                        <div style={{backgroundColor: '#E4E5EA'}}>
                        <span className="mr-4 ml-5 mt-5 mb-5">
                          <TextField hintText="Where" style={styles}
                                     underlineShow={false}
                                     className="Text-Field"
                                     value={this.state.carPickupPlace}
                                     onChange={(event) => {
                                         this.setState({
                                             carPickupPlace: event.target.value
                                         });
                                     }}/>
                        </span>
                            <MuiThemeProvider muiTheme={muiTheme}>
                          <span className="mr-4 ml-3 mt-5 mb-5">
                            <DatePicker style={styles}
                                        hintText="Pick-up on"
                                        underlineShow={false}
                                        minDate={today}
                                        className="Text-Area"
                                        value={this.state.carsDatePickUp}
                                        onChange={this.handleChangeCarsDatePickUp}/>
                          </span>
                            </MuiThemeProvider>
                            <MuiThemeProvider muiTheme={muiTheme}>
                          <span className="mr-5 ml-3 mt-5 mb-5">
                            <DatePicker style={styles}
                                        underlineShow={false}
                                        hintText="drop-off on"
                                        minDate={this.state.pickUpDate}
                                        defaultDate={today}
                                        value={this.state.carsDateDropOff}
                                        onChange={this.handleChangeCarsDateDropOff}
                                        className="Text-Area"/>
                          </span>
                            </MuiThemeProvider>

                            <MuiThemeProvider muiTheme={muiTheme}>
                            <span className="mr-4 ml-5 mt-5 mb-5">
                            <TimePicker style={styles}
                                        format="ampm"
                                        underlineShow={false}
                                        hintText="Pick-up at"
                                        minutesStep={30}
                                        value={this.state.carsTimePickUp}
                                        onChange={this.handleChangecarsTimePickUp}
                                        className="Text-Date-Area"/>
                                {/*<span className="mr-4 mt-5 mb-5">*/}
                            </span>
                            </MuiThemeProvider>

                            <MuiThemeProvider muiTheme={muiTheme}>
                           <span className="mr-4 ml-5  mb-5">
                             <TimePicker style={styles}
                                         format="ampm"
                                         underlineShow={false}
                                         hintText="drop-off at"
                                         value={this.state.carsTimeDropOff}
                                         minutesStep={30}
                                         onChange={this.handleChangecarsTimeDropOff}
                                         className="Text-Date-Area"/>
                          </span>
                            </MuiThemeProvider>
 <MuiThemeProvider muiTheme={muiTheme}>
                        <span className="mr-4 ml-5 pl-5 mt-4">
                        {/*<DropDownMenu*/}
                          {/*value={this.state.CarType}*/}
                          {/*onChange={this.handleCarType}*/}
                          {/*style={stylesDrop.customWidth}*/}
                          {/*autoWidth={false}*/}
                          {/*className="Text-Area-dropdown"*/}
                          {/*underlineShow={false}*/}
                        {/*>*/}
                          {/*<MenuItem value={"Small"} primaryText="Small" />*/}
                          {/*<MenuItem value={"Medium"} primaryText="Medium" />*/}
                          {/*<MenuItem value={"Convertible"} primaryText="Convertible" />*/}
                          {/*<MenuItem value={"SUV"} primaryText="SUV" />*/}
                          {/*<MenuItem value={"Large"} primaryText="Large" />*/}
                        {/*</DropDownMenu>*/}
                        </span>
                      </MuiThemeProvider>
                            <MuiThemeProvider muiTheme={muiTheme}>
                            <span className="mr-4 mt-5 mb-5">
                          <RaisedButton
                              backgroundColor={deepOrange500}
                              color={fullWhite}
                              style = {{height: '100px'}}
                              icon={<Arrow color={fullWhite}/>}
                              style={button}
                              onClick={this.CarSearch}
                          />
                        </span>
                            </MuiThemeProvider>

                        </div>
                        {/*{console.log("Cars - Date pick -up: "+this.state.carsDatePickUp)}*/}
                        {/*{console.log("Cars - Date drop-off: "+this.state.carsDateDropOff)}*/}
                        {/*{console.log("Cars - Time pick-up: "+this.state.carsTimePickUp)}*/}
                        {/*{console.log("Cars - Time drop-off: "+this.state.carsTimeDropOff)}*/}
                    </Tab>
                </Tabs>
                 <Snackbar
                 bodyStyle={{ backgroundColor: deepOrange500 }}
                 open={this.state.CarPickUpSnackBar}
                 message={this.state.messagePickup}
                 autoHideDuration={this.state.autoHideDuration}
               />
            </div>
        );
    }
}

export default HomePageSearchTabs;