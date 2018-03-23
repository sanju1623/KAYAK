import React, {Component} from 'react';
import '../cssfiles/flightcard.css';
import * as API from '../api/API';

class FlightCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightTotalCount:this.props.flightTotalCount,
            flightsDateFrom:this.props.flightsDateFrom,
            fromTime:'',
        };
    }
    componentWillMount(){
        //     console.log("----------------");
        //   console.log(this.props.flightResults);
        // console.log(this.state.flightTotalCount);
        //     console.log("----------------");

        var fromTime=new Date();
        this.setState({
            fromTime:fromTime
        });

    };

    selectFlight = (ID,flightprice,operator,departureTime,arrivalTime,journey,origin,type,destination) => {
        var flightPayment={};
        flightPayment.id=ID;
        flightPayment.price=this.state.flightTotalCount*flightprice;
        flightPayment.operator=operator;
        flightPayment.departureTime=departureTime;
        flightPayment.arrivalTime=arrivalTime;
        flightPayment.journey=journey;
        flightPayment.origin=origin;
        flightPayment.type=type;
        flightPayment.destination=destination;
        flightPayment.count=this.state.flightTotalCount;
        //console.log(flightPayment);
        this.props.flightPayment(flightPayment);
    };
//this.props.flightResults
    render() {

        return (
            <div className="flight-container">
                {
                    this.props.flightResults.map((flight, index) => (


                        <div className="flight-card row">

                            <div className="col-lg-3 col-sm-3 col-md-3 col-xs-3 first">
                                {
                                    [6].map(function (index1) {
                                        if(index==0)
                                            return <img className="picture" src="https://netdna.webdesignerdepot.com/uploads/2009/03/emirates_logo2.gif" />
                                        else if(index % index1==1)
                                            return <img className="picture" src="https://netdna.webdesignerdepot.com/uploads/2009/03/emirates_logo2.gif" />
                                        else if(index % index1==2)
                                            return <img className="picture" src="https://netdna.webdesignerdepot.com/uploads/2009/03/qantas2.gif" />
                                        else if(index % index1==3)
                                            return <img className="picture" src="https://netdna.webdesignerdepot.com/uploads/2009/03/qantas2.gif" />
                                        else if(index % index1==4)
                                            return <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjQHLaujajj9zlxMGwYdCaK0hWvIXxykWhDKEI5NTa3BDOnpwp" />
                                        else if(index % index1==5)
                                            return <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUxr_c1mve97BBqekD7A7RUXC9F5cps6gOTS5ayA3k7pVbe7Zp" />
                                        else if(index % index1==0)
                                            return <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0sKtf4L4i8irKOVYeO8lQILqkdOHGss5T-NfVHp5rYPSFsCGoOQ" />

                                    })
                                }
                            </div>


                            <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6 flightmiddle">
                                <div className="row flighttitlerow">
                                    <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 flighttitle">
                                        <span className="cardTitle">{flight.DepartureTime}</span>
                                        <div className="connector"></div>
                                        <span className="cardTitle">{flight.ArrivalTime}</span>

                                    </div>
                                </div>
                                <div className="row flightsecondrow">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 flightdetail">
                                        <span className="source">{flight.origin}</span>
                                        <span className="stop">{flight.type}</span>
                                        <span className="destination">{flight.destination}</span>
                                    </div>
                                </div>
                                <div className="row flightthirdrow">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 flightdetail">
                                        <span className='airlinename'>{flight.operator}</span>
                                    </div>
                                </div>


                            </div>


                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 last">
                                <span id="flightcost">${flight.flightPrice}</span>
                                <div className="row">
                                    <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 flightkayak">
                                        <div>KAYAK</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                                        <button className="flightbookdealbutton"
                                        onClick={() =>this.selectFlight(flight.id,flight.flightPrice,flight.operator,flight.DepartureTime,flight.ArrivalTime,flight.JourneyTime,flight.origin,flight.type,flight.destination)}
                                        >Book Deal </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        );


    }
}
export default FlightCard;