import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import {fullWhite} from 'material-ui/styles/colors';
import Navbar from "./Navbar";
import * as API from '../api/API';
import HomePageSearchTabs from "./HomePageSearchTabs";
import BillingMain from "./BillingMain";
import MyAccountHome from "./MyAccountHome";
import HomePageNavBar from "./HomePageNavBar";
import Admin from "./Admin";
import Hotels from "./Hotels";
import Flights from "./Flights";
import ErrorBoundary from "./ErrorBoundary";
import UserProfile from "./UserProfile";
import Cars from "./Cars";
import '../App.css';
import swal from 'sweetalert';
import {carDetails} from "../api/API";
const fontSize = {
    fontSize: 45,
    color:fullWhite,
    fontWeight:30
};
class NewerHomePage extends Component {
    state = {
        carListings:[],
        flightListings:[],
        carPayment:{},
        flightPayment:{},
        carDetails:{},
        flightTotalCount:0,
        payment:{},
        flightsDateFrom:'',
        hotelResults : [],
        fromTime:'',
        loggedin:''
    };


    HotelPayment=(hotelDetails)=>{

        console.log('-------------------');

        console.log(hotelDetails);
        console.log('--------------------');
        hotelDetails.hotelsDateFrom=this.state.hotelResults.from;
        hotelDetails.hotelsDateTo=this.state.hotelResults.to;
        hotelDetails.category="hotel";
        hotelDetails.hotelsRoomsCount=this.state.hotelResults.hotelsRoomsCount;
        hotelDetails.hotelAdultsCount=this.state.hotelResults.hotelAdultsCount;
        hotelDetails.hotelChildCount=this.state.hotelResults.hotelChildCount;
        hotelDetails.hotelsRoomType=this.state.hotelResults.hotelsRoomType;

        this.setState({
            payment:hotelDetails
        });


        API.getsession()
            .then((data) => {
                //console.log(data.user);
                if(data.user===undefined)
                {
                    swal("Please Signin to further Continue");
                    this.props.history.push("/");
                }
                else
                {

                    this.props.history.push("/billing")
                }
            });




    };

    flightPayment=(flightPaymentDetails)=>{
        //alert("inside landing");
        flightPaymentDetails.category="flight";
        flightPaymentDetails.flightsDateFrom=this.state.flightsDateFrom;
        this.setState({
            payment:flightPaymentDetails
        });
        API.getsession()
            .then((data) => {
                //console.log(data.user);
                if(data.user===undefined)
                {
                    swal("Please Signin to further Continue");
                    this.props.history.push("/");
                }
                else
                {

                    this.props.history.push("/billing")
                }
            });

    };

    handleCarsPayment=(carPaymentdetails,)=>{


        carPaymentdetails.category="car";
        carPaymentdetails.carPickupPlace=this.state.carDetails.carPickupPlace;
        carPaymentdetails.carsDatePickUp=this.state.carDetails.carsDatePickUp;
        carPaymentdetails.carsDateDropOff=this.state.carDetails.carsDateDropOff;
        carPaymentdetails.carsTimePickUp=this.state.carDetails.carsTimePickUp;
        carPaymentdetails.carsTimeDropOff=this.state.carDetails.carsTimeDropOff;
       // carPaymentdetails.Company=this.state.carDetails.Company;
        console.log('----IN LANDING PAGE-----------');
        console.log(carPaymentdetails);
        console.log('-----IN LANDING PAGE----------');

        this.setState({
            payment:carPaymentdetails
        });


        API.getsession()
            .then((data) => {
                //console.log(data.user);
                if(data.user===undefined)
                {
                    swal("User should be logined to make payment");
                }
                else
                {
var d=new Date();
var out=(d.getTime()-carPaymentdetails.carPage.getTime())*1000;
console.log(out);

                    this.props.history.push("/billing")
                }
            });

    };

    componentWillMount(){

        //          console.log("logged");

        if(this.state.loggedin=='logged') {
            var fromTime = new Date();
            this.setState({
                fromTime: fromTime,
            });


        }
    };





    checklogged=()=>
    {

        var fromTime=new Date();
        this.setState({
            loggedin:'logged',
            fromTime:fromTime,
        });

    };






    handleCarDetails=(carDetails)=>{
        this.setState({
            carDetails:carDetails
        });
    };
    handleCars=(cardata) =>{
        this.setState({
            carListings:cardata
        });
        console.log(this.state.carListings);
        if(cardata.length>0) {

            this.props.history.push("/Cars");

        }
    };

    handleHotels=(hoteldata)=>{
        console.log(hoteldata);
        this.setState({
            hotelResults:hoteldata
        });

        this.props.history.push("/Hotels");
    };


    checklogout=()=>
    {

        alert("not logged");
        this.setState({
           loggedin:'notlogged'
        });

    };

    handleFlights=(flightdata,flightTotalCount,flightsDateFrom) =>{
        this.setState({
            flightListings:flightdata,
            flightTotalCount:flightTotalCount,
            flightsDateFrom:flightsDateFrom
        });
        // console.log(this.state.flightListings);



        this.props.history.push("/Flights");
    };
    render() {
        return (
            <div className="container-fluid" >
                <Route exact path="/" render={() => (
                    <div className='LandingPage-background' >
                        <div className="row col-md-12 justify-content-center" >

                            <div className="col-md-2 justify-content-start pt-4" >
                                <img src="/images/kayaklogo.png" />
                            </div>
                            <div className="col-md-8 justify-content-start pt-2" >
                              <HomePageNavBar/>
                            </div>
                            <div className="col-md-2 justify-content-start pt-2" >
                                <MyAccountHome checklogged={this.checklogged} checklogout={this.checklogout}/>
                            </div>
                        </div>
                        <hr className="hr"/>
                        <br/><br/>
                        <div className="row col-md-12 justify-content-center pt-2" >
                            <h1 style={fontSize}>Search hundreds of travel sites at once</h1>
                        </div><br/>
                        <div className="row justify-content-center">
                            <div className="col-md-11 justify-content-center">
                                <HomePageSearchTabs loggedin={this.state.loggedin} handleHotels={this.handleHotels} handleCarDetails={this.handleCarDetails} handleCars={this.handleCars} handleFlights={this.handleFlights} />
                            </div>
                        </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                )}/>
                <Route exact path="/admin" render={() => (

                    <ErrorBoundary><Admin/></ErrorBoundary>

                )}/>
                <Route exact path="/Hotels" render={() => (
                    <Hotels HotelPayment={this.HotelPayment}  loggedin={this.state.loggedin}   hotelList={this.state.hotelResults}/>
                )}/>
                <Route exact path="/Flights" render={() => (
                    <Flights flightPayment={this.flightPayment} loggedin={this.state.loggedin} flightList={this.state.flightListings} flightsDateFrom={this.state.flightsDateFrom} flightTotalCount={this.state.flightTotalCount}/>
                )}/>
                <Route exact path="/Cars" render={() => (
                    <Cars  carList={this.state.carListings}  loggedin={this.state.loggedin} carPayment={this.handleCarsPayment}/>
                )}/>
                <Route exact path="/billing" render={() => (
                    <BillingMain   payment={this.state.payment}/>
                )}/>
                <Route exact path="/UserProfile" render={() => (
                    <UserProfile/>
                )}/>

            </div>
        );
    }
}

export default withRouter(NewerHomePage);