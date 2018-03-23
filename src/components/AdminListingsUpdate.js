import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from "./Message";
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {deepOrange500,fullWhite,blue300,cyan500} from 'material-ui/styles/colors';
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
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import * as API from '../api/API';
import swal from 'sweetalert';
import validator from 'validator';
const states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];
const today = new Date();
const styles = {
    marginLeft: 20,
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 5000,
    },
};
const color ={
    color:deepOrange500,
};

class HomePageSearchTabs extends Component {

    componentDidMount(){
        document.title = `Admin - Listings`;
    }
    constructor(props) {
        super(props);
        this.state = {
            value: 'Hotels',
            updateHotelId:null,
            updateHotelName:null,
            updateHotelAddress:null,
            updateHotelCity:null,
            updateHotelState:null,
            updateHotelPrice:null,
            updateSingleRoomPrice:null,
            updateDoubleRoomPrice:null,
            updatesuitRoomPrice:null,
            updateHotelAvail:null,
            updateFlightId:null,
            updateFlightOperator :null,
            updateFlightDepTime :null,
            updateFlightArrTime :null,
            updateFlightEconomy:'',
            updateFlightBusiness:'',
            updateFlightFirstClass:'',
            updateStops:null,
            updatetotaltime:null,
            updateFlightDateDep:'',
            updateFlightDateArr:null,
            updateFLightOrigin :null,
            updateFLightDest:null,
            updateFlightPrice:null,
            updateCarId:null,
            updateCarType: null,
            updateCarPlace:null,
            updatecarsDatePickUp:null,
            updatecarsDateDropOff:null,
            updateCarPrice:null,
            updateCarPeople:null,
            updateCarDoors:null,
            updateCarBags:null,
            updateCarCompany:null,
            Tabvalue: this.props.value,
            HotelsDateFrom:'',
            HotelsDateTo:''
        };
    }
    componentWillMount(){
        if(this.state.Tabvalue == 'Hotel'){

            console.log(this.props.HotelDetails);
            this.setState({
                updateHotelId:this.props.HotelDetails.id,
                updateHotelName:this.props.HotelDetails.name,
                updateHotelAddress:this.props.HotelDetails.address,
                updateHotelCity:this.props.HotelDetails.city,
                updateHotelState:this.props.HotelDetails.state,
                updateSingleRoomPrice:this.props.HotelDetails.singleRoomPrice,
                updateDoubleRoomPrice:this.props.HotelDetails.doubleRoomPrice,
                updatesuitRoomPrice:this.props.HotelDetails.suitRoomPrice,
                //updateHotelAvail:this.props.HotelDetails.Availability,
                HotelsDateFrom:this.props.HotelDetails.HotelsDateFrom,
                HotelsDateTo:this.props.HotelDetails.HotelsDateTo
            });

            console.log(this.state.HotelsDateFrom);

        }
        else if(this.state.Tabvalue == 'Flight'){
            console.log("Flightss");
            this.setState({
                updateFlightId:this.props.FlightDetails.FlightID,
                updateFlightOperator :this.props.FlightDetails.Operator,
                updateFlightDepTime :this.props.FlightDetails.DepartureTime,
                updateFlightArrTime :this.props.FlightDetails.ArrivalTime,
                updateFLightOrigin :this.props.FlightDetails.Origin,
                updateFLightDest:this.props.FlightDetails.Destination,
                updateFlightEconomy:this.props.FlightDetails.economy,
                updateFlightBusiness:this.props.FlightDetails.business,
                updateFlightFirstClass:this.props.FlightDetails.firstclass,
                updateFlightDateDep:this.props.FlightDetails.departuredate,
                updateFlightDateArr:this.props.FlightDetails.arrivaldate,
                updateStops:this.props.FlightDetails.type,
                updatetotaltime:this.props.FlightDetails.totaltime,
            });
            console.log("Time:..."+this.props.FlightDetails.DepartureTime);
        }
        else if(this.state.Tabvalue == 'Car'){
            this.setState({
                updateCarId:this.props.CarDetails.id,
                updateCarType: this.props.CarDetails.cartype,
                updateCarPlace:this.props.CarDetails.place,
                updatecarsDatePickUp:this.props.CarDetails.pickup,
                updatecarsDateDropOff:this.props.CarDetails.dropoff,
                updateCarPrice:this.props.CarDetails.carPrice,
                updateCarPeople:this.props.CarDetails.peopleCount,
                updateCarDoors:this.props.CarDetails.doorCount,
                updateCarBags:this.props.CarDetails.bagCount,
                updateCarCompany:this.props.CarDetails.carcompany,
            });
        }

    }

    updateHotelId = (event) => {this.setState({updateHotelId: event.target.value});};
    updateHotelName = (event) => {this.setState({updateHotelName: event.target.value});};
    updateHotelAddress = (event) => {this.setState({updateHotelAddress: event.target.value});};
    updateHotelCity = (event) => {this.setState({updateHotelCity: event.target.value});};
    updateHotelState = (event) => {this.setState({updateHotelState: event.target.value});};
    updateSingleRoomPrice = (event) => {this.setState({updateSingleRoomPrice: event.target.value});};
    updateDoubleRoomPrice = (event) => {this.setState({updateDoubleRoomPrice: event.target.value});};
    updatesuitRoomPrice = (event) => {this.setState({updatesuitRoomPrice: event.target.value});};
    updateHotelAvail = (event, index, HotelAvail) => this.setState({HotelAvail});
    AddHotelsDateFrom=(event,date)=>{this.setState({HotelsDateFrom: date});};
    AddHotelsDateTo=(event,date)=>{this.setState({HotelsDateTo: date});};

    updateHotelListing = () => {
        var updateHotelDetails={
            InitialHotelId:this.props.HotelDetails.HotelID,
            HotelId:this.state.updateHotelId,
            HotelName:this.state.updateHotelName,
            HotelAddress:this.state.updateHotelAddress,
            HotelCity:this.state.updateHotelCity,
            HotelState:this.state.updateHotelState,
            updateSingleRoomPrice:this.state.updateSingleRoomPrice,
            updateDoubleRoomPrice:this.state.updateDoubleRoomPrice,
            updatesuitRoomPrice:this.state.updatesuitRoomPrice,
            updateHotelAvail:this.state.updateHotelAvail,
            HotelsDateFrom:this.state.HotelsDateFrom,
            HotelsDateTo:this.state.HotelsDateTo
        };

        if(this.state.updateHotelState==='' || this.state.updateHotelId ==='' || this.state.updateHotelName ==='' || this.state.updateHotelAddress ===''
            || this.state.updateHotelCity ==='' || this.state.updateSingleRoomPrice ===''|| this.state.updateDoubleRoomPrice ===''|| this.state.updatesuitRoomPrice ===''
        ) {
            swal("Required","Please enter all the values!", "error");
        }
        else if(!validator.isAlpha(this.state.updateHotelName) && validator.isWhitelisted(this.state.updateHotelName,'&')){
            swal("invalid","Please enter valid Hotel Name!", "error");
        }
        else if(!validator.isAlpha(this.state.updateHotelCity)){
            swal("invalid","Please enter valid City!", "error");
        }
        else if(!states.includes(this.state.updateHotelState)){
            swal("invalid","Please enter valid State!", "error");
        }
        else{
            API.UpdateHotelListing(updateHotelDetails)
                .then((status) => {
                    if (status ==201) {
                        swal("success","Hotel Listing has been updated successfully", "success");
                    }
                    else {
                        swal("error","There seems to be an error", "error");
                    }
                });
        }
    };

    updateFlightId = (event) => {this.setState({updateFlightId: event.target.value});};
    updateFlightOperator = (event) => {this.setState({updateFlightOperator : event.target.value});};
    updateFlightDepTime = (event, date) => {this.setState({updateFlightDepTime: date});};
    updateFlightArrTime = (event, date) => {this.setState({updateFlightArrTime: date});};
    updateFLightOrigin = (event) => {this.setState({updateFLightOrigin: event.target.value});};
    updateFLightDest = (event) => {this.setState({updateFLightDest: event.target.value});};
    updateFlightDateDep = (event, date) => {this.setState({updateFlightDateDep: date});};
    updateFlightDateArr = (event, date) => {this.setState({updateFlightDateArr: date});};
    updateFlightEconomy = (event) => {this.setState({updateFlightEconomy: event.target.value});};
    updateFlightBusiness = (event) => {this.setState({updateFlightBusiness: event.target.value});};
    updateFlightFirstClass = (event) => {this.setState({updateFlightFirstClass: event.target.value});};
    updateStops = (event, index, updateStops) => {this.setState({updateStops});};
    updateFlightListing = () => {
        var FlightDetails={
            InitialFlightId:this.props.FlightDetails.FlightID,
            FlightId:this.state.updateFlightId,
            FlightOperator:this.state.updateFlightOperator,
            FlightDepTime:this.state.updateFlightDepTime,
            FlightArrTime:this.state.updateFlightArrTime,
            FLightOrigin:this.state.updateFLightOrigin,
            FLightDest:this.state.updateFLightDest,
            FlightDateDep:this.state.updateFlightDateDep,
            FlightDateArr:this.state.updateFlightDateArr,
            FlightEconomy:this.state.updateFlightEconomy,
            FlightBusiness:this.state.updateFlightBusiness,
            FlightFirstClass:this.state.updateFlightFirstClass,
            Stops:this.state.updateStops,
        };
        if(this.state.FlightId === '' || this.state.FilghtOperator === '' || this.state.FilghtDepTime === '' || this.state.FilghtArrTime === '' || this.state.FlightDateDep === '' || this.state.FlightDateArr === '' ||this.state.FLightOrigin === '' || this.state.FLightDest === '' || this.state.FilghtEconomy === '' || this.state.FilghtBusiness === '' || this.state.FilghtFirstClass === '' ){
            swal("Required","Please enter all the values!", "error");
        }
        else if(!validator.isAlpha(this.state.updateFlightOperator)){
            swal("invalid","Please enter valid Flight operator!", "error");
        }
        else if(!validator.isAlpha(this.state.updateFLightOrigin)){
            swal("invalid","Please enter valid Flight Origin!", "error");
        }
        else if(!validator.isAlpha(this.state.updateFLightDest)){
            swal("invalid","Please enter valid Flight Destination!", "error");
        }
        else{
            API.UpdateFlightListing(FlightDetails)
                .then((status) => {
                    if (status == 204) {
                        swal("success","Flight Listing has been updated successfully", "success");
                    }
                    else {
                        swal("error","There seems to be an error", "error");
                    }
                });
            console.log(FlightDetails);
        }
    };

    updateCarId = (event) => {this.setState({updateCarId: event.target.value});};
    updateCarType = (event, index, updateCarType) => this.setState({updateCarType});
    updateCarPlace = (event) => {this.setState({updateCarPlace: event.target.value});};
    updatecarsDatePickUp = (event, date) => {this.setState({updatecarsDatePickUp: date,});};
    updatecarsDateDropOff = (event, value) => {this.setState({updatecarsDateDropOff: value,});};
    updateCarPrice = (event) => {this.setState({updateCarPrice: event.target.value});};
    updateCarPeople = (event, index, updateCarPeople) => this.setState({updateCarPeople});
    updateCarDoors = (event, index, updateCarDoors) => this.setState({updateCarDoors});
    updateCarBags = (event, index, updateCarBags) => this.setState({updateCarBags});
    updateCarListing = () => {
        var CarDetails={
            InitialCarId:this.props.CarDetails.id,
            CarId:this.state.updateCarId,
            CarType: this.state.updateCarType,
            CarPlace:this.state.updateCarPlace,
            carsDatePickUp:this.state.updatecarsDatePickUp,
            carsDateDropOff:this.state.updatecarsDateDropOff,
            CarPrice:this.state.updateCarPrice,
            CarPeople:this.state.updateCarPeople,
            CarDoors:this.state.updateCarDoors,
            CarBags:this.state.updateCarBags,
        };
        if(this.state.updateCarId === '' || this.state.updateCarPlace === '' || this.state.updatecarsDatePickUp === '' || this.state.updatecarsDateDropOff === '' || this.state.updateCarPrice === ''  ){
            swal("Required","Please enter all the values!", "error");
        }
        else if(!validator.isAlpha(this.state.updateCarPlace)){
            swal("invalid","Please enter valid Place!", "error");
        }
        else{
            API.UpdateCarListing(CarDetails)
                .then((status) => {
                    if (status ==204) {
                        swal("success","Car Listing has been updated successfully", "success");
                    }
                    else {
                        swal("error","There seems to be an error", "error");
                    }
                });
        }
    };
    render() {
        return (
            <div className="container-fluid ">
                <Tabs style={{backgroundColor:'#E9ECEF'}}
                      styles={color}
                      value={this.state.Tabvalue}
                      onChange={this.handleChangeTab}>
                    <Tab label="HOTELS" backgroundColor={deepOrange500} icon={<Hotel />} value="Hotel">
                        <div style={{backgroundColor: '#E9ECEF'}} >
                            <Paper zDepth={1}>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="ID"
                                           value={this.state.updateHotelId}
                                           onChange={this.updateHotelId}/>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="Name"
                                           value={this.state.updateHotelName}
                                           onChange={this.updateHotelName}/>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="Address"
                                           value={this.state.updateHotelAddress}
                                           onChange={this.updateHotelAddress}/>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="City"
                                           value={this.state.updateHotelCity}
                                           onChange={this.updateHotelCity}/>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="State"
                                           value={this.state.updateHotelState}
                                           onChange={this.updateHotelState}/>
                                <TextField className="mr-4 m1-4"
                                           type="number"
                                           floatingLabelText="Single Room price in $"
                                           value={this.state.updateSingleRoomPrice}
                                           onChange={this.updateSingleRoomPrice}/>
                                <TextField className="mr-4 m1-4"
                                           type="number"
                                           floatingLabelText="Double Room price in $"
                                           value={this.state.updateDoubleRoomPrice}
                                           onChange={this.updateDoubleRoomPrice}/>
                                <TextField className="mr-4 m1-4"
                                           type="number"
                                           floatingLabelText="suit Room price in $"
                                           value={this.state.updatesuitRoomPrice}
                                           onChange={this.updatesuitRoomPrice}/>

                                <DatePicker className="mr-4 ml-4"
                                            hintText={"Hotels Date From " + this.state.HotelsDateFrom}
                                            value={this.state.HotelsDateFrom}
                                            onChange={this.AddHotelsDateFrom}/>
                                <DatePicker className="mr-4 ml-4"
                                            hintText={"Hotels Date To " +this.state.HotelsDateTo}
                                            value={this.state.HotelsDateTo}
                                            onChange={this.AddHotelsDateTo}/>

                                {/*<h5 className="mt-4">Availability: </h5>*/}
                                {/*<DropDownMenu value={this.state.updateHotelAvail} onChange={this.updateHotelAvail}>*/}
                                {/*<MenuItem value={'yes'} primaryText="Yes" />*/}
                                {/*<MenuItem value={'no'} primaryText="No" />*/}
                                {/*</DropDownMenu>*/}
                                <Divider/>
                                <RaisedButton className="m-4"
                                              label = "Update Listing"
                                              labelColor ={fullWhite}
                                              backgroundColor={cyan500}
                                              onClick={this.updateHotelListing}
                                />
                            </Paper>
                        </div>
                    </Tab>
                    <Tab label="FLIGHTS" icon={<ActionFlightTakeoff />} value="Flight">
                        <div>
                            <Paper zDepth={1}>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="ID"
                                           value={this.state.updateFlightId}
                                           onChange={this.updateFlightId}/>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="Operator"
                                           value={this.state.updateFlightOperator}
                                           onChange={this.updateFlightOperator}/>
                                <TimePicker
                                    format="24hr"
                                    hintText={"Departure Time " + this.state.updateFlightDepTime}
                                    value={this.state.updateFlightDepTime}
                                    onChange={this.updateFlightDepTime}
                                />
                                <TimePicker
                                    format="24hr"
                                    hintText={"Arrival Time " + this.state.updateFlightArrTime}
                                    value={this.state.updateFlightArrTime}
                                    onChange={this.updateFlightArrTime}
                                />
                                <DatePicker
                                    hintText={"Departure Date "+this.state.updateFlightDateDep}
                                    value={this.state.updateFlightDateDep}
                                    onChange={this.updateFlightDateDep}
                                    errorText={this.state.errFlightDepDate}
                                    minDate={today}
                                />
                                <DatePicker
                                    hintText={"Arrival Date "+this.state.updateFlightDateArr}
                                    value={this.state.updateFlightDateArr}
                                    onChange={this.updateFlightDateArr}
                                    minDate={this.state.updateFlightDateDep}
                                    errorText={this.state.errFlightDepDate}
                                />
                                <label>Number of Stops:</label>
                                <DropDownMenu value={this.state.updateStops} onChange={this.updateStops}>
                                    <MenuItem value="1 Stop" primaryText="1 stop" />
                                    <MenuItem value="2 Stops" primaryText="2 stops" />
                                    <MenuItem value="Nonstop" primaryText="Nonstop" />
                                </DropDownMenu>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="Economy Price in $"
                                           errorText={this.state.errFlightEconomy}
                                           value={this.state.updateFlightEconomy}
                                           onChange={this.updateFlightEconomy}/>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="Business Price in $"
                                           errorText={this.state.errFlightBusiness}
                                           value={this.state.updateFlightBusiness}
                                           onChange={this.updateFlightBusiness}/>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="First Class Price in $"
                                           errorText={this.state.errFlightFirstClass}
                                           value={this.state.updateFlightFirstClass}
                                           onChange={this.updateFlightFirstClass}/>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="Origin"
                                           value={this.state.updateFLightOrigin}
                                           onChange={this.updateFLightOrigin}/>
                                <TextField className="mr-4 m1-4"
                                           floatingLabelText="Destination"
                                           value={this.state.updateFLightDest}
                                           onChange={this.updateFLightDest}/>
                                <Divider/>
                                <RaisedButton className="m-4"
                                              label = "Update Listing"
                                              labelColor ={fullWhite}
                                              backgroundColor={cyan500}
                                              onClick={this.updateFlightListing}
                                />
                            </Paper>
                        </div>
                    </Tab>
                    <Tab label="CARS" value="Car" icon={<Car />} >
                        <div>
                            <Paper zDepth={1}>
                                <TextField className="ml-3"
                                           floatingLabelText="ID"
                                           value={this.state.updateCarId}
                                           onChange={this.updateCarId}/>
                                <label>Car Type:</label>
                                <DropDownMenu className="mt-3 ml-3"
                                              value={this.state.updateCarType} onChange={this.updateCarType}>
                                    <MenuItem value='Medium' primaryText="Medium" />
                                    <MenuItem value='SUV' primaryText="SUV" />
                                    <MenuItem value='Small' primaryText="Small" />
                                    <MenuItem value='Convertible' primaryText="Convertible" />
                                    <MenuItem value='Large' primaryText="Large" />
                                </DropDownMenu>
                                <TextField className="ml-3"
                                           floatingLabelText="Place"
                                           value={this.state.updateCarPlace}
                                           onChange={this.updateCarPlace}/>
                                <DatePicker className="ml-3"
                                            hintText={"pick-up on"+' '+this.state.updatecarsDatePickUp}
                                            value={this.state.updatecarsDatePickUp}
                                            onChange={this.updatecarsDatePickUp}/>
                                <DatePicker className="ml-3"
                                            hintText={"drop-off on"+' '+this.state.updatecarsDateDropOff}
                                            value={this.state.updatecarsDateDropOff}
                                            onChange={this.updatecarsDateDropOff}/>
                                <TextField className="ml-3"
                                           floatingLabelText="Price in $"
                                           type="number"
                                           value={this.state.updateCarPrice}
                                           onChange={this.updateCarPrice}/>
                                <div>
                                    <label className="ml-3">People:</label>
                                    <DropDownMenu value={this.state.updateCarPeople} onChange={this.updateCarPeople}>
                                        <MenuItem value='1 People' primaryText="1" />
                                        <MenuItem value='2 People' primaryText="2" />
                                        <MenuItem value='3 People' primaryText="3" />
                                        <MenuItem value='4 People' primaryText="4" />
                                        <MenuItem value='5 People' primaryText="5" />
                                        <MenuItem value='6 People' primaryText="6" />
                                        <MenuItem value='7 People' primaryText="7" />
                                        <MenuItem value='8 People' primaryText="8" />
                                        <MenuItem value='9 People' primaryText="9" />
                                        <MenuItem value='10 People' primaryText="10" />
                                    </DropDownMenu>
                                    <label className="mt-3">Doors:</label>
                                    <DropDownMenu value={this.state.updateCarDoors} onChange={this.updateCarDoors}>
                                        <MenuItem value='1 Doors' primaryText="1" />
                                        <MenuItem value='2 Doors' primaryText="2" />
                                        <MenuItem value='3 Doors' primaryText="3" />
                                        <MenuItem value='4 Doors' primaryText="4" />
                                        <MenuItem value='5 Doors' primaryText="5" />
                                        <MenuItem value='6 Doors' primaryText="6" />
                                        <MenuItem value='7 Doors' primaryText="7" />
                                        <MenuItem value='8 Doors' primaryText="8" />
                                        <MenuItem value='9 Doors' primaryText="9" />
                                        <MenuItem value='10 Doors' primaryText="10" />
                                    </DropDownMenu>
                                    <label>Bags:</label>
                                    <DropDownMenu value={this.state.updateCarBags} onChange={this.updateCarBags}>
                                        <MenuItem value='1 Bags' primaryText="1" />
                                        <MenuItem value='2 Bags' primaryText="2" />
                                        <MenuItem value='3 Bags' primaryText="3" />
                                        <MenuItem value='4 Bags' primaryText="4" />
                                        <MenuItem value='5 Bags' primaryText="5" />
                                        <MenuItem value='6 Bags' primaryText="6" />
                                        <MenuItem value='7 Bags' primaryText="7" />
                                        <MenuItem value='8 Bags' primaryText="8" />
                                        <MenuItem value='9 Bags' primaryText="9" />
                                        <MenuItem value='10 Bags' primaryText="10" />
                                    </DropDownMenu>
                                </div>
                                <Divider/>
                                <RaisedButton
                                    label = "Update Listing"
                                    labelColor ={fullWhite}
                                    backgroundColor={cyan500}
                                    onClick={this.updateCarListing}
                                />
                            </Paper>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default HomePageSearchTabs;