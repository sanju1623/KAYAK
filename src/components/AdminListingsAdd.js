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
import AutoComplete from 'material-ui/AutoComplete';
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

    static propTypes = {

    };
    componentDidMount(){
        document.title = `Admin - Listings`;
    }
    state = {

    };
    constructor(props) {
    super(props);
    this.state = {
      value: 'Hotels',
      HotelId:'',
      HotelName:'',
      HotelAddress:'',
      HotelCity:'',
      HotelState:'',
      HotelPrice:'',
      errHotelId:'',
      errHotelName:'',
      errHotelAddress:'',
      errHotelCity:'',
      errHotelState:'',
      errHotelPrice:'',
      FlightId:'',
      FilghtOperator :'',
      FlightDateDep:'',
      FlightDateArr:'',
      FilghtDepTime :'',
      FilghtArrTime :'',
      FilghtEconomy:'',
      FilghtBusiness:'',
      FilghtFirstClass:'',
      errFilghtEconomy:'',
      errFilghtBusiness:'',
      errFilghtFirstClass:'',
      FlightStops:'1 stop',
      FLightOrigin :'',
      FLightDest:'',
      errFlightId:'',
      errFilghtOperator :'',
      errFilghtDepTime :'',
      errFilghtArrTime :'',
      errFilghtDepDate :'',
      errFilghtArrDate :'',
      errFLightOrigin :'',
      errFLightDest:'',
      CarId:'',
      CarType: 'Compact',
      CarPlace:'',
      carsDatePickUp:'',
      carsDateDropOff:'',
      CarPrice:'',
      CarPeople:'1',
      CarDoors:'1',
      CarBags:'1',
      errCarId:'',
      errCarPlace:'',
      errcarsDatePickUp:'',
      errcarsDateDropOff:'',
      errCarPrice:null,
        singleRoomPrice:'',
        doubleRoomPrice:'',
        suitRoomPrice:'',
        HotelsDateFrom:'',
        HotelsDateTo:''
    };
  }
  handleChangeTab = (value) => {this.setState({ value: value,});
  };
  AddHotelId = (event) => {this.setState({HotelId: event.target.value});};
  AddHotelName = (event) => {this.setState({HotelName: event.target.value});};
  AddHotelAddress = (event) => {this.setState({HotelAddress: event.target.value});};
  AddHotelCity = (event) => {this.setState({HotelCity: event.target.value});};
  AddHotelState = (value) => {this.setState({HotelState: value});};
    AddHotelPrice = (event) => {this.setState({singleRoomPrice: event.target.value});};
    AddDoublePrice = (event) => {this.setState({doubleRoomPrice: event.target.value});};
    AddSuitPrice = (event) => {this.setState({suitRoomPrice: event.target.value});};
    AddHotelsDateFrom=(event,date)=>{this.setState({HotelsDateFrom: date});};
    AddHotelsDateTo=(event,date)=>{this.setState({HotelsDateTo: date});};

    addHotelListing = () => {
    var hotelDetails={
      HotelId:this.state.HotelId,
      HotelName:this.state.HotelName,
      HotelAddress:this.state.HotelAddress,
      HotelCity:this.state.HotelCity,
      HotelState:this.state.HotelState,
        singleRoomPrice:this.state.singleRoomPrice,
        doubleRoomPrice:this.state.doubleRoomPrice,
        suitRoomPrice:this.state.suitRoomPrice,
        HotelsDateFrom:this.state.HotelsDateFrom,
        HotelsDateTo:this.state.HotelsDateTo
    };
    console.log(hotelDetails);
  if(this.state.HotelState=='' || this.state.HotelId =='' || this.state.HotelName =='' || this.state.HotelAddress ==''
          || this.state.HotelCity ==''
      )
  {
      if(this.state.HotelId ==''){this.setState({errHotelId:"This field is required" });}
      if(this.state.HotelName ==''){this.setState({errHotelName:"This field is required" });}
      if(this.state.HotelAddress ==''){this.setState({errHotelAddress:"This field is required" });}
      if(this.state.HotelCity ==''){this.setState({errHotelCity:"This field is required" });}
      if(this.state.HotelState ==''){this.setState({errHotelState:"This field is required" });}
        if(this.state.singleRoomPrice ==''){this.setState({errHotelState:"This field is required" });}
        if(this.state.doubleRoomPrice ==''){this.setState({errHotelState:"This field is required" });}
        if(this.state.suitRoomPrice ==''){this.setState({errHotelState:"This field is required" });}
        swal("Required","Please enter all the values!", "error");
      }
        else if(!validator.isAlpha(this.state.HotelName)){
        swal("invalid","Please enter valid Hotel Name!", "error");
      }
      else if(!validator.isAlpha(this.state.HotelCity)){
        swal("invalid","Please enter valid City!", "error");
      }
      else if(!states.includes(this.state.HotelState)) {
      swal("invalid", "Please enter valid State!", "error");
  }
        else{

         API.addHotelListing(hotelDetails).then((status1) => {
              if (status1 === 201){
                  swal("success","Hotel Listing has been successfully added", "success");
                }
              else{
                  swal("Fail","Hotel Listing already exists", "error");
                }
          });
          console.log(hotelDetails);
      }
  };

  AddFlightId = (event) => {this.setState({FlightId: event.target.value});};
  AddFilghtOperator = (event) => {this.setState({FilghtOperator : event.target.value});};
  AddFilghtDepTime = (event, date) => {this.setState({FilghtDepTime: date});};
  AddFilghtArrTime = (event, date) => {this.setState({FilghtArrTime: date});};
  AddFLightOrigin = (event) => {this.setState({FLightOrigin: event.target.value});};
  AddFLightDest = (event) => {this.setState({FLightDest: event.target.value});};
  AddFlightPrice = (event) => {this.setState({FlightPrice: event.target.value});};
  AddFilghtEconomy = (event) => {this.setState({FilghtEconomy: event.target.value});};
  AddFilghtBusiness = (event) => {this.setState({FilghtBusiness: event.target.value});};
  AddFilghtFirstClass = (event) => {this.setState({FilghtFirstClass: event.target.value});};
  handleFlightStops = (event, index, FlightStops) => {
    this.setState({FlightStops});
  };
  handleFlightsDateDep = (event, date) => {
    this.setState({FlightDateDep: date,
  });
};
  handleFlightsDateArr = (event, date) => {this.setState({FlightDateArr: date});};
  addFlightListing = () => {
    var FlightDetails={
      FlightId:this.state.FlightId,
      FilghtOperator:this.state.FilghtOperator,
      FilghtDepTime:this.state.FilghtDepTime,
      FilghtArrTime:this.state.FilghtArrTime,
      FLightOrigin:this.state.FLightOrigin,
      FLightDest:this.state.FLightDest,
      FlightDateDep:this.state.FlightDateDep,
      FlightDateArr:this.state.FlightDateArr,
      FilghtEconomy:this.state.FilghtEconomy,
      FilghtBusiness:this.state.FilghtBusiness,
      FilghtFirstClass:this.state.FilghtFirstClass,
      FlightStops:this.state.FlightStops,
    }
    console.log(FlightDetails);
   if(this.state.FlightId === '' || this.state.FilghtOperator === '' || this.state.FilghtDepTime === '' || this.state.FilghtArrTime === '' || this.state.FlightDateDep === '' || this.state.FlightDateArr === '' ||this.state.FLightOrigin === '' || this.state.FLightDest === '' || this.state.FilghtEconomy === '' || this.state.FilghtBusiness === '' || this.state.FilghtFirstClass === '' ){
      if(this.state.FlightId ==''){this.setState({errFlightId:"This field is required" });}
       if(this.state.FilghtOperator ==''){this.setState({errFilghtOperator:"This field is required" });}
       if(this.state.FilghtDepTime ==''){this.setState({errFilghtDepTime:"This field is required" });}
       if(this.state.FilghtArrTime ==''){this.setState({errFilghtArrTime:"This field is required" });}
       if(this.state.FlightDateDep ==''){this.setState({errFilghtDepDate:"This field is required" });}
       if(this.state.FlightDateArr ==''){this.setState({errFilghtArrDate:"This field is required" });}
       if(this.state.FLightOrigin ==''){this.setState({errFLightOrigin:"This field is required" });}
       if(this.state.FLightDest ==''){this.setState({errFLightDest:"This field is required" });}
       if(this.state.FilghtEconomy ==''){this.setState({errFilghtEconomy:"This field is required" });}
       if(this.state.FilghtBusiness ==''){this.setState({errFilghtBusiness:"This field is required" });}
       if(this.state.FilghtFirstClass ==''){this.setState({errFilghtFirstClass:"This field is required" });}
      swal("Required","Please enter all the values!", "error");
    }
    else if(!validator.isAlpha(this.state.FilghtOperator)){
      swal("invalid","Please enter valid Operator!", "error");
    }
    else if(!validator.isAlpha(this.state.FLightOrigin)){
      swal("invalid","Please enter valid Origin!", "error");
    }
    else if(!validator.isAlpha(this.state.FLightDest)){
      swal("invalid","Please enter valid Destination!", "error");
    }
    else{
      API.AddFlightListing(FlightDetails)
          .then((status) => {
              if (status == 204) {
                  swal("success","Flight Listing has been successfully added", "success");
              }
              else{
                swal("Fail","Flight Listing already exists", "error");
              }
          });
    }

  };
  
   AddCarId = (event) => {this.setState({CarId: event.target.value});};
  handleCarType = (event, index, CarType) => this.setState({CarType});
  AddCarPlace = (event) => {this.setState({CarPlace: event.target.value});};
  handleChangeCarsDatePickUp = (event, date) => {this.setState({carsDatePickUp: date,});};
  handleChangeCarsDateDropOff = (event, value) => {this.setState({carsDateDropOff: value,});};
  AddCarPrice = (event) => {this.setState({CarPrice: event.target.value});};
  handleCarPeople = (event, index, CarPeople) => this.setState({CarPeople});
  handleCarDoors = (event, index, CarDoors) => this.setState({CarDoors});
  handleCarBags = (event, index, CarBags) => this.setState({CarBags});
  addCarListing = () => {
    var CarDetails={
      CarId:this.state.CarId,
      CarType: this.state.CarType,
      CarPlace:this.state.CarPlace,
      carsDatePickUp:this.state.carsDatePickUp,
      carsDateDropOff:this.state.carsDateDropOff,
      CarPrice:this.state.CarPrice,
      CarPeople:this.state.CarPeople,
      CarDoors:this.state.CarDoors,
      CarBags:this.state.CarBags,

    };
    console.log(CarDetails);


if(this.state.CarId==='' || this.state.CarPlace ==='' || this.state.CarPrice ==='' || this.state.carsDatePickUp ===''
        || this.state.carsDateDropOff ===''
    ) {
      if(this.state.CarId ==''){this.setState({errCarId:"This field is required" });}
      if(this.state.CarPlace ==''){this.setState({errCarPlace:"This field is required" });}
      if(this.state.CarPrice ==''){this.setState({errCarPrice:"This field is required" });}
      if(this.state.carsDatePickUp ==''){this.setState({errcarsDatePickUp:"This field is required" });}
      if(this.state.carsDateDropOff ==''){this.setState({errcarsDateDropOff:"This field is required" });}
      swal("Required","Please enter all the values!", "error");
    }
    else if(!validator.isAlpha(this.state.CarPlace)){
      swal("invalid","Please enter valid Place!", "error");
    }
    else{
      API.AddCarListing(CarDetails)
          .then((status) => {
              if (status ==204) {
                  swal("success","Car Listing has been successfully added", "success");
              }
              else {
                  swal("Fail","Car Listing already exists", "error");
              }
          });
        }
  };
  
  componentWillMount(){
    this.setState({
      HotelPrice: this.state.HotelPrice,
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
            <div className="container-fluid ">
            <Tabs style={{backgroundColor:'#E9ECEF'}}
            styles={color}
              value={this.state.value}
              onChange={this.handleChangeTab}>
                    <Tab label="HOTELS" backgroundColor={deepOrange500} icon={<Hotel />} value="Hotels">
                      <div style={{backgroundColor: '#E9ECEF'}} >
                        <Paper zDepth={1}>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="ID"
                            errorText={this.state.errHotelId}
                            onChange={this.AddHotelId}/>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="Name"
                            errorText={this.state.errHotelName}
                            onChange={this.AddHotelName}/>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="Address"
                            errorText={this.state.errHotelAddress}
                            onChange={this.AddHotelAddress}/>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="City"
                            errorText={this.state.errHotelCity}
                            onChange={this.AddHotelCity}/>
                       <AutoComplete
                            floatingLabelText={"State"}
                            filter={AutoComplete.fuzzyFilter}
                            value={this.state.HotelState}
                            onUpdateInput={this.AddHotelState}
                            errorText={this.state.errHotelState}
                            dataSource={states}
                            fullWidth={false}
                            maxSearchResults={10}
                          />
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="SingleRoomPrice in $"
                            type="number"
                            errorText={this.state.errHotelPrice}
                            onChange={this.AddHotelPrice}/>
                            <TextField className="mr-4 m1-4"
                                       floatingLabelText="DoubleRoomPrice in $"
                                       type="number"
                                       errorText={this.state.errHotelPrice}
                                       onChange={this.AddDoublePrice}/>
                            <TextField className="mr-4 m1-4"
                                       floatingLabelText="SuitRoomPrice in $"
                                       type="number"
                                       errorText={this.state.errHotelPrice}
                                       onChange={this.AddSuitPrice}/>
                            <DatePicker className="ml-3"
                                        hintText="HotelsDateFrom"
                                        value={this.state.HotelsDateFrom}
                                        onChange={this.AddHotelsDateFrom}/>
                            <DatePicker className="ml-3"
                                        hintText="HotelsDateTo"
                                        value={this.state.HotelsDateTo}
                                        onChange={this.AddHotelsDateTo}/>
                        <Divider/>
                        <RaisedButton className="m-4"
                        label = "Add Listing"
                        labelColor ={fullWhite}
                        backgroundColor={cyan500}
                        onClick={this.addHotelListing}
                        />
                          </Paper>
                      </div>
                    </Tab>
                    <Tab label="FLIGHTS" icon={<ActionFlightTakeoff />} value="Flights">
                      <div>
                      <Paper zDepth={1}>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="ID"
                          errorText={this.state.errFlightId}
                          onChange={this.AddFlightId}/>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="Operator"
                          errorText={this.state.errFilghtOperator}
                          onChange={this.AddFilghtOperator}/>
                      <DatePicker style={styles}
                        hintText="Departure Date"
                        value={this.state.FlightDateDep}
                        onChange={this.handleFlightsDateDep}
                        errorText={this.state.errFilghtDepDate}
                        minDate={today}
                      />
                      <DatePicker style={styles}
                        hintText="Arrival Date"
                        value={this.state.FlightDateArr}
                        onChange={this.handleFlightsDateArr}
                        minDate={this.state.FlightDateDep}
                        errorText={this.state.errFilghtDepDate}
                      />
                      <label>Number of Stops:</label>
                      <DropDownMenu value={this.state.FlightStops} onChange={this.handleFlightStops}>
                        <MenuItem value={'1 stop'} primaryText="1 stop" />
                        <MenuItem value={'2 stops'} primaryText="2 stops" />
                        <MenuItem value={'3 stops'} primaryText="3 stops" />
                      </DropDownMenu>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="Economy Price in $"
                           type="number"
                          errorText={this.state.errFilghtEconomy}
                          onChange={this.AddFilghtEconomy}/>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="Business Price in $"
                          type="number"
                          errorText={this.state.errFilghtBusiness}
                          onChange={this.AddFilghtBusiness}/>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="First Class Price in $"
                          errorText={this.state.errFilghtFirstClass}
                          type="number"
                          onChange={this.AddFilghtFirstClass}/>
                      <TimePicker
                        format="ampm"
                        hintText="Departure Time"
                        errorText={this.state.errFilghtDepTime}
                        value={this.state.FilghtDepTime}
                        onChange={this.AddFilghtDepTime}
                      />
                      <TimePicker
                        format="ampm"
                        hintText="Arrival Time"
                        errorText={this.state.errFilghtArrTime}
                        value={this.state.FilghtArrTime}
                        onChange={this.AddFilghtArrTime}
                      />
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="Origin"
                          errorText={this.state.errFLightOrigin}
                          onChange={this.AddFLightOrigin}/>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="Destination"
                          errorText={this.state.errFLightDest}
                          onChange={this.AddFLightDest}/>
                      <Divider/>
                      <RaisedButton className="m-4"
                      label = "Add Listing"
                      labelColor ={fullWhite}
                      backgroundColor={cyan500}
                      onClick={this.addFlightListing}
                      />
                        </Paper>
                      </div>
                    </Tab>
                    <Tab label="CARS" value="Cars" icon={<Car />} >
                      <div>
                      <Paper zDepth={1}>
                      <TextField className="ml-3"
                          floatingLabelText="ID"
                          errorText={this.state.errCarId}
                          onChange={this.AddCarId}/>
                      <label>Car Type:</label>
                      <DropDownMenu className="mt-3 ml-3" value={this.state.CarType} onChange={this.handleCarType}>
                        <MenuItem value={'Compact'} primaryText="Compact" />
                        <MenuItem value={'SUV'} primaryText="SUV" />
                        <MenuItem value={'Sedan'} primaryText="Sedan" />
                      </DropDownMenu>
                      <TextField className="ml-3"
                          floatingLabelText="Place"
                          errorText={this.state.errCarPlace}
                          onChange={this.AddCarPlace}/>
                      <DatePicker className="ml-3"
                        hintText={"pick-upon"}
                        value={this.state.carsDatePickUp}
                        errorText={this.state.errcarsDatePickUp}
                        onChange={this.handleChangeCarsDatePickUp}/>
                      <DatePicker className="ml-3"
                        hintText="drop-off on"
                        value={this.state.carsDateDropOff}
                        errorText={this.state.errcarsDateDropOff}
                        onChange={this.handleChangeCarsDateDropOff}/>
                      <TextField className="ml-3"
                          floatingLabelText="Price in $"
                          type="number"
                          errorText={this.state.errCarPrice}
                          onChange={this.AddCarPrice}/>
                      <div>
                        <label className="ml-3">People:</label>
                        <DropDownMenu value={this.state.CarPeople} onChange={this.handleCarPeople}>
                          <MenuItem value={'1'} primaryText="1" />
                          <MenuItem value={'2'} primaryText="2" />
                          <MenuItem value={'3'} primaryText="3" />
                          <MenuItem value={'4'} primaryText="4" />
                          <MenuItem value={'5'} primaryText="5" />
                          <MenuItem value={'6'} primaryText="6" />
                        </DropDownMenu>
                        <label className="mt-3">Doors:</label>
                        <DropDownMenu value={this.state.CarDoors} onChange={this.handleCarDoors}>
                          <MenuItem value={'1'} primaryText="1" />
                          <MenuItem value={'2'} primaryText="2" />
                          <MenuItem value={'3'} primaryText="3" />
                          <MenuItem value={'4'} primaryText="4" />
                        </DropDownMenu>
                        <label>Bags:</label>
                        <DropDownMenu value={this.state.CarBags} onChange={this.handleCarBags}>
                          <MenuItem value={'1'} primaryText="1" />
                          <MenuItem value={'2'} primaryText="2" />
                          <MenuItem value={'3'} primaryText="3" />
                          <MenuItem value={'4'} primaryText="4" />
                        </DropDownMenu>
                      </div>
                      <Divider/>
                      <RaisedButton
                      label = "Add Listing"
                      labelColor ={fullWhite}
                      backgroundColor={cyan500}
                      onClick={this.addCarListing}
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
