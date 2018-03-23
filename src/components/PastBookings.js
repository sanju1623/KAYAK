import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {deepOrange500} from 'material-ui/styles/colors';
import * as API from '../api/API';


class PastBookings extends Component {
    constructor(props) {
  super(props);
  this.state = {
    pastBookings : [
    // {'PaymentId':334355,'amount':60,'bookingId':3,'category':'Car','carDropOff':'2017-11-30 02:00:38','carPickUp':'2017-11-26 02:00:38','carPlace':'Paris', 'paymentDate':'2017-11-23'},
    // {'PaymentId':334355,'amount':600,'bookingId':3,'category':'Flight','BookingDate':'DAL',departure:"2:17 AM",destination:"Kansas",flightsDateFrom:"2018-01-21",itemId:"FIH748",journey:"12:51",operator:"Emirates",origin:"Newjersy",passengerCount:"2",paymentDate:"2017-11-25",type:"Nonstop",flightsDateTo:"2018-01-23",arrival:"3:08 PM"},
    // {'PaymentId':334355,'amount':60,'bookingId':3,'category':'Hotel','hotelsDateFrom':'2017-12-28','hotelsDateTo':'2017-12-30', 'paymentDate':'2017-11-23','adult':2,'Child':2,'Rooms':1},
    // //flightsDateTo ?? Not there in the hotele payment obj ?
    //
  ],
  hotels:[],
  flights:[],
  cars:[],
  }};

    //
    // componentWillMount()
    // {
    //     API.getUserPayments()
    //         .then((result) => {
    //         console.log(result);
    //
    //         alert("Successfully Retrived ALL Details");
    //
    //         });
    //
    // }
    componentDidMount()
    {
        // API.getUserPayments()
        //     .then((result) => {
        //         console.log(result);
        //     });

    }
componentWillMount()
  {
      API.getUserPayments()
          .then((result) => {
             // alert("inside");
              this.setState({
                  pastBookings:result
              });
              console.log(this.state.pastBookings);
              if(this.state.pastBookings.length!=0) {
                  var hotels = this.state.pastBookings.filter(val => {
                      return val.category === 'hotel';
                  });
                  var flights = this.state.pastBookings.filter(val => {
                      return val.category === 'flight';
                  });
                  var cars = this.state.pastBookings.filter(val => {
                      return val.category === 'car';
                  });
                  console.log(cars);
                  this.setState({
                      hotels: hotels,
                      flights: flights,
                      cars: cars,
                  });
              }
          });
  }

    render() {

        let flightsCard = <div>
                          {this.state.flights.map((booking ,index) => (
                            <div className="card text-left mb-2" key={index}>
                              <div className="card-body">
                              <div className="form-inline">
                                  <h4 className="card-title mr-5 pr-5">Flight</h4>
                                  <h4 className="card-text ml-5 pl-5 pull-right">Total : ${booking.amount}</h4>
                              </div>
                                  <h6 className="card-subtitle mb-2 text-muted">Booking ID: {booking.PaymentId}</h6>
                                <div className="mt-1">
                                  <h5 className="card-text mr-5 pr-5">Departure : {booking.origin + ' ' + booking.flightsDateFrom + ' ' + booking.departure}</h5>
                                  <h5 className="card-text mr-5 pr-5">Arrival : {booking.destination + '  ' + booking.flightsDateFrom + '  ' + booking.arrival}</h5>
                                </div>
                                  <h5 className="card-text mt-2 mr-3">Operator : {booking.operator}</h5>
                                  <h5 className="card-text mt-2">Type : {booking.type}</h5>
                                <h5 className="card-text mt-2">Travellers : {booking.passengerCount}</h5>
                                <h5 className="card-text mt-2">Booking Made On : {booking.paymentDate}</h5>
                              </div>
                            </div>
                          ))}
                      </div>
      let hotelsCard = <div>
                          {this.state.hotels.map((booking ,index) => (
                            <div className="card text-left mb-2" key={index}>
                              <div className="card-body">
                              <div className="form-inline">
                                  <h4 className="card-title mr-5 pr-5">Hotel</h4>
                                  <h4 className="card-text ml-5 pl-5 pull-right">Total : ${booking.amount}</h4>
                              </div>
                                <h6 className="card-subtitle mb-2 text-muted">Booking ID: {booking.PaymentId}</h6>
                                <div className="mt-1">
                                  <h5 className="card-text mr-5 pr-5">Check-in : {booking.hotelsDateFrom}</h5>
                                  <h5 className="card-text mr-5 pr-5">Check-out : {booking.hotelsDateTo}</h5>
                                </div>
                                <div className="mt-1 form-inline">
                                  <h5 className="card-text">Adults : {booking.adult}</h5>
                                  <h5 className="card-text ml-3">Children : {booking.Child}</h5>
                                  <h5 className="card-text ml-3">Rooms : {booking.Rooms}</h5>
                                </div>
                                <h5 className="card-text mt-2">Booking Made On : {booking.paymentDate}</h5>
                              </div>
                            </div>
                          ))}
                      </div>
      let carsCard = <div>
                          {this.state.cars.map((booking ,index) => (
                            <div className="card text-left mb-2" key={index}>
                              <div className="card-body">
                              <div className="form-inline">
                                  <h4 className="card-title mr-5 pr-5 pl-3 ">Car</h4>
                                  <h4 className="card-text ml-5 pl-5 pull-right">Total : ${booking.amount}</h4>
                              </div>
                                <h6 className="card-subtitle mb-2 text-muted">Booking ID: {booking.PaymentId}</h6>
                                <h5 className="card-text">Drop Off : {booking.carPickUp}</h5>
                                <h5 className="card-text">Drop Off : {booking.carDropOff}</h5>
                                <h5 className="card-text">car Place : {booking.carPlace}</h5>
                                <h5 className="card-text mt-2">Booking Made On : {booking.paymentDate}</h5>
                              </div>
                            </div>
                          ))}
                      </div>

        return (
            <div className="container-fluid p-3" id ='past' style={{backgroundColor:'#E9ECEF',height: '100vh'}}>
            <div className="justify-content-start Text-big Text-bold">
              <h4>Past Bookings: </h4>
            </div> <hr/>
            <div data-spy="scroll" data-target="#past">
              {flightsCard}
              {hotelsCard}
              {carsCard}
            </div>
            </div>
        );
    }
}

export default PastBookings;
