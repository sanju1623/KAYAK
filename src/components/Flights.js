import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import FlightSearchNavBar from "./FlightSearchNavBar";
import FlightOptions from "./FlightOptions";
import FlightCard from "./FlightCard";
import * as API from '../api/API';
import EmptyResults from "./EmptyResults";
const d=new Date;

class Flight extends Component {
  constructor(props) {
  super(props);
  this.state = {
    filterPrice:'',
     flightResults :[],
      totalFlightsResults:[],
      emptyResults:false,
      fromTime:'',
      loggedin:''
}};
    filterOption = (filterPrice) => {
        console.log("filterPrice in Flights: "+filterPrice);
        this.setState({filterPrice: filterPrice});
        var priceFilterArray = this.state.totalFlightsResults.filter(val => {return val.flightPrice < filterPrice;});
        if(priceFilterArray.length <= 0 ){
            console.log("Empty array ");
            this.setState({emptyResults: true});
        }
        else{
            this.setState({emptyResults: false});
        }
        console.log("After Filter: "+priceFilterArray);
        this.setState({flightResults: priceFilterArray});
    };

    componentWillMount()
    {
        if(this.props.flightList.length==0)
        {
            this.props.history.push('/');
        }

        var fromTime=new Date();
        this.setState({
            fromTime:fromTime
        });

        this.setState({
            flightResults:this.props.flightList,
            totalFlightsResults:this.props.flightList
        });

    }


    filterOptionDep = (filterDep) => {
        console.log("filterDep in Flights: "+filterDep);
        console.log("filterDep in Flights: "+filterDep);
        var DepFilterArray = this.state.totalFlightsResults.filter(val => {
            return Date.parse('01/01/2011' + ' ' + filterDep) > Date.parse('01/01/2011' + ' ' + val.DepartureTime);
        });
        if(DepFilterArray.length <= 0 ){
            console.log("Empty array ");
            this.setState({emptyResults: true});
        }
        else{
            this.setState({emptyResults: false});
        }
        console.log("After Filter: "+DepFilterArray);
        this.setState({flightResults: DepFilterArray});
    };

    filterOptionArr = (filterArr) => {
        console.log("filterArr in Flights: "+filterArr);
        var ArrFilterArray = this.state.totalFlightsResults.filter(val => {
            return Date.parse('01/01/2011' + ' ' + filterArr) > Date.parse('01/01/2011' + ' ' + val.ArrivalTime);
        });
        if(ArrFilterArray.length <= 0 ){
            console.log("Empty array ");
            this.setState({emptyResults: true});
        }
        else{
            this.setState({emptyResults: false});
        }
        console.log("After Filter: "+ArrFilterArray);
        this.setState({flightResults: ArrFilterArray});
    };


    componentWillUnmount()
    {
        var next = new Date();
        var data={};
        data.fromTime=this.state.fromTime.toString();
        data.toTime=next.toString();
        data.page='Flights Page';
            API.trackHotel(data)
                .then((data) => {
                    //console.log(data.user);
                    console.log("successfully tracked FLIGHTS UNMOUNT");
                });

    }











    flightPayment=(flightPaymentDetails)=>
    {
       // alert("inside flights");

        this.props.flightPayment(flightPaymentDetails);

    };




    render() {
        return (
          <div className="container-fluid " style={{backgroundColor: '#E4E5EA'}}>
            <div className="row">
              <FlightSearchNavBar/>
            </div>
            <div className="d-flex p-2">
              <div className="d-flex flex-row">
                <div className="d-flex flex-column">
                  <div className="pt-2 pr-2"><img src="/images/flight-map.png"/></div>
                  <div className="pt-2 pr-2"><FlightOptions filterOption={this.filterOption} filterOptionDep={this.filterOptionDep} filterOptionArr={this.filterOptionArr}/></div>
                </div>
                <div className="d-flex flex-column">
                    <div className="pt-2 pr-2">
                        {
                            this.state.emptyResults
                                ?<EmptyResults />
                                : <FlightCard flightPayment={this.flightPayment} filterPrice={this.state.filterPrice} flightResults={this.state.flightResults} flightTotalCount={this.props.flightTotalCount} flightsDateFrom={this.props.flightsDateFrom} />

                        }
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-end">
                  <div className="pt-2 pr-2"><img src="/images/flight-extra.png"/></div>
                  <div className="pt-2 pr-2"><img src="/images/flight-extra1.png"/></div>
                  <div className="pt-2 pr-2"><img src="/images/flight-extra2.png"/></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default withRouter(Flight);
